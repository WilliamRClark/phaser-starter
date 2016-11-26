var Game;
(function (Game_1) {
    var Game = (function () {
        function Game() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
        }
        Game.prototype.preload = function () {
            this.game.load.image('logo', 'assets/phaser.png');
        };
        Game.prototype.create = function () {
            this.logoSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            this.logoSprite.anchor.setTo(0.5, 0.5);
        };
        Game.prototype.update = function () {
            this.logoSprite.x += 1;
            this.logoSprite.y += 1;
        };
        return Game;
    }());
    window.onload = function () {
        var gameInstance = new Game();
    };
})(Game || (Game = {}));
