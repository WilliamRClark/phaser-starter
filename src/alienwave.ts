/**
 * A wrapper of a phaser group to encapsulate a wave of aliens in the game.
 */
class AlienWave {
    public aliens : Phaser.Group;

    constructor(game: Phaser.Game) {
        var self : AlienWave = this;
        this.aliens = game.add.group();
        Alien.create(game, this.aliens, 100, 100);
        Alien.create(game, this.aliens, 200, 400);
        Alien.create(game, this.aliens, 200, 300);
        Alien.create(game, this.aliens, 400, 100);
        Alien.create(game, this.aliens, 400, 800);
        Alien.create(game, this.aliens, 100, 400);
    }

    public moveAliens() {
        this.aliens.forEach(function(alien: Alien) 
        {

            // Don't move dead aliens
            if (alien.alive == false) {
                return;
            }

            alien.move();

        }, this);
    }

    /**
     * Are all of the aliens in the wave dead.
     */
    public allDead() : boolean {
        return (this.aliens.countLiving() < 1);
    }

};