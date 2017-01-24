var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Alien = (function (_super) {
    __extends(Alien, _super);
    function Alien(game, x, y, key, frame) {
        _super.call(this, game, x, y);
        this.movingUp = false;
        this.movingRight = true;
        this.r = 50;
        this.speed = 2;
    }
    Alien.prototype.move = function () {
        if (this.movingRight) {
            this.x += this.speed;
            if (this.x > (this.h + this.r)) {
                this.movingRight = false;
                this.movingUp = !this.movingUp;
            }
        }
        else {
            this.x -= this.speed;
            if (this.x < (this.h - this.r)) {
                this.movingRight = true;
                this.movingUp = !this.movingUp;
            }
        }
        if (this.movingUp) {
            this.y = Math.sqrt((this.r * this.r) - (this.x - this.h) * (this.x - this.h)) + this.k;
        }
        else {
            this.y = -1 * Math.sqrt((this.r * this.r) - (this.x - this.h) * (this.x - this.h)) + this.k;
        }
    };
    return Alien;
}(Phaser.Sprite));
var AlienWave = (function () {
    function AlienWave(game) {
        this.yLowerBound = 100;
        this.yUpperBound = 800;
        this.movingUp = false;
        this.movingRight = true;
        this.h = 200;
        this.k = 20;
        this.r = 50;
        this.speed = 2;
        var self = this;
        this.aliens = game.add.group();
        this.aliens.create(200, 400, 'alien');
        this.aliens.create(800, 400, 'alien');
        this.aliens.forEach(function (alien) {
            alien.animations.add('fly', [0, 1, 2, 3], 20, true);
            alien.animations.play('fly');
            game.physics.arcade.enable(alien);
        }, self);
    }
    AlienWave.prototype.moveAliens = function () {
        this.aliens.forEach(function (alien) {
            if (alien.alive == false) {
                return;
            }
            console.log("Position: " + alien.x + " " + alien.y);
        }, this);
    };
    return AlienWave;
}());
;
