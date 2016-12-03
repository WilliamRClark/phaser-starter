/// <reference path="./bullets.ts" />
/// <reference path="./weapon.ts" />
    
    class Game {
        private static instance: Game;
        private game: Phaser.Game;
        private logoSprite: Phaser.Sprite;
        private background: Phaser.TileSprite;
        private foreground: Phaser.TileSprite;
        private weapons: any[];
        private currentWeapon: number;
        private player: Phaser.Sprite;
        private weaponName: Phaser.BitmapText;
        private cursors: Phaser.CursorKeys;
        private speed: number;

        constructor() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { init: Game.init, preload: Game.preload, create: Game.create, update: Game.update });
            Game.instance = this;
        }

        static init() {
            var self : Game = Game.instance;
            self.game.renderer.renderSession.roundPixels = true;

            self.game.physics.startSystem(Phaser.Physics.ARCADE);
        }

        /**
         * Load game assets.
         */
        static preload() {
            var self : Game = Game.instance;
            self.game.load.image('background', 'assets/back.png');
            self.game.load.image('foreground', 'assets/fore.png');
            self.game.load.image('player', 'assets/ship.png');
            self.game.load.bitmapFont('shmupfont', 'assets/shmupfont.png', 'assets/shmupfont.xml');

            for (var i = 1; i <= 11; i++)
            {
                self.game.load.image('bullet' + i, 'assets/bullet' + i + '.png');
            }
        }

        /**
         * Game loop
         */
        static update() {
            var self : Game = Game.instance;
            self.player.body.velocity.set(0);

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
        }

        /**
         * Initialize our display
         */
        static create() {
            var self : Game = Game.instance;

            self.background = self.game.add.tileSprite(0, 0, self.game.width, self.game.height, 'background');
            self.background.autoScroll(-40, 0);
            self.speed = 300;
            self.weapons = [];
            self.weapons.push(new SingleBullet(self.game));
            self.weapons.push(new FrontAndBack(self.game));
            //this.weapons.push(new Weapon.ThreeWay(this.game));
            //this.weapons.push(new Weapon.EightWay(this.game));
            //this.weapons.push(new Weapon.ScatterShot(this.game));
            //this.weapons.push(new Weapon.Beam(this.game));
            //this.weapons.push(new Weapon.SplitShot(this.game));
            //this.weapons.push(new Weapon.Pattern(this.game));
            //this.weapons.push(new Weapon.Rockets(this.game));
            //this.weapons.push(new Weapon.ScaleBullet(this.game));
            //this.weapons.push(new Weapon.Combo1(this.game));
            //this.weapons.push(new Weapon.Combo2(this.game));

            self.currentWeapon = 0;

            for (var i : number = 1; i < self.weapons.length; i++)
            {
                self.weapons[i].visible = false;
            }

            self.player = self.game.add.sprite(64, 200, 'player');

            self.game.physics.arcade.enable(self.player);

            self.player.body.collideWorldBounds = true;

            self.foreground = self.game.add.tileSprite(0, 0, self.game.width, self.game.height, 'foreground');
            self.foreground.autoScroll(-60, 0);

            self.weaponName = self.game.add.bitmapText(8, 364, 'shmupfont', "ENTER = Next Weapon", 24);

            //  Cursor keys to fly + space to fire
            self.cursors = self.game.input.keyboard.createCursorKeys();

            self.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

            var changeKey : Phaser.Key = self.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            changeKey.onDown.add(self.nextWeapon, self);

        }

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

        

    }

    window.onload = () => {
        var gameInstance = new Game();
    }
