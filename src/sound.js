var LaserSoundSprite = (function () {
    function LaserSoundSprite(game) {
        this.soundRef = "laserSound";
        this.game = game;
    }
    LaserSoundSprite.prototype.preload = function () {
        this.game.load.audio(this.soundRef, "assets/sounds/laserXSounds.mp3");
    };
    LaserSoundSprite.prototype.create = function () {
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
    };
    LaserSoundSprite.prototype.play = function (soundRef) {
        this.laserAudio.play(soundRef);
    };
    LaserSoundSprite.L1 = "l1";
    LaserSoundSprite.L2 = "l2";
    LaserSoundSprite.L3 = "l3";
    LaserSoundSprite.L4 = "l4";
    LaserSoundSprite.L5 = "l5";
    LaserSoundSprite.L6 = "l6";
    LaserSoundSprite.L7 = "l7";
    LaserSoundSprite.L8 = "l8";
    LaserSoundSprite.L9 = "l9";
    return LaserSoundSprite;
}());
