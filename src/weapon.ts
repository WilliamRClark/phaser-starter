/// <reference path="./bullets.ts" />

    class SingleBullet extends Phaser.Group {
        private nextFire : number;
        private bulletSpeed : number;
        private fireRate : number;

        constructor(game: Phaser.Game) {
            super(game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

            this.nextFire = 0;
            this.bulletSpeed = 600;
            this.fireRate = 100;

            for (var i = 0; i < 64; i++)
            {
                this.add(new Bullet(game, 'bullet5'), true);
            }
        }

        fire(source: Phaser.Sprite) {

            if (this.game.time.time < this.nextFire) { return; }

            var x = source.x + 10;
            var y = source.y + 10;

            this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

            this.nextFire = this.game.time.time + this.fireRate;

        }

    }

    
    /////////////////////////////////////////////////////////
    //  A bullet is shot both in front and behind the ship //
    /////////////////////////////////////////////////////////

    class FrontAndBack extends Phaser.Group {
        private nextFire : number;
        private bulletSpeed : number;
        private fireRate : number;
        
        constructor(game: Phaser.Game) {
            super(game, game.world, 'Front And Back', false, true, Phaser.Physics.ARCADE);

            this.nextFire = 0;
            this.bulletSpeed = 600;
            this.fireRate = 100;

            for (var i = 0; i < 64; i++)
            {
                this.add(new Bullet(game, 'bullet5'), true);
            }
        }

        fire(source: Phaser.Sprite) {

            if (this.game.time.time < this.nextFire) { return; }

            var x = source.x + 10;
            var y = source.y + 10;

            this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
            this.getFirstExists(false).fire(x, y, 180, this.bulletSpeed, 0, 0);

            this.nextFire = this.game.time.time + this.fireRate;
        }
    };

