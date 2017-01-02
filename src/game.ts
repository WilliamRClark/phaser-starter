/// <reference path="./bullets.ts" />
/// <reference path="./weapon.ts" />
/// <reference path="./sound.ts" />
    
    class Game {
        /**
         * Global game and settings
         */
        private static instance: Game;

        /**
         * Phaser game instance
         */
        private game: Phaser.Game;

        private logoSprite: Phaser.Sprite;
        private background: Phaser.TileSprite;
        private foreground: Phaser.TileSprite;
        private weapons: any[];
        private currentWeapon: number;
        private player: Phaser.Sprite;
        private aliens: Phaser.Group;

        private weaponName: Phaser.BitmapText;
        private cursors: Phaser.CursorKeys;
        private speed: number;
        private explosions : Phaser.Group;


        /**
         * Laser sound effects audio sprite sheet
         */
        private laserAudio: LaserSoundSprite;

        /**
         * Generic sound effects audio sprite sheet
         */
        private effectAudio: EffectsSoundSprite;

        constructor() {
            this.game = new Phaser.Game(1280, 1024, Phaser.AUTO, 'content', { init: Game.init, preload: Game.preload, create: Game.create, update: Game.update });
            this.laserAudio = new LaserSoundSprite(this.game);
            this.effectAudio = new EffectsSoundSprite(this.game);
            Game.instance = this;
        }

        static init() {
            console.log("Phaser init()");
            var self : Game = Game.instance;

            self.game.renderer.renderSession.roundPixels = true;
            self.game.physics.startSystem(Phaser.Physics.ARCADE);
        }

        /**
         * Load game assets.
         */
        static preload() {
            console.log("Phaser preload()");
            var self : Game = Game.instance;

            // Image assets
            self.game.load.image('background', 'assets/images/back.png');
            self.game.load.image('foreground', 'assets/images/fore.png');
            self.game.load.image('player', 'assets/images/ship.png');
            self.game.load.spritesheet('kaboom', 'assets/images/explode.png', 128, 128);
            self.game.load.spritesheet('alien', 'assets/images/invader32x32x4.png', 32, 32);

            for (var i = 1; i <= 11; i++)
            {
                self.game.load.image('bullet' + i, 'assets/images/bullet' + i + '.png');
            }

            // Font assets
            self.game.load.bitmapFont('shmupfont', 'assets/images/shmupfont.png', 'assets/shmupfont.xml');

            // Audio assets
            self.laserAudio.preload();
            self.effectAudio.preload();

            //  An explosion pool
            self.explosions = self.game.add.group();
            self.explosions.createMultiple(30, 'kaboom');

        }

        /**
         * Initialize our display and audio
         */
        static create() {
            console.log("Phaser create()");
            var self : Game = Game.instance;

            self.laserAudio.create();
            self.effectAudio.create();
            
            self.game.load.spritesheet('kaboom', 'assets/images/explode.png', 128, 128);

            self.background = self.game.add.tileSprite(0, 0, self.game.width, self.game.height, 'background');
            self.background.autoScroll(-40, 0);
            self.speed = 300;
            self.weapons = [];
            self.weapons.push(new SingleBullet(self.game, self.laserAudio));
            self.weapons.push(new FrontAndBack(self.game, self.laserAudio));
            self.weapons.push(new ThreeWay(self.game, self.laserAudio));
            self.weapons.push(new EightWay(self.game, self.laserAudio));
            self.weapons.push(new ScatterShot(self.game, self.laserAudio));
            self.weapons.push(new Beam(self.game, self.laserAudio));
            self.weapons.push(new SplitShot(self.game, self.laserAudio));
            self.weapons.push(new Pattern(self.game, self.laserAudio));
            self.weapons.push(new Rockets(self.game, self.laserAudio));
            self.weapons.push(new ScaleBullet(self.game, self.laserAudio));
            self.weapons.push(new Combo1(self.game, self.laserAudio));
            self.weapons.push(new Combo2(self.game, self.laserAudio));

            self.currentWeapon = 0;

            for (var i : number = 1; i < self.weapons.length; i++)
            {
                self.weapons[i].visible = false;
            }

            self.player = self.game.add.sprite(64, 200, 'player');
            self.player.animations.add('kaboom');
            self.game.physics.arcade.enable(self.player);
            self.player.body.collideWorldBounds = true;

            self.aliens = self.game.add.group();
            self.aliens.create(600, 200, 'alien');
            self.aliens.create(800, 400, 'alien');
            self.aliens.create(600, 600, 'alien');

            self.aliens.forEach(function(alien: Phaser.Sprite) {
                alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
                alien.animations.play('fly');
                self.game.physics.arcade.enable(alien);
            }, self);


            // Set up our foreground image.
            self.foreground = self.game.add.tileSprite(0, 0, self.game.width, self.game.height, 'foreground');
            self.foreground.autoScroll(-60, 0);

            self.weaponName = self.game.add.bitmapText(8, 900, 'shmupfont', "ENTER = Next Weapon", 24);

            //  Cursor keys to fly + space to fire
            self.cursors = self.game.input.keyboard.createCursorKeys();

            self.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

            var changeKey : Phaser.Key = self.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            changeKey.onDown.add(self.nextWeapon, self);

        }


        /**
         * Game loop
         */
        static update() {
            var self : Game = Game.instance;
            self.player.body.velocity.set(0);

            // Process keyboard
            if (self.cursors.left.isDown)
            {
                self.player.body.velocity.x = -self.speed;
            }
            else if (self.cursors.right.isDown)
            {
                self.player.body.velocity.x = self.speed;
            }

            if (self.cursors.up.isDown)
            {
                self.player.body.velocity.y = -self.speed;
            }
            else if (self.cursors.down.isDown)
            {
                self.player.body.velocity.y = self.speed;
            }

            if (self.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
            {
                self.weapons[self.currentWeapon].fire(self.player);
            }

            //  Run collision detection
            self.game.physics.arcade.collide(
                self.aliens, 
                self.player, 
                function(alien: Phaser.Sprite, player: Phaser.Sprite){
                    Game.playerHitsAlien(alien, player);
                }
            ); 


            self.game.physics.arcade.collide(
                self.weapons[self.currentWeapon], 
                self.aliens, 
                function(bullet: Phaser.Sprite, alien: Phaser.Sprite) {
                    self.bulletHitsAlien(bullet, alien);
                } 
            );

            self.moveAliens();
        }

        private movingUp : boolean = false;
        private yLowerBound : number = 100;
        private yUpperBound : number = 800;

        moveAliens() {
            var self : Game = Game.instance;
            self.aliens.forEach(function(alien: Phaser.Group) {
                if (self.movingUp) {
                    alien.y += 2;
                    if (alien.y > self.yUpperBound) {
                        self.movingUp = false;
                    }
                } else {
                    alien.y -= 2;
                    if (alien.y < self.yLowerBound) {
                        self.movingUp = true;
                    }
                }
            }, self);

        }

        /**
         * Change the active weapon used by the player.
         */
        nextWeapon() {
            console.log('Changing weapon.');

            //  Tidy-up the current weapon
            if (this.currentWeapon > 9)
            {
                this.weapons[this.currentWeapon].reset();
            }
            else
            {
                this.weapons[this.currentWeapon].visible = false;
                this.weapons[this.currentWeapon].callAll('reset', null, 0, 0);
                this.weapons[this.currentWeapon].setAll('exists', false);
            }

            //  Activate the new one
            this.currentWeapon++;

            if (this.currentWeapon === this.weapons.length)
            {
                this.currentWeapon = 0;
            }

            this.weapons[this.currentWeapon].visible = true;

            this.weaponName.text = this.weapons[this.currentWeapon].name;

        }

        /**
         * Handler for bullet hitting alien.  Kill alien, and make explosion
         * 
         * @param bullet: Phaser sprite for bullet
         * @param alien: Phaser sprite for alien
         * 
         */
        public bulletHitsAlien(bullet: Phaser.Sprite, alien: Phaser.Sprite) {
            var self : Game = Game.instance;

            console.log("Bullet hits alien");
            bullet.kill();            
            alien.kill();

            Game.fireyDeath(alien);
        }

        static playerHitsAlien(player: Phaser.Sprite, alien: Phaser.Sprite) {
            var self : Game = Game.instance;

            console.log("Player hits alien");
            player.kill();            
            alien.kill();

            Game.fireyDeath(player);
        }

        static fireyDeath(dyingSprite: Phaser.Sprite) {
            var self : Game = Game.instance;

            // Play death animation
            var fireyDeath : Phaser.Sprite = self.game.add.sprite(dyingSprite.body.x, dyingSprite.body.y,"kaboom");
            fireyDeath.anchor.setTo(0.5, 0.5);
            fireyDeath.animations.add('boom');
            fireyDeath.play('boom', 15, false, true);

            // Make dying sounds
            self.effectAudio.play(EffectsSoundSprite.ALIEN_DEATH);            
        }
    }

    window.onload = () => {
        var gameInstance = new Game();
    }
