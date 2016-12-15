/// <reference path="./bullets.ts" />

    abstract class Weapon extends Phaser.Group {
        protected nextFire : number;
        protected bulletSpeed : number;
        protected fireRate : number;
        protected sound: Phaser.Sound;

        constructor(game: Phaser.Game, world: Phaser.World, name: string, addToStage: boolean, enableBody: boolean, physicsBodyType: number, sound: Phaser.Sound) {
            super(game, world, name, addToStage, enableBody, physicsBodyType);
            this.sound = sound;
            this.nextFire = 0;
        }

    }

    class SingleBullet extends Weapon {

        constructor(game: Phaser.Game, sound: Phaser.Sound) {
            super(game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE, sound);
            this.bulletSpeed = 600;
            this.fireRate = 100;

            for (var i = 0; i < 64; i++)
            {
                this.add(new Bullet(game, 'bullet5'), true);
            }
        }

        fire(source: Phaser.Sprite) {

            if (this.game.time.time < this.nextFire) { return; }
            
            this.sound.play('l1');

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

        constructor(game: Phaser.Game, sound: Phaser.Sound) {
            super(game, game.world, 'Front And Back', false, true, Phaser.Physics.ARCADE, sound);

            this.bulletSpeed = 600;
            this.fireRate = 100;

            for (var i = 0; i < 64; i++)
            {
                this.add(new Bullet(game, 'bullet5'), true);
            }
        }

        fire(source: Phaser.Sprite) {

            if (this.game.time.time < this.nextFire) { return; }

            this.sound.play('l2');

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

        constructor(game: Phaser.Game, sound: Phaser.Sound) {
            super(game, game.world, 'Three Way', false, true, Phaser.Physics.ARCADE, sound);

            this.bulletSpeed = 600;
            this.fireRate = 100;

            for (var i = 0; i < 96; i++)
            {
                this.add(new Bullet(game, 'bullet7'), true);
            }
        }

        fire(source: Phaser.Sprite) {
            if (this.game.time.time < this.nextFire) { return; }

            this.sound.play('l3');

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

        constructor(game: Phaser.Game, sound: Phaser.Sound) {
            super(game, game.world, 'Eight Way', false, true, Phaser.Physics.ARCADE, sound);

            this.bulletSpeed = 600;
            this.fireRate = 100;

            for (var i = 0; i < 96; i++)
            {
                this.add(new Bullet(game, 'bullet5'), true);
            }
        }

        fire(source: Phaser.Sprite) {
            if (this.game.time.time < this.nextFire) { return; }

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
        }

    };

    ////////////////////////////////////////////////////
    //  Bullets are fired out scattered on the y axis //
    ////////////////////////////////////////////////////

    class ScatterShot extends Weapon {

        constructor(game: Phaser.Game, sound: Phaser.Sound) {
            super(game, game.world, 'ScatterShot', false, true, Phaser.Physics.ARCADE, sound);

            this.bulletSpeed = 600;
            this.fireRate = 40;

            for (var i = 0; i < 32; i++)
            {
                this.add(new Bullet(game, 'bullet5'), true);
            }

        }

        fire(source: Phaser.Sprite) {
            if (this.game.time.time < this.nextFire) { return; }

            this.sound.play('l5');
            var x = source.x + 16;
            var y = (source.y + source.height / 2) + this.game.rnd.between(-10, 10);

            this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

            this.nextFire = this.game.time.time + this.fireRate;
        };

    };

