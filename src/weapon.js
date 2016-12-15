var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Weapon = (function (_super) {
    __extends(Weapon, _super);
    function Weapon(game, world, name, addToStage, enableBody, physicsBodyType, sound) {
        _super.call(this, game, world, name, addToStage, enableBody, physicsBodyType);
        this.sound = sound;
        this.nextFire = 0;
    }
    return Weapon;
}(Phaser.Group));
var SingleBullet = (function (_super) {
    __extends(SingleBullet, _super);
    function SingleBullet(game, sound) {
        _super.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE, sound);
        this.bulletSpeed = 600;
        this.fireRate = 100;
        for (var i = 0; i < 64; i++) {
            this.add(new Bullet(game, 'bullet5'), true);
        }
    }
    SingleBullet.prototype.fire = function (source) {
        if (this.game.time.time < this.nextFire) {
            return;
        }
        this.sound.play('l1');
        var x = source.x + 10;
        var y = source.y + 10;
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
        this.nextFire = this.game.time.time + this.fireRate;
    };
    return SingleBullet;
}(Weapon));
var FrontAndBack = (function (_super) {
    __extends(FrontAndBack, _super);
    function FrontAndBack(game, sound) {
        _super.call(this, game, game.world, 'Front And Back', false, true, Phaser.Physics.ARCADE, sound);
        this.bulletSpeed = 600;
        this.fireRate = 100;
        for (var i = 0; i < 64; i++) {
            this.add(new Bullet(game, 'bullet5'), true);
        }
    }
    FrontAndBack.prototype.fire = function (source) {
        if (this.game.time.time < this.nextFire) {
            return;
        }
        this.sound.play('l2');
        var x = source.x + 10;
        var y = source.y + 10;
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 180, this.bulletSpeed, 0, 0);
        this.nextFire = this.game.time.time + this.fireRate;
    };
    return FrontAndBack;
}(Weapon));
;
var ThreeWay = (function (_super) {
    __extends(ThreeWay, _super);
    function ThreeWay(game, sound) {
        _super.call(this, game, game.world, 'Three Way', false, true, Phaser.Physics.ARCADE, sound);
        this.bulletSpeed = 600;
        this.fireRate = 100;
        for (var i = 0; i < 96; i++) {
            this.add(new Bullet(game, 'bullet7'), true);
        }
    }
    ThreeWay.prototype.fire = function (source) {
        if (this.game.time.time < this.nextFire) {
            return;
        }
        this.sound.play('l3');
        var x = source.x + 10;
        var y = source.y + 10;
        this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, 0);
        this.nextFire = this.game.time.time + this.fireRate;
    };
    return ThreeWay;
}(Weapon));
;
var EightWay = (function (_super) {
    __extends(EightWay, _super);
    function EightWay(game, sound) {
        _super.call(this, game, game.world, 'Eight Way', false, true, Phaser.Physics.ARCADE, sound);
        this.bulletSpeed = 600;
        this.fireRate = 100;
        for (var i = 0; i < 96; i++) {
            this.add(new Bullet(game, 'bullet5'), true);
        }
    }
    EightWay.prototype.fire = function (source) {
        if (this.game.time.time < this.nextFire) {
            return;
        }
        this.sound.play('l4');
        var x = source.x + 16;
        var y = source.y + 10;
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 45, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 135, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 180, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 225, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 315, this.bulletSpeed, 0, 0);
        this.nextFire = this.game.time.time + this.fireRate;
    };
    return EightWay;
}(Weapon));
;
var ScatterShot = (function (_super) {
    __extends(ScatterShot, _super);
    function ScatterShot(game, sound) {
        _super.call(this, game, game.world, 'ScatterShot', false, true, Phaser.Physics.ARCADE, sound);
        this.bulletSpeed = 600;
        this.fireRate = 40;
        for (var i = 0; i < 32; i++) {
            this.add(new Bullet(game, 'bullet5'), true);
        }
    }
    ScatterShot.prototype.fire = function (source) {
        if (this.game.time.time < this.nextFire) {
            return;
        }
        this.sound.play('l5');
        var x = source.x + 16;
        var y = (source.y + source.height / 2) + this.game.rnd.between(-10, 10);
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
        this.nextFire = this.game.time.time + this.fireRate;
    };
    ;
    return ScatterShot;
}(Weapon));
;
