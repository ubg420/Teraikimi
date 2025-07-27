phina.define("Rikuzyo", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit({
        width: 65,
        height: 100,
        fill: "green",
        stroke: null,

      });

        this.x = SCREEN_WIDTH;
        this.y = 560;
        this.name ="陸上部員";

        this.tag = "enemy";

        this.speed = 10;
        this.vx = this.speed;
        this.vy = 1;

        //何回連打したら倒せるか
        this.RendaRemit = 10;

        this.gloup = DisplayElement().addChildTo(this);


        this.sprite = Sprite('Rikuzyo').addChildTo(this.gloup);
        this.spriteSS = FrameAnimation('RikuzyoSS');
        this.spriteSS.attachTo(this.sprite);
        this.spriteSS.fit = false;
        this.sprite.setSize(180, 180);
        this.spriteSS.gotoAndPlay('Normal');

        this.setBoundingType("rect");
        this.color = "hsla(133, 100%, 50%, 1)";
        this.ColisionFLG = false;




        //コリジョン
        this.colision = RectangleShape().addChildTo(this);
        this.colision.width = 80;
        this.colision.height = this.height;
        this.colision.alpha = 0; //コリジョン可視化 = 1

        this.HitFLG = false;

        this.MoveMode = "Run";

        this.rikuzyocount = 0;
        this.rikuzyoubuMax = 15;
        this.timer = 0;
        this.rikuzyox = 50;
        this.timeremit = 100;

    },

    createRikuzyobu:function(x){
      var sprite = Sprite('Rikuzyo').addChildTo(this.gloup);
      sprite.x = x;
      var spriteSS = FrameAnimation('RikuzyoSS');
      spriteSS.attachTo(sprite);
      spriteSS.fit = false;
      sprite.setSize(180, 180);
      spriteSS.gotoAndPlay('Normal');
    },

    update: function(app) {
      this.colision.width = this.width;
      this.colision.height = this.height;


      this.timer += app.deltaTime;
      if(this.timer> this.timeremit){
        if(this.rikuzyocount < this.rikuzyoubuMax){
          var rand = Math.floor( Math.random() * 60 ) + 40;
          this.createRikuzyobu(this.rikuzyox);
          this.rikuzyocount++;
          this.rikuzyox += rand;
          this.timer = 0;
          this.timeremit =   rand;
        }

      }

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
        .to({x:1200,y:-100,rotation:0}, 1500)
        .call(function(){
          self.remove();

        });

        var g = this.gloup.children;
        var self = this;
        g.each(function(Object) {
          var randX = Math.floor( Math.random() * 1000 );
          var randY = Math.floor( Math.random() * 1000 );

          Object.tweener
            .clear()
            .to({x:randX,y:-randY,rotation:randX},1500)

        });


    },

    Run: function(){
      this.MoveMode = "Run";


    }

});
