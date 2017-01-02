/// <reference path="./bullets.ts" />

    abstract class Weapon extends Phaser.Group {
        protected nextFire : number;
        protected bulletSpeed : number;
        protected fireRate : number;
        protected sound: LaserSoundSprite;

        constructor(game: Phaser.Game, world: Phaser.World, name: string, addToStage: boolean, enableBody: boolean, physicsBodyType: number, sound?: LaserSoundSprite) {
            super(game, world, name, addToStage, enableBody, physicsBodyType);
            this.sound = sound;
            this.nextFire = 0;
        }

        abstract fire(source: Phaser.Sprite);

    }

    class SingleBullet extends Weapon {

        constructor(game: Phaser.Game, sound: LaserSoundSprite) {
            super(game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE, sound);
            this.bulletSpeed = 600;
            this.fireRate = 100;

            for (var i = 0; i < 64; i++)
            {
                this.add(new Bullet(game, 'bullet5'), true);
            }
        }

        fire(source: Phaser.Sprite) {

            if (this.game.time.time < this.nextFire ||
                this.getFirstExists(false) == null) { return; }
            
            if (this.sound) {this.sound.play(LaserSoundSprite.L1)};

            var x = source.x + 10;
            var y = source.y + 10;

            this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

            this.nextFire = this.game.time.time + this.fireRate;

        }

    }

    
    /////////////////////////////////////////////////////////
    //  A bullet is shot both in front and behind the ship //
    /////////////////////////////////////////////////////////

    class FrontAndBack extends Weapon {

        constructor(game: Phaser.Game, sound: LaserSoundSprite) {
            super(game, game.world, 'Front And Back', false, true, Phaser.Physics.ARCADE, sound);

            this.bulletSpeed = 600;
            this.fireRate = 100;

            for (var i = 0; i < 64; i++)
            {
                this.add(new Bullet(game, 'bullet5'), true);
            }
        }

        fire(source: Phaser.Sprite) {

            if (this.game.time.time < this.nextFire ||
                this.getFirstExists(false) == null) { return; }

            if (this.sound) {this.sound.play(LaserSoundSprite.L2)};

            var x = source.x + 10;
            var y = source.y + 10;

            this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
            this.getFirstExists(false).fire(x, y, 180, this.bulletSpeed, 0, 0);

            this.nextFire = this.game.time.time + this.fireRate;
        }
    };

    //////////////////////////////////////////////////////
    //  3-way Fire (directly above, below and in front) //
    //////////////////////////////////////////////////////

    class ThreeWay extends Weapon {

        constructor(game: Phaser.Game, sound: LaserSoundSprite) {
            super(game, game.world, 'Three Way', false, true, Phaser.Physics.ARCADE, sound);

            this.bulletSpeed = 600;
            this.fireRate = 100;

            for (var i = 0; i < 96; i++)
            {
                this.add(new Bullet(game, 'bullet7'), true);
            }
        }

        fire(source: Phaser.Sprite) {
            if (this.game.time.time < this.nextFire ||
                this.getFirstExists(false) == null) { return; }

            if (this.sound) {this.sound.play(LaserSoundSprite.L3)};

            var x = source.x + 10;
            var y = source.y + 10;

            this.getFirstExists(false).fire(x, y, 270, this.bulletSpeed, 0, 0);
            this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
            this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0, 0);

            this.nextFire = this.game.time.time + this.fireRate;
        }

    };

 
    /////////////////////////////////////////////
    //  8-way fire, from all sides of the ship //
    /////////////////////////////////////////////

    class EightWay extends Weapon {

        constructor(game: Phaser.Game, sound: LaserSoundSprite) {
            super(game, game.world, 'Eight Way', false, true, Phaser.Physics.ARCADE, sound);

            this.bulletSpeed = 600;
            this.fireRate = 100;

            for (var i = 0; i < 96; i++)
            {
                this.add(new Bullet(game, 'bullet5'), true);
            }
        }

        fire(source: Phaser.Sprite) {
            if (this.game.time.time < this.nextFire ||
                this.getFirstExists(false) == null) { return; }

            if (this.sound) {this.sound.play(LaserSoundSprite.L4)};

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
        }

    };

    ////////////////////////////////////////////////////
    //  Bullets are fired out scattered on the y axis //
    ////////////////////////////////////////////////////

    class ScatterShot extends Weapon {

        constructor(game: Phaser.Game, sound: LaserSoundSprite) {
            super(game, game.world, 'ScatterShot', false, true, Phaser.Physics.ARCADE, sound);

            this.bulletSpeed = 600;
            this.fireRate = 40;

            for (var i = 0; i < 32; i++)
            {
                this.add(new Bullet(game, 'bullet5'), true);
            }

        }

        fire(source: Phaser.Sprite) {
            if (this.game.time.time < this.nextFire ||
                this.getFirstExists(false) == null) { return; }

            if (this.sound) {this.sound.play(LaserSoundSprite.L5)};

            var x = source.x + 16;
            var y = (source.y + source.height / 2) + this.game.rnd.between(-10, 10);

            this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

            this.nextFire = this.game.time.time + this.fireRate;
        };

    };

    //////////////////////////////////////////////////////////////////////////
    //  Fires a streaming beam of lazers, very fast, in front of the player //
    //////////////////////////////////////////////////////////////////////////

    class Beam extends Weapon {

        constructor(game: Phaser.Game, sound: LaserSoundSprite) {
            super(game, game.world, 'Beam', false, true, Phaser.Physics.ARCADE, sound);

            this.bulletSpeed = 1000;
            this.fireRate = 45;

            for (var i = 0; i < 64; i++)
            {
                this.add(new Bullet(game, 'bullet11'), true);
            }
        }

        fire(source: Phaser.Sprite) {
            if (this.game.time.time < this.nextFire ||
                this.getFirstExists(false) == null) { return; }

            if (this.sound) {this.sound.play(LaserSoundSprite.L6)};

            var x = source.x + 40;
            var y = source.y + 10;

            this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

            this.nextFire = this.game.time.time + this.fireRate;
        }
    };

    ///////////////////////////////////////////////////////////////////////
    //  A three-way fire where the top and bottom bullets bend on a path //
    ///////////////////////////////////////////////////////////////////////

    class SplitShot extends Weapon {

        constructor(game: Phaser.Game, sound: LaserSoundSprite) {
            super(game, game.world, 'Split Shot', false, true, Phaser.Physics.ARCADE, sound);

            this.bulletSpeed = 700;
            this.fireRate = 40;

            for (var i = 0; i < 64; i++)
            {
                this.add(new Bullet(game, 'bullet8'), true);
            }

        }

        fire(source: Phaser.Sprite) {
            if (this.game.time.time < this.nextFire ||
                this.getFirstExists(false) == null) { return; }

            if (this.sound) {this.sound.play(LaserSoundSprite.L7)};

            var x = source.x + 20;
            var y = source.y + 10;

            this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, -500);
            this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
            this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 500);

            this.nextFire = this.game.time.time + this.fireRate;
        }
    };



    ///////////////////////////////////////////////////////////////////////
    //  Bullets have Gravity.y set on a repeating pre-calculated pattern //
    ///////////////////////////////////////////////////////////////////////

    class Pattern extends Weapon {
        private pattern : number[];
        private patternIndex : number;

        constructor(game: Phaser.Game, sound: LaserSoundSprite) {
            super(game, game.world, 'Pattern', false, true, Phaser.Physics.ARCADE, sound);

            this.bulletSpeed = 600;
            this.fireRate = 40;

            this.pattern = Phaser.ArrayUtils.numberArrayStep(-800, 800, 200);
            this.pattern = this.pattern.concat(Phaser.ArrayUtils.numberArrayStep(800, -800, -200));

            this.patternIndex = 0;

            for (var i = 0; i < 64; i++)
            {
                this.add(new Bullet(game, 'bullet4'), true);
            }
        }

        fire(source: Phaser.Sprite) {
            if (this.game.time.time < this.nextFire ||
                this.getFirstExists(false) == null) { return; }

            if (this.sound) {this.sound.play(LaserSoundSprite.L8)};            

            var x = source.x + 20;
            var y = source.y + 10;

            this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, this.pattern[this.patternIndex]);

            this.patternIndex++;

            if (this.patternIndex === this.pattern.length)
            {
                this.patternIndex = 0;
            }

            this.nextFire = this.game.time.time + this.fireRate;
        }
    };


    ///////////////////////////////////////////////////////////////////
    //  Rockets that visually track the direction they're heading in //
    ///////////////////////////////////////////////////////////////////

    class Rockets extends Weapon {

        constructor(game: Phaser.Game, sound: LaserSoundSprite) {
            super(game, game.world, 'Rockets', false, true, Phaser.Physics.ARCADE, sound);

            this.bulletSpeed = 400;
            this.fireRate = 250;

            for (var i = 0; i < 32; i++)
            {
                this.add(new Bullet(game, 'bullet10'), true);
            }

            this.setAll('tracking', true);
        }

        fire(source: Phaser.Sprite) {
            if (this.game.time.time < this.nextFire ||
                this.getFirstExists(false) == null) { return; }

            if (this.sound) {this.sound.play(LaserSoundSprite.L9)};


            var x = source.x + 10;
            var y = source.y + 10;

            this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, -700);
            this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 700);

            this.nextFire = this.game.time.time + this.fireRate;
            }
    };

    ////////////////////////////////////////////////////////////////////////
    //  A single bullet that scales in size as it moves across the screen //
    ////////////////////////////////////////////////////////////////////////

    class ScaleBullet extends Weapon {

        constructor(game: Phaser.Game, sound: LaserSoundSprite) {
            super(game, game.world, 'Scale Bullet', false, true, Phaser.Physics.ARCADE, sound);

            this.bulletSpeed = 800;
            this.fireRate = 100;

            for (var i = 0; i < 32; i++)
            {
                this.add(new Bullet(game, 'bullet9'), true);
            }

            this.setAll('scaleSpeed', 0.05);
        }

        fire(source: Phaser.Sprite) {
            if (this.game.time.time < this.nextFire ||
                this.getFirstExists(false) == null) { return; }

            var x = source.x + 10;
            var y = source.y + 10;

            this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

            this.nextFire = this.game.time.time + this.fireRate;
        }

    };



    /////////////////////////////////////////////
    //  A Weapon Combo - Single Shot + Rockets //
    /////////////////////////////////////////////

    class Combo1 {

        private weapon1: Weapon;
        private weapon2: Weapon;
        private name: string;

        constructor(game: Phaser.Game, sound: LaserSoundSprite) {

            this.name = "Combo One";
            this.weapon1 = new SingleBullet(game, null);
            this.weapon2 = new Rockets(game, null);

        }

        reset() {

            this.weapon1.visible = false;
            this.weapon1.callAll('reset', null, 0, 0);
            this.weapon1.setAll('exists', false);

            this.weapon2.visible = false;
            this.weapon2.callAll('reset', null, 0, 0);
            this.weapon2.setAll('exists', false);
        }

        fire(source: Phaser.Sprite) {
            this.weapon1.fire(source);
            this.weapon2.fire(source);
        }


    };

    /////////////////////////////////////////////////////
    //  A Weapon Combo - ThreeWay, Pattern and Rockets //
    /////////////////////////////////////////////////////

    class Combo2 {

        private weapon1: Weapon;
        private weapon2: Weapon;
        private weapon3: Weapon;
        private name: string;

        constructor(game: Phaser.Game, sound: LaserSoundSprite) {
            this.name = "Combo Two";
            this.weapon1 = new Pattern(game, null);
            this.weapon2 = new ThreeWay(game, null);
            this.weapon3 = new Rockets(game, null);
        }

        reset() {

            this.weapon1.visible = false;
            this.weapon1.callAll('reset', null, 0, 0);
            this.weapon1.setAll('exists', false);

            this.weapon2.visible = false;
            this.weapon2.callAll('reset', null, 0, 0);
            this.weapon2.setAll('exists', false);

            this.weapon3.visible = false;
            this.weapon3.callAll('reset', null, 0, 0);
            this.weapon3.setAll('exists', false);

        }

        fire(source: Phaser.Sprite) {
            this.weapon1.fire(source);
            this.weapon2.fire(source);
            this.weapon3.fire(source);
        }


    };
