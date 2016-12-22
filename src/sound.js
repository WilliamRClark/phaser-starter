var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SoundSprite = (function () {
    function SoundSprite(game, soundRef) {
        this.game = game;
        this.soundRef = soundRef;
    }
    return SoundSprite;
}());
var LaserSoundSprite = (function (_super) {
    __extends(LaserSoundSprite, _super);
    function LaserSoundSprite(game) {
        _super.call(this, game, "laserSound");
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
}(SoundSprite));
;
var EffectsSoundSprite = (function (_super) {
    __extends(EffectsSoundSprite, _super);
    function EffectsSoundSprite(game) {
        _super.call(this, game, "effects");
    }
    EffectsSoundSprite.prototype.preload = function () {
        this.game.load.audio(this.soundRef, "assets/sounds/fx_mixdown.ogg");
    };
    EffectsSoundSprite.prototype.create = function () {
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
    };
    EffectsSoundSprite.prototype.play = function (soundRef) {
        this.effectAudio.play(soundRef);
    };
    EffectsSoundSprite.ALIEN_DEATH = "alien death";
    EffectsSoundSprite.BOSS_HIT = "boss hit";
    EffectsSoundSprite.ESCAPE = "escape";
    EffectsSoundSprite.MEOW = "meow";
    EffectsSoundSprite.NUMKEY = "numkey";
    EffectsSoundSprite.PING = "ping";
    EffectsSoundSprite.DEATH = "death";
    EffectsSoundSprite.SHOT = "shot";
    EffectsSoundSprite.SQUIT = "squit";
    return EffectsSoundSprite;
}(SoundSprite));
