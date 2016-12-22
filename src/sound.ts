
    abstract class SoundSprite {
        protected game: Phaser.Game;
        protected soundRef: string; 
        constructor(game: Phaser.Game, soundRef: string) {
            this.game = game;
            this.soundRef = soundRef;
        }

        /**
         * Preload.  Call during Phaser preload phase.
         */
        public abstract preload();

        /**
         * Create markers into sprite sheet.  Call during Phaser create phase.
         */
        public abstract create();

        /**
         * Play a sound.
         */
        public abstract play(soundRef: string);

    }

    class LaserSoundSprite extends SoundSprite {
        public static L1:string = "l1";
        public static L2:string = "l2";
        public static L3:string = "l3";
        public static L4:string = "l4";
        public static L5:string = "l5";
        public static L6:string = "l6";
        public static L7:string = "l7";
        public static L8:string = "l8";
        public static L9:string = "l9";

        private laserAudio : Phaser.Sound;

        /**
         * Constructor.  
         */
        constructor(game: Phaser.Game) {
            super(game, "laserSound");
        }

        /**
         * Preload.  Call during Phaser preload phase.
         */
        preload() {
            this.game.load.audio(this.soundRef, "assets/sounds/laserXSounds.mp3");
        }

        /**
         * Create markers into sprite sheet.  Call during Phaser create phase.
         */
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

        /**
         * Play a sound.
         */
        play(soundRef: string) {
            this.laserAudio.play(soundRef);
        }
    };

    class EffectsSoundSprite extends SoundSprite {
        public static ALIEN_DEATH: string = "alien death";
        public static BOSS_HIT: string = "boss hit";
        public static ESCAPE: string = "escape";
        public static MEOW: string = "meow";
        public static NUMKEY: string = "numkey";
        public static PING: string = "ping";
        public static DEATH: string = "death";
        public static SHOT: string = "shot";
        public static SQUIT: string = "squit";

        private effectAudio : Phaser.Sound;

        /**
         * Constructor.  
         */
        constructor(game: Phaser.Game) {
            super(game, "effects");
        }

        /**
         * Preload.  Call during Phaser preload phase.
         */
        preload() {
            this.game.load.audio(this.soundRef, "assets/sounds/fx_mixdown.ogg");
        }

        /**
         * Create markers into sprite sheet.  Call during Phaser create phase.
         */
        create() {
            this.effectAudio = this.game.add.audio(this.soundRef);
            this.effectAudio.allowMultiple = true;

            this.effectAudio.addMarker(EffectsSoundSprite.ALIEN_DEATH, 1, 1.0);
            this.effectAudio.addMarker(EffectsSoundSprite.BOSS_HIT, 3, 0.5);
            this.effectAudio.addMarker(EffectsSoundSprite.ESCAPE, 4, 3.2);
            this.effectAudio.addMarker(EffectsSoundSprite.MEOW, 8, 0.5);
            this.effectAudio.addMarker(EffectsSoundSprite.NUMKEY, 9, 0.1);
            this.effectAudio.addMarker(EffectsSoundSprite.PING, 10, 1.0);
            this.effectAudio.addMarker(EffectsSoundSprite.DEATH, 12, 4.2);
            this.effectAudio.addMarker(EffectsSoundSprite.SHOT, 17, 1.0);
            this.effectAudio.addMarker(EffectsSoundSprite.SQUIT, 19, 0.3);
        }

        /**
         * Play a sound.
         */
        play(soundRef: string) {
            this.effectAudio.play(soundRef);
        }
    }

