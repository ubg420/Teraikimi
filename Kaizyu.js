phina.define("Kaizyu", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit({
        width: 930,
        height: 880,
        fill: "green",
        stroke: null,

      });

        this.x = SCREEN_WIDTH + this.width;
        this.y = 100;

        this.tag = "enemy";
        this.name ="怪獣王";

        this.speed = 30;
        this.vx = this.speed;
        this.vy = -16;
        this.g = 1;

        //何回連打したら倒せるか
        this.RendaRemit = 40;

        this.sprite = Sprite('Kaizyu').addChildTo(this);
        this.sprite.setSize(1000, 1000);




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
          this.y += this.vy;
          this.vy+=this.g;

          if(this.y > 220){
            this.MoveMode = "Stop";
            this.y = 220;

            GameMain.bg.tweener
            .clear()
            .to({y:GameMain.gridY.center()}, 50)
            .to({y:GameMain.gridY.center(0.2)}, 50)
            .to({y:GameMain.gridY.center(-0.2)}, 50)
            .to({y:GameMain.gridY.center()}, 50)

            var self = this;
            this.tweener
            .clear()
            .wait(1000)
            .call(function(){
                self.vy = -20;
                self.MoveMode = "Run";
            });
          }


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
        .to({x:2200,y:-1000}, 1000)
        .call(function(){
          self.remove();

        });

      this.sprite.tweener
        .clear()
        .to({rotation:40}, 500)
        .call(function(){

        });




    },

    Run: function(){
      this.MoveMode = "Run";


    }

});
