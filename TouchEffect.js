phina.define("TouchEffect", {
    superClass: "DisplayElement",
    init: function(X,Y,scale) {
      this.superInit({
        width: 550,
        height: 550,
        fill: "green",
        stroke: null,

      });

      var shape = CircleShape().addChildTo(this);
      // 位置を指定
      shape.setPosition(X, Y);
      shape.fill = 'rgba(0,0,0,0)';
      shape.stroke = 'white';
      shape.strokeWidth = 2 * scale;
      shape.radius  = 180;
      shape.tweener
      .clear()
      .to({alpha:0,scaleX:scale,scaleY:scale}, 500,"easeOutCubic")
      .to({alpha:0}, 200,"easeOutQuint")
      .call(function(){
        shape.remove();
      })

      // 図形をシーンに追加
      var star = StarShape().addChildTo(this);
      // 位置を指定
      star.stroke = 'red';
      star.fill = 'yellow';
      star.setPosition(X, Y);
      star.sides = 11;
      star.sideIndent = 0.6;
      star.strokeWidth = 11;
      star.radius  = 90;
      star.tweener
      .clear()
      .to({alpha:0,scaleX:scale,scaleY:scale}, 300)
      .call(function(){
        star.remove();
      })



    },

    update: function(app) {


    },



});
