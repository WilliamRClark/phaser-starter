
    class LaserSoundSprite {
        public static L1:string = "l1";
        public static L2:string = "l2";
        public static L3:string = "l3";
        public static L4:string = "l4";
        public static L5:string = "l5";
        public static L6:string = "l6";
        public static L7:string = "l7";
        public static L8:string = "l8";
        public static L9:string = "l9";

        private game: Phaser.Game;
        private laserAudio : Phaser.Sound;
        private soundRef: string = "laserSound"; 

        /**
         * Constructor.  
         */
        constructor(game: Phaser.Game) {
            this.game = game;
        }

        preload() {
            this.game.load.audio(this.soundRef, "assets/sounds/laserXSounds.mp3");
        }

        create() {
            this.laserAudio = this.game.add.audio(this.soundRef);
            this.laserAudio.allowMultiple = true;
            this.laserAudio.addMarker(LaserSoundSprite.L1, 0, 1.5);
            this.laserAudio.addMarker(LaserSoundSprite.L2, 1.5, 1.5);
            this.laserAudio.addMarker(LaserSoundSprite.L3, 3.5, 1.5);
            this.laserAudio.addMarker(LaserSoundSprite.L4, 5.5, 1.0);
            this.laserAudio.addMarker(LaserSoundSprite.L5, 7.0, 1.0);
            this.laserAudio.addMarker(LaserSoundSprite.L6, 9.0, 1.0);
            this.laserAudio.addMarker(LaserSoundSprite.L7, 10.5, 1.0);
            this.laserAudio.addMarker(LaserSoundSprite.L8, 12.0, 1.0);
            this.laserAudio.addMarker(LaserSoundSprite.L9, 13.5, 1.0);
        }

        play(soundRef: string) {
            this.laserAudio.play(soundRef);
        }
    }
