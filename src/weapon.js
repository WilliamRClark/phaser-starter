var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SingleBullet = (function (_super) {
    __extends(SingleBullet, _super);
    function SingleBullet(game) {
        _super.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);
        this.nextFire = 0;
        this.bulletSpeed = 600;
        this.fireRate = 100;
        for (var i = 0; i < 64; i++) {
            this.add(new Bullet(game, 'bullet5'), true);
        }
    }
    SingleBullet.prototype.fire = function (source) {
        if (this.game.time.time < this.nextFire) {
            return;
        }
        var x = source.x + 10;
        var y = source.y + 10;
        this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);
        this.nextFire = this.game.time.time + this.fireRate;
    };
    return SingleBullet;
}(Phaser.Group));
