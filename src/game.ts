namespace Game {

        var game : Phaser.Game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: preload, create: create });

        /**
         * Load game assets.
         */
        function preload () {
            game.load.image('logo', 'assets/phaser.png');
        }

        /**
         * Initialize our display
         */
        function create () {
            var logo : Phaser.Sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);
        }

}

