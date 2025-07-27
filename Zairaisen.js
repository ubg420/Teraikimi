phina.define("Zairaisen", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit({
        width: 700,
        height: 250,
        fill: "green",
        stroke: null,

      });

        this.x = SCREEN_WIDTH + this.width;
        this.y = 550;
        this.name ="無人在来線";

        this.tag = "enemy";

        this.speed = 30;
        this.vx = this.speed;
        this.vy = 1;

        //何回連打したら倒せるか
        this.RendaRemit = 30;

        this.sprite = Sprite('Zairaisen').addChildTo(this);
        this.sprite.setSize(750, 250);
        this.sprite.tweener
          .clear()
          .by({y:2}, 50)
          .by({y:-2}, 50)
          .setLoop(true)


        this.sprite2= Sprite('Zairaisen2').addChildTo(this);
        this.sprite2.setSize(750, 250);
        this.sprite2.tweener
          .clear()
          .by({y:-2}, 50)
          .by({y:2}, 50)
          .setLoop(true)
        this.sprite2.x = 625;

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
        .to({x:1200,y:-100}, 500)
        .call(function(){
          self.remove();

        });

      this.sprite.tweener
        .clear()
        .to({rotation:180}, 500)
        .call(function(){

        });

      this.sprite2.tweener
        .clear()
        .to({rotation:-220}, 900)
        .call(function(){

        });


    },

    Run: function(){
      this.MoveMode = "Run";


    }

});
