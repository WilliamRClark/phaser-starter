var Game = (function () {
    function Game() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { init: this.init, preload: this.preload, create: this.create, update: this.update });
    }
    Game.prototype.init = function () {
        this.game.renderer.renderSession.roundPixels = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    };
    Game.prototype.preload = function () {
        this.game.load.image('background', 'assets/back.png');
        this.game.load.image('foreground', 'assets/fore.png');
        this.game.load.image('player', 'assets/ship.png');
        this.game.load.bitmapFont('shmupfont', 'assets/shmupfont.png', 'assets/shmupfont.xml');
        for (var i = 1; i <= 11; i++) {
            this.game.load.image('bullet' + i, 'assets/bullet' + i + '.png');
        }
    };
    Game.prototype.create = function () {
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
        this.background.autoScroll(-40, 0);
        this.speed = 300;
        this.weapons = [];
        this.weapons.push(new SingleBullet(this.game));
        this.currentWeapon = 0;
        for (var i = 1; i < this.weapons.length; i++) {
            this.weapons[i].visible = false;
        }
        this.player = this.game.add.sprite(64, 200, 'player');
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.foreground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'foreground');
        this.foreground.autoScroll(-60, 0);
        this.weaponName = this.game.add.bitmapText(8, 364, 'shmupfont', "ENTER = Next Weapon", 24);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        var changeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        changeKey.onDown.add(this.nextWeapon, this);
    };
    Game.prototype.nextWeapon = function () {
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
    Game.prototype.update = function () {
        this.player.body.velocity.set(0);
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -this.speed;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = this.speed;
        }
        if (this.cursors.up.isDown) {
            this.player.body.velocity.y = -this.speed;
        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y = this.speed;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.weapons[this.currentWeapon].fire(this.player);
        }
    };
    return Game;
}());
window.onload = function () {
    var gameInstance = new Game();
};
