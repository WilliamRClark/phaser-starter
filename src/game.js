var Game = (function () {
    function Game() {
        this.audioJSON = {
            spritemap: {
                "alien death": {
                    start: 1,
                    end: 2,
                    loop: false
                },
                "boss hit": {
                    start: 3,
                    end: 3.5,
                    loop: false
                },
                "escape": {
                    start: 4,
                    end: 7.2,
                    loop: false
                },
                "meow": {
                    start: 8,
                    end: 8.5,
                    loop: false
                },
                "numkey": {
                    start: 9,
                    end: 9.1,
                    loop: false
                },
                "ping": {
                    start: 10,
                    end: 11,
                    loop: false
                },
                "death": {
                    start: 12,
                    end: 16.2,
                    loop: false
                },
                "shot": {
                    start: 17,
                    end: 18,
                    loop: false
                },
                "squit": {
                    start: 19,
                    end: 19.3,
                    loop: false
                }
            }
        };
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { init: Game.init, preload: Game.preload, create: Game.create, update: Game.update });
        this.laserAudio = new LaserSoundSprite(this.game);
        Game.instance = this;
    }
    Game.init = function () {
        var self = Game.instance;
        self.game.renderer.renderSession.roundPixels = true;
        self.game.physics.startSystem(Phaser.Physics.ARCADE);
    };
    Game.preload = function () {
        var self = Game.instance;
        self.game.load.image('background', 'assets/images/back.png');
        self.game.load.image('foreground', 'assets/images/fore.png');
        self.game.load.image('player', 'assets/images/ship.png');
        self.game.load.bitmapFont('shmupfont', 'assets/images/shmupfont.png', 'assets/shmupfont.xml');
        for (var i = 1; i <= 11; i++) {
            self.game.load.image('bullet' + i, 'assets/images/bullet' + i + '.png');
        }
        self.laserAudio.preload();
    };
    Game.update = function () {
        var self = Game.instance;
        self.player.body.velocity.set(0);
        if (self.cursors.left.isDown) {
            self.player.body.velocity.x = -self.speed;
        }
        else if (self.cursors.right.isDown) {
            self.player.body.velocity.x = self.speed;
        }
        if (self.cursors.up.isDown) {
            self.player.body.velocity.y = -self.speed;
        }
        else if (self.cursors.down.isDown) {
            self.player.body.velocity.y = self.speed;
        }
        if (self.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            self.weapons[self.currentWeapon].fire(self.player);
        }
    };
    Game.create = function () {
        var self = Game.instance;
        self.laserAudio.create();
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
        for (var i = 1; i < self.weapons.length; i++) {
            self.weapons[i].visible = false;
        }
        self.player = self.game.add.sprite(64, 200, 'player');
        self.game.physics.arcade.enable(self.player);
        self.player.body.collideWorldBounds = true;
        self.foreground = self.game.add.tileSprite(0, 0, self.game.width, self.game.height, 'foreground');
        self.foreground.autoScroll(-60, 0);
        self.weaponName = self.game.add.bitmapText(8, 364, 'shmupfont', "ENTER = Next Weapon", 24);
        self.cursors = self.game.input.keyboard.createCursorKeys();
        self.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        var changeKey = self.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        changeKey.onDown.add(self.nextWeapon, self);
    };
    Game.prototype.nextWeapon = function () {
        console.log('Changing weapon.');
        if (this.currentWeapon > 9) {
            this.weapons[this.currentWeapon].reset();
        }
        else {
            this.weapons[this.currentWeapon].visible = false;
            this.weapons[this.currentWeapon].callAll('reset', null, 0, 0);
            this.weapons[this.currentWeapon].setAll('exists', false);
        }
        this.currentWeapon++;
        if (this.currentWeapon === this.weapons.length) {
            this.currentWeapon = 0;
        }
        this.weapons[this.currentWeapon].visible = true;
        this.weaponName.text = this.weapons[this.currentWeapon].name;
    };
    return Game;
}());
window.onload = function () {
    var gameInstance = new Game();
};
