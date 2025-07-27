phina.define("Player2", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit({
        width: 180,
        height: 100,
        fill: "green",
        stroke: null,

      });

        this.x = SCREEN_WIDTH + this.width;
        this.y = 595;
        this.name ="もう一人の寺井";

        this.width = 100;
        this.height = 100;

        this.tag = "enemy";
        this.Player2FLG = true;

        this.speed = 40;
        this.vx = this.speed;
        this.vy = 1;

        //何回連打したら倒せるか
        this.RendaRemit = 60;

        this.sprite = Sprite('Player2').addChildTo(this);
        this.spriteSS = FrameAnimation('Player2SS');
        this.spriteSS.attachTo(this.sprite);
        this.spriteSS.fit = false;
        this.sprite.setSize(100, 100);

        this.spriteSS.gotoAndPlay('Hunbari');

        this.setBoundingType("rect");
        this.color = "hsla(133, 100%, 50%, 1)";
        this.ColisionFLG = false;

        //コリジョン
        this.colision = RectangleShape().addChildTo(this);
        this.colision.alpha = 0; //コリジョン可視化 = 1

        this.HitFLG = false;

        this.MoveMode = "Run";

        this.hissatueffect2 = Sprite('HissatuEffect2').addChildTo(this);
        this.hissatueffect2.x = 70;
        this.hissatueffect2.scaleX = 1.4;
        this.hissatueffect2.scaleY = 1.4;


    },

    update: function(app) {
      this.colision.width = this.width;
      this.colision.height = this.height;

      switch (this.MoveMode) {
        case "Run":
          this.x -= this.vx;
          if (this.children.length < KEMURI_MAX_NUM) {
            var p = Kemuri(this.x +45, this.y + 52).addChildTo(EffectGroup);
            p.ondisappear = function() {
              p.remove();
            }.bind(this);
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

            if(this.HunbariEndX + 100 >= this.x){
              this.MoveMode = "Kamae";
              this.spriteSS.gotoAndPlay('Kamae');

            }

            // 速度を座標に加算する
            this.x -= this.dx;

            break;

            case "Hissatu":
              //炎エフェクト
              if (this.children.length < FIRE_MAX_NUM) {
                var p = Fire(this.x, this.y + 5,true).addChildTo(BackGroup);
                p.ondisappear = function() {
                  p.remove();
                }.bind(this);
              }

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

      this.hissatueffect2.tweener
        .clear()
        .to({alpha:0}, 500)

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
      this.hissatueffect2.alpha = 1;


      this.MoveMode = "Run";


    },


    RendaStart: function(){
      this.MoveMode = "Renda";
      this.spriteSS.gotoAndPlay('Renda');
      this.RendaEffect = Sprite('RendaEffect2').addChildTo(this);
      this.RendaEffectSS = FrameAnimation('RendaEffectSS');
      this.RendaEffectSS.attachTo(this.RendaEffect);
      this.RendaEffectSS.fit = false;
      this.RendaEffect.setSize(200, 200);
      this.RendaEffectSS.gotoAndPlay('Normal');
      this.RendaEffect.x = 15;


    },

    RendaAdd: function(){

      var randX = Math.floor( Math.random() * 50 );
      var randY = Math.floor( Math.random() * 150 ) - 75;
    //  var toucheffect = TouchEffect(this.x + randX + 50,this.y + randY,0.2).addChildTo(EffectGroup);

      // 図形をシーンに追加
      var hit = Sprite("HitEffect2").addChildTo(EffectGroup);
      hit.setSize(200,200);
      // 位置を指定
      hit.setPosition(this.x - randX - 65,this.y + randY);
      hit.tweener
      .clear()
      .to({alpha:0.3,scaleX:0.2,scaleY:0.2}, 250)
      .call(function(){
        hit.remove();
      })

    },


    Hissatu(){
      this.MoveMode = "Hissatu";
      this.spriteSS.gotoAndPlay('Kamae');

      this.RendaEffect.remove();
      this.RendaEffectSS.remove();



    },


});
