var FIRE_MAX_NUM          = 256;  // 最大パーティクル数
var FIRE_COLOR_START      = 220;    // color angle の開始値
var FIRE_COLOR_END        = 250;   // color angle の終了値
var FIRE2_COLOR_START      = 0;    // color angle の開始値
var FIRE2_COLOR_END        = 30;   // color angle の終了値
var FIRE_VELOCITY_RANGE_X = 8;    // 速度の初期値の範囲 x
var FIRE_VELOCITY_RANGE_Y = 6;    // 速度の初期値の範囲 y
var FIRE_ACCELERATION_Y   = -0.5; // 加速度 y
var FIRE_SCALE            = 1;    // 初期スケール
var FIRE_SCALE_DOWN_SPEED = 0.025;// スケールダウンのスピード

phina.define('Fire', {
  superClass: 'CircleShape',

  init: function(x, y,Player2FLG) {
    this.superInit({
      stroke: false,
      radius: 64,
    });

    this.blendMode = 'lighter';

    var grad = this.canvas.context.createRadialGradient(0, 0, 0, 0, 0, this.radius);
    if(!Player2FLG){
      grad.addColorStop(0, 'hsla({0}, 75%, 50%, 1.0)'.format(Math.randint(FIRE_COLOR_START, FIRE_COLOR_END)));
      grad.addColorStop(1, 'hsla({0}, 75%, 50%, 0.0)'.format(Math.randint(FIRE_COLOR_START, FIRE_COLOR_END)));
    }
    else{
      grad.addColorStop(0, 'hsla({0}, 75%, 50%, 1.0)'.format(Math.randint(FIRE2_COLOR_START, FIRE2_COLOR_END)));
      grad.addColorStop(1, 'hsla({0}, 75%, 50%, 0.0)'.format(Math.randint(FIRE2_COLOR_START, FIRE2_COLOR_END)));
    }

    this.fill = grad;

    this.beginPosition = Vector2();
    this.velocity = Vector2();
    this.reset(x, y);
  },

  reset: function(x, y) {
    this.beginPosition.set(x, y);
    this.position.set(this.beginPosition.x, this.beginPosition.y);
    this.velocity.set(
      Math.randint(-FIRE_VELOCITY_RANGE_X, FIRE_VELOCITY_RANGE_X),
      Math.randint(-FIRE_VELOCITY_RANGE_Y, FIRE_VELOCITY_RANGE_Y)
      );
    this.scaleX = this.scaleY = Math.randfloat(FIRE_SCALE*0.8, FIRE_SCALE*1.2);
  },

  update: function() {
    this.position.add(this.velocity);
    this.velocity.x += (this.beginPosition.x-this.x)/(this.radius/2);
    this.velocity.y += FIRE_ACCELERATION_Y;
    this.scaleX -= FIRE_SCALE_DOWN_SPEED;
    this.scaleY -= FIRE_SCALE_DOWN_SPEED;

    if (this.scaleX < 0) {
      this.flare('disappear');
    }
  }
});
