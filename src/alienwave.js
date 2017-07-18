var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Alien = (function (_super) {
    __extends(Alien, _super);
    function Alien(game, x, y) {
        _super.call(this, game, x, y, 'alien');
        this.currentAngle = 0;
        this.pathLocation = 0;
        this.xOrigin = x;
        this.yOrigin = y;
        this.animations.add('fly', [0, 1, 2, 3], 20, true);
        this.animations.play('fly');
        game.physics.arcade.enable(this);
        Alien.pathMap = game.cache.getJSON('CirclePath10');
    }
    Alien.create = function (game, group, x, y) {
        var newAlien = new Alien(game, x, y);
        group.add(newAlien);
        return newAlien;
    };
    Alien.prototype.move = function () {
        this.x += Alien.pathMap[this.pathLocation].X;
        this.y += Alien.pathMap[this.pathLocation].Y;
        this.pathLocation++;
        if (Alien.pathMap[this.pathLocation] == undefined) {
            this.pathLocation = 0;
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
        Alien.create(game, this.aliens, 100, 100);
        Alien.create(game, this.aliens, 200, 400);
        Alien.create(game, this.aliens, 200, 300);
        Alien.create(game, this.aliens, 400, 100);
        Alien.create(game, this.aliens, 400, 800);
        Alien.create(game, this.aliens, 100, 400);
    }
    AlienWave.prototype.moveAliens = function () {
        this.aliens.forEach(function (alien) {
            if (alien.alive == false) {
                return;
            }
            alien.move();
            console.log("Position: " + alien.x + " " + alien.y);
        }, this);
    };
    return AlienWave;
}());
;
