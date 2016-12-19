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
        if (this.sound) {
            this.sound.play(LaserSoundSprite.L1);
        }
        ;
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
        if (this.sound) {
            this.sound.play(LaserSoundSprite.L2);
        }
        ;
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
        if (this.sound) {
            this.sound.play(LaserSoundSprite.L3);
        }
        ;
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
        if (this.sound) {
            this.sound.play(LaserSoundSprite.L4);
        }
        ;
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
        if (this.sound) {
            this.sound.play(LaserSoundSprite.L5);
        }
        ;
        var x = source.x + 16;
        var y = (source.y + source.height / 2) + this.game.rnd.between(-10, 10);
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
        this.nextFire = this.game.time.time + this.fireRate;
    };
    ;
    return ScatterShot;
}(Weapon));
;
var Beam = (function (_super) {
    __extends(Beam, _super);
    function Beam(game, sound) {
        _super.call(this, game, game.world, 'Beam', false, true, Phaser.Physics.ARCADE, sound);
        this.bulletSpeed = 1000;
        this.fireRate = 45;
        for (var i = 0; i < 64; i++) {
            this.add(new Bullet(game, 'bullet11'), true);
        }
    }
    Beam.prototype.fire = function (source) {
        if (this.game.time.time < this.nextFire) {
            return;
        }
        if (this.sound) {
            this.sound.play(LaserSoundSprite.L6);
        }
        ;
        var x = source.x + 40;
        var y = source.y + 10;
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
        this.nextFire = this.game.time.time + this.fireRate;
    };
    return Beam;
}(Weapon));
;
var SplitShot = (function (_super) {
    __extends(SplitShot, _super);
    function SplitShot(game, sound) {
        _super.call(this, game, game.world, 'Split Shot', false, true, Phaser.Physics.ARCADE, sound);
        this.bulletSpeed = 700;
        this.fireRate = 40;
        for (var i = 0; i < 64; i++) {
            this.add(new Bullet(game, 'bullet8'), true);
        }
    }
    SplitShot.prototype.fire = function (source) {
        if (this.game.time.time < this.nextFire) {
            return;
        }
        if (this.sound) {
            this.sound.play(LaserSoundSprite.L7);
        }
        ;
        var x = source.x + 20;
        var y = source.y + 10;
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, -500);
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 500);
        this.nextFire = this.game.time.time + this.fireRate;
    };
    return SplitShot;
}(Weapon));
;
var Pattern = (function (_super) {
    __extends(Pattern, _super);
    function Pattern(game, sound) {
        _super.call(this, game, game.world, 'Pattern', false, true, Phaser.Physics.ARCADE, sound);
        this.bulletSpeed = 600;
        this.fireRate = 40;
        this.pattern = Phaser.ArrayUtils.numberArrayStep(-800, 800, 200);
        this.pattern = this.pattern.concat(Phaser.ArrayUtils.numberArrayStep(800, -800, -200));
        this.patternIndex = 0;
        for (var i = 0; i < 64; i++) {
            this.add(new Bullet(game, 'bullet4'), true);
        }
    }
    Pattern.prototype.fire = function (source) {
        if (this.game.time.time < this.nextFire) {
            return;
        }
        if (this.sound) {
            this.sound.play(LaserSoundSprite.L8);
        }
        ;
        var x = source.x + 20;
        var y = source.y + 10;
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, this.pattern[this.patternIndex]);
        this.patternIndex++;
        if (this.patternIndex === this.pattern.length) {
            this.patternIndex = 0;
        }
        this.nextFire = this.game.time.time + this.fireRate;
    };
    return Pattern;
}(Weapon));
;
var Rockets = (function (_super) {
    __extends(Rockets, _super);
    function Rockets(game, sound) {
        _super.call(this, game, game.world, 'Rockets', false, true, Phaser.Physics.ARCADE, sound);
        this.bulletSpeed = 400;
        this.fireRate = 250;
        for (var i = 0; i < 32; i++) {
            this.add(new Bullet(game, 'bullet10'), true);
        }
        this.setAll('tracking', true);
    }
    Rockets.prototype.fire = function (source) {
        if (this.game.time.time < this.nextFire) {
            return;
        }
        if (this.sound) {
            this.sound.play(LaserSoundSprite.L9);
        }
        ;
        var x = source.x + 10;
        var y = source.y + 10;
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, -700);
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 700);
        this.nextFire = this.game.time.time + this.fireRate;
    };
    return Rockets;
}(Weapon));
;
var ScaleBullet = (function (_super) {
    __extends(ScaleBullet, _super);
    function ScaleBullet(game, sound) {
        _super.call(this, game, game.world, 'Scale Bullet', false, true, Phaser.Physics.ARCADE, sound);
        this.bulletSpeed = 800;
        this.fireRate = 100;
        for (var i = 0; i < 32; i++) {
            this.add(new Bullet(game, 'bullet9'), true);
        }
        this.setAll('scaleSpeed', 0.05);
    }
    ScaleBullet.prototype.fire = function (source) {
        if (this.game.time.time < this.nextFire) {
            return;
        }
        var x = source.x + 10;
        var y = source.y + 10;
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
        this.nextFire = this.game.time.time + this.fireRate;
    };
    return ScaleBullet;
}(Weapon));
;
var Combo1 = (function () {
    function Combo1(game, sound) {
        this.name = "Combo One";
        this.weapon1 = new SingleBullet(game, null);
        this.weapon2 = new Rockets(game, null);
    }
    Combo1.prototype.reset = function () {
        this.weapon1.visible = false;
        this.weapon1.callAll('reset', null, 0, 0);
        this.weapon1.setAll('exists', false);
        this.weapon2.visible = false;
        this.weapon2.callAll('reset', null, 0, 0);
        this.weapon2.setAll('exists', false);
    };
    Combo1.prototype.fire = function (source) {
        this.weapon1.fire(source);
        this.weapon2.fire(source);
    };
    return Combo1;
}());
;
var Combo2 = (function () {
    function Combo2(game, sound) {
        this.name = "Combo Two";
        this.weapon1 = new Pattern(game, null);
        this.weapon2 = new ThreeWay(game, null);
        this.weapon3 = new Rockets(game, null);
    }
    Combo2.prototype.reset = function () {
        this.weapon1.visible = false;
        this.weapon1.callAll('reset', null, 0, 0);
        this.weapon1.setAll('exists', false);
        this.weapon2.visible = false;
        this.weapon2.callAll('reset', null, 0, 0);
        this.weapon2.setAll('exists', false);
        this.weapon3.visible = false;
        this.weapon3.callAll('reset', null, 0, 0);
        this.weapon3.setAll('exists', false);
    };
    Combo2.prototype.fire = function (source) {
        this.weapon1.fire(source);
        this.weapon2.fire(source);
        this.weapon3.fire(source);
    };
    return Combo2;
}());
;
