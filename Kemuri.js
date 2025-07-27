var KEMURI_MAX_NUM          = 133;  // 最大パーティクル数
var KEMURI_COLOR_START      = 22;    // color angle の開始値
var KEMURI_COLOR_END        = 04;   // color angle の終了値
var KEMURI_VELOCITY_RANGE_X = 5;    // 速度の初期値の範囲 x
var KEMURI_VELOCITY_RANGE_Y = -1;    // 速度の初期値の範囲 y
var KEMURI_ACCELERATION_Y   = -0.04; // 加速度 y
var KEMURI_SCALE            = 0.4;    // 初期スケール
var KEMURI_SCALE_DOWN_SPEED = 0.01;// スケールダウンのスピード

phina.define('Kemuri', {
  superClass: 'RectangleShape',

  init: function(x, y) {
    this.superInit({
      stroke: false,
      radius: 64,
    });


    var grad = this.canvas.context.createRadialGradient(0, 0, 0, 0, 0, 1);
    grad.addColorStop(0, 'hsla({0}, 175%, 150%, 1.0)'.format(Math.randint(KEMURI_COLOR_START, KEMURI_COLOR_END)));
    grad.addColorStop(1, 'hsla({0}, 75%, 50%, 1.0)'.format(Math.randint(KEMURI_COLOR_START, KEMURI_COLOR_END)));

    this.fill = grad;

//    this.fill = "#A57232";
    this.fill = "white";


    this.beginPosition = Vector2();
    this.velocity = Vector2();
    this.reset(x, y);


  },

  reset: function(x, y) {
    this.beginPosition.set(x, y);
    this.position.set(this.beginPosition.x, this.beginPosition.y);
    this.velocity.set(
      Math.randint(-KEMURI_VELOCITY_RANGE_X, KEMURI_VELOCITY_RANGE_X),
      Math.randint(-KEMURI_VELOCITY_RANGE_Y, KEMURI_VELOCITY_RANGE_Y)
      );
    this.scaleX = this.scaleY = Math.randfloat(KEMURI_SCALE*0.8, KEMURI_SCALE*1.2);
  },

  update: function() {
    this.position.add(this.velocity);
    this.velocity.x = 0;
    this.velocity.y += KEMURI_ACCELERATION_Y;



    this.scaleX -= KEMURI_SCALE_DOWN_SPEED;
    this.scaleY -= KEMURI_SCALE_DOWN_SPEED;

    if (this.scaleX < 0) {
      this.flare('disappear');
    }
  }
});
