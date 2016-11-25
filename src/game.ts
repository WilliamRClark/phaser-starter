namespace Game {
    
    class Game {
        private game: Phaser.Game;
        private logoSprite: Phaser.Sprite;

        constructor() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
        }

        /**
         * Load game assets.
         */
        preload() {
            this.game.load.image('logo', 'assets/phaser.png');
        }

        /**
         * Initialize our display
         */
        create() {
            this.logoSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            this.logoSprite.anchor.setTo(0.5, 0.5);
        }

        /**
         * Game loop
         */
        update() {
            this.logoSprite.x += 1;
            this.logoSprite.y += 1;
        }

    }

    window.onload = () => {
        var gameInstance = new Game();
    }
}

