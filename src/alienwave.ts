class Alien extends Phaser.Sprite {
    private movingUp : boolean = false;
    private movingRight: boolean = true;
    private readonly h : number;
    private readonly k : number;
    private readonly r : number = 50;
    private readonly speed : number = 2;

    constructor(game: Phaser.Game, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number) {
        super(game, x, y);
    }

    public move() {
        // y=sqrt(r^2-(x-h)^2)+k 
        if (this.movingRight) {
            this.x += this.speed;
            if (this.x > (this.h + this.r)) {
                this.movingRight = false;
                this.movingUp = !this.movingUp;
            }
        } else {
            this.x -= this.speed;
            if (this.x < (this.h - this.r)) {
                this.movingRight = true;
                this.movingUp = !this.movingUp;
            }                
        }

        if (this.movingUp) {
            this.y = Math.sqrt((this.r*this.r)-(this.x- this.h)*(this.x- this.h)) + this.k;
        } else {
            this.y = -1 * Math.sqrt((this.r*this.r)-(this.x- this.h)*(this.x- this.h)) + this.k;
        }

    }

}

class AlienWave {
    public aliens : Phaser.Group;
    private readonly yLowerBound : number = 100;
    private readonly yUpperBound : number = 800;
    private movingUp : boolean = false;
    private movingRight: boolean = true;
    private readonly h : number = 200;
    private readonly k : number = 20;
    private readonly r : number = 50;
    private readonly speed : number = 2;

    constructor(game: Phaser.Game) {
        var self : AlienWave = this;
        this.aliens = game.add.group();
        this.aliens.create(200, 400, 'alien');
        this.aliens.create(800, 400, 'alien');
        //self.aliens.create(600, 600, 'alien');
        this.aliens.forEach(function (alien) {
            alien.animations.add('fly', [0, 1, 2, 3], 20, true);
            alien.animations.play('fly');
            game.physics.arcade.enable(alien);
        }, self);

        //this.aliens = game.add.group();
        //this.aliens.add(new Alien(game, 500, 200, 'alien'));
        //this.aliens.add(new Alien(game, 600, 500, 'alien'));

        //this.aliens.forEach(function(alien: Alien) {
        //    alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
        //    alien.animations.play('fly');
        //    game.physics.arcade.enable(alien);
        //}, this);
    }

    public moveAliens() {
        this.aliens.forEach(function(alien: Alien) 
        {

            // Don't move dead aliens
            if (alien.alive == false) {
                return;
            }
            
            // y=sqrt(r^2-(x-h)^2)+k 
            /*if (this.movingRight) {
                alien.x += this.speed;
                if (alien.x > (this.h + this.r)) {
                    this.movingRight = false;
                    this.movingUp = !this.movingUp;
                }
            } else {
                this.x -= this.speed;
                if (alien.x < (this.h - this.r)) {
                    this.movingRight = true;
                    this.movingUp = !this.movingUp;
                }                
            }

            if (this.movingUp) {
                alien.y = Math.sqrt((this.r*this.r)-(alien.x- this.h)*(alien.x- this.h)) + this.k;
            } else {
                alien.y = -1 * Math.sqrt((this.r*this.r)-(alien.x- this.h)*(alien.x- this.h)) + this.k;
            }
            */
            console.log("Position: " + alien.x + " " + alien.y);

            // End loop

        }, this);
    }

};