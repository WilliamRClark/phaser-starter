var Game = (function () {
    function Game() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { init: Game.init, preload: Game.preload, create: Game.create, update: Game.update });
        Game.instance = this;
    }
    Game.init = function () {
        var self = Game.instance;
        self.game.renderer.renderSession.roundPixels = true;
        self.game.physics.startSystem(Phaser.Physics.ARCADE);
    };
    Game.preload = function () {
        var self = Game.instance;
        self.game.load.image('background', 'assets/back.png');
        self.game.load.image('foreground', 'assets/fore.png');
        self.game.load.image('player', 'assets/ship.png');
        self.game.load.bitmapFont('shmupfont', 'assets/shmupfont.png', 'assets/shmupfont.xml');
        for (var i = 1; i <= 11; i++) {
            self.game.load.image('bullet' + i, 'assets/bullet' + i + '.png');
        }
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
        self.background = self.game.add.tileSprite(0, 0, self.game.width, self.game.height, 'background');
        self.background.autoScroll(-40, 0);
        self.speed = 300;
        self.weapons = [];
        self.weapons.push(new SingleBullet(self.game));
        self.weapons.push(new FrontAndBack(self.game));
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
