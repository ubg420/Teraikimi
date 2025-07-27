phina.define("Car", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit({
        width: 180,
        height: 100,
        fill: "green",
        stroke: null,

      });

        this.x = SCREEN_WIDTH + this.width;
        this.y = 580;
        this.name ="軽自動車";

        this.tag = "enemy";

        this.speed = 20;
        this.vx = this.speed;
        this.vy = 1;

        //何回連打したら倒せるか
        this.RendaRemit = 20;

        this.sprite = Sprite('Car').addChildTo(this);
        this.spriteSS = FrameAnimation('CarSS');
        this.spriteSS.attachTo(this.sprite);
        this.spriteSS.fit = false;
        this.sprite.setSize(200, 200);

        this.spriteSS.gotoAndPlay('Normal');

        this.setBoundingType("rect");
        this.color = "hsla(133, 100%, 50%, 1)";
        this.ColisionFLG = false;

        //コリジョン
        this.colision = RectangleShape().addChildTo(this);
        this.colision.alpha = 0; //コリジョン可視化 = 1

        this.HitFLG = false;

        this.MoveMode = "Run";



    },

    update: function(app) {
      this.colision.width = this.width;
      this.colision.height = this.height;

      switch (this.MoveMode) {
        case "Run":
          this.x -= this.vx;

          break;


          case "Hold":
            // 目的地までの距離
            var sub =  this.x - this.HunbariEndX;

            // 目的地までの距離に(1.0 - 摩擦係数)を乗算した物を速度とする
            this.dx = sub * (1.0 - 0.92);

            // 速度の最大制限を付ける
            if(this.dx > this.speed -5  ){
              this.dx = this.speed -5
            }

            // 速度を座標に加算する
            this.x -= this.dx;

            break;

      }

    //	this.x = this.mx + GameMain.Player.x;
    //	this.y = this.my + GameMain.Player.y;

    },

    HitCheck: function(){
      //当たり判定
      /*
      var og = ObjectGroup.children;
      var self = this;
      og.each(function(Object) {
        //  if(clash(self,block)){
          if(self.hitTestElement(Object)){

            switch (Object.tag) {
              case "enemy":
                self.Hit();

                break;

            }

          }

      });
      */
    },

    Hit: function(){


    },

    CatchEnemy: function(HunbariX){
      this.MoveMode = "Hold";
      this.HunbariEndX = this.x - HunbariX;
    },

    KnockOut: function(){
      var self = this;
      this.x += 100;
      this.tweener
        .clear()
        .to({x:1200,y:-100,rotation:180}, 500)
        .call(function(){
          self.remove();

        });

    },

    Run: function(){
      this.MoveMode = "Run";


    }

});
