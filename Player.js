phina.define("Player", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit();

        this.DefaultX = 600;
        this.DefaultY = 595;

        this.x = this.DefaultX ;
        this.y = this.DefaultY;

        //ふんばったときの移動値
        this.HunbariX = 330;
        this.HunbariEndX  = this.DefaultX - this.HunbariX;

        this.Enemy;

        this.vx = 0;
        this.vy = 0;
        this.g  = 0;

        this.width = 100;
        this.height = 100;

        //キャッチ状態を続けられる時間
        this.HunbariRemit = 7;
        this.HunbariTimer = 0;

        //次のふんばりにうつれるまでの時間
        this.CoolDownTimeRemit = 10;
        this.CoolDownTimer = 0;

        //連打できる時間
        this.RendaTimeRemit = 5000;
        this.RendaTimer = 0;

        this.RendaRemit = 0;
        this.RendaCount = 0;

        this.MoveMode = "Normal"

        this.Player = Sprite('Player').addChildTo(this);
        this.PlayerSS = FrameAnimation('PlayerSS');
        this.PlayerSS.attachTo(this.Player);
        this.PlayerSS.fit = false;
        this.Player.setSize(100, 100);

        this.PlayerSS.gotoAndPlay('Normal');

        this.scaleX = 1;
        this.scaleY = 1;


        this.setBoundingType("rect");
        this.color = "hsla(133, 100%, 50%, 1)";
        this.ColisionFLG = false;

        //コリジョン
        this.colision = RectangleShape().addChildTo(this);
        this.colision.width = this.width;
        this.colision.height = this.height;
        this.colision.alpha = 0; //コリジョン可視化 = 1

        this.HitFLG = false;

        this.EnemySpeed = 0;


        this.targetPosition = Vector2(this.x, this.y);

    },

    update: function(app) {
      this.colision.width = this.width;
      this.colision.height = this.height;

      switch (this.MoveMode) {
        case "Normal":
          this.HitCheck();

          break;

        case "Hit":
          this.x += this.vx;
          this.y += this.vy;
          this.vy += this.g;

          break;

        case "Hunbari":


          this.HunbariTimer++;
          //ふんばり終了
          if(this.HunbariTimer > this.HunbariRemit){
            this.HunbariTimer = 0;
            this.Player.tweener
            .clear()
            .to({rotation:30}, 100)
            .to({rotation:0}, 200)

            this.PlayerSS.gotoAndPlay('Tobashi');
            this.MoveMode = "CoolDown";

          }

          this.HitCheck();

          break;

          case "CoolDown":

            this.CoolDownTimer++;
            if(this.CoolDownTimer > this.CoolDownTimeRemit){
              this.CoolDownTimer = 0;
              this.MoveMode = "Normal";
              this.PlayerSS.gotoAndPlay('Normal');



            }
            this.HitCheck();

            break;


            case "Hold":
              // 目的地までの距離
            	var sub =   this.x - this.HunbariEndX;
            	// 目的地までの距離に(1.0 - 摩擦係数)を乗算した物を速度とする
            	this.dx = sub * (1.0 - 0.92);
            	// 速度の最大制限を付ける
            	if(this.dx > this.EnemySpeed)	this.dx = this.EnemySpeed;
            	// 速度を座標に加算する
            	this.x -= this.dx;

              if(this.HunbariEndX + 1 >= this.x){
                this.MoveMode = "Kamae";
                this.PlayerSS.gotoAndPlay('Kamae');
                GameMain.RendaTutorial();

              }

              //煙エフェクト
              if(this.HunbariEndX + 10 < this.x){
                if (this.children.length < KEMURI_MAX_NUM) {
                  var p = Kemuri(this.x -45, this.y + 52).addChildTo(EffectGroup);
                  p.ondisappear = function() {
                    p.remove();
                  }.bind(this);
                }


              }



              break;

              case "Kamae":
              this.RendaTimer += app.deltaTime;

              if(this.RendaTimer > this.RendaTimeRemit){
                  this.RendaCount = 0;
                  this.Miss();
                  this.Enemy.Run();


                }

                break;


              case "Renda":
              // １フレームあたりの経過時間(ミリ秒)
              //todo
                this.RendaTimer += app.deltaTime;

                if(this.RendaTimer > this.RendaTimeRemit){
                  this.RendaCount = 0;
                  this.Miss();
                  this.Enemy.Run();
                  this.RendaEffect.remove();
                  this.RendaEffectSS.remove();

                }

                break;


              case "Hissatu":
                //炎エフェクト
                if (this.children.length < FIRE_MAX_NUM) {
                  var p = Fire(this.x, this.y + 5).addChildTo(BackGroup);
                  p.ondisappear = function() {
                    p.remove();
                  }.bind(this);
                }

                break;

              case "KO":

                break;


      }

    //	this.x = this.mx + GameMain.Player.x;
    //	this.y = this.my + GameMain.Player.y;

    },

    HitCheck: function(){
      //当たり判定
      var og = ObjectGroup.children;
      var self = this;
      og.each(function(Object) {
          if(self.hitTestElement(Object)){

            switch (Object.tag) {
              case "enemy":
                self.HitEnemy(Object);
                return true;
                break;

            }

          }

      });
      return false;


    },

    //敵とあたったときの処理
    HitEnemy: function(enemy){
      switch (this.MoveMode) {
        case "Normal":
        case "CoolDown":
          this.Miss();

          break;

        //キャッチ成功時
        case "Hunbari":
          this.CatchEnemy();
          enemy.CatchEnemy(this.HunbariX);
          this.EnemySpeed = enemy.speed -5;
          this.RendaRemit = enemy.RendaRemit;
          this.Enemy = enemy;


          break;
        }


    },

    //敵にあたった。連打負けた。必殺を押せなかった
    Miss: function(){
      this.vx = -10;
      this.vy = -15;
      this.g  = 1;
      this.MoveMode = "Hit";

    },

    //キャッチ成功
    CatchEnemy: function(){
      GameMain.TutorialText.text = "";
      GameMain.FlashEffect();

      this.HunbariTimer = 0;
      this.MoveMode = "Hold";
      this.PlayerSS.gotoAndPlay('Hunbari');

      var shape = CircleShape().addChildTo(EffectGroup);
      // 位置を指定
      shape.setPosition(this.x, this.y);
      shape.fill = 'rgba(0,0,0,0)';
      shape.stroke = 'white';
      shape.strokeWidth = 2;
      shape.radius  = 100;
      shape.tweener
      .clear()
      .to({scaleX:1.2,scaleY:1.2}, 200,"easeOutCubic")
      .wait(150)
      .to({scaleX:1.3,scaleY:1.3,alpha:0}, 300,"easeOutCubic")
      .call(function(){
        shape.remove();
      })


    },

    CatchAction: function(){
      if(this.MoveMode === "Normal"){
        this.MoveMode = "Hunbari";
        this.PlayerSS.gotoAndPlay('Hunbari');
        this.Player.tweener
          .clear()
          .to({y:-8}, 10)
          .to({y:0}, 10)

          var shape = CircleShape().addChildTo(EffectGroup);
          // 位置を指定
          shape.setPosition(this.x, this.y);
          shape.fill = 'rgba(0,0,0,0)';
          shape.stroke = 'white';
          shape.strokeWidth = 3;
          shape.radius  = 40;
          shape.tweener
          .clear()
          .to({scaleX:2,scaleY:2}, 50)
          .wait(150)
          .to({scaleX:2.4,scaleY:2.4,alpha:0}, 300,"easeOutCubic")
          .call(function(){
            shape.remove();
          })




      }
    },

    RendaStart: function(){
      this.MoveMode = "Renda";
      this.PlayerSS.gotoAndPlay('Renda');

      this.RendaEffect = Sprite('RendaEffect').addChildTo(this);
      this.RendaEffectSS = FrameAnimation('RendaEffectSS');
      this.RendaEffectSS.attachTo(this.RendaEffect);
      this.RendaEffectSS.fit = false;
      this.RendaEffect.setSize(200, 200);
      this.RendaEffectSS.gotoAndPlay('Normal');
      this.RendaEffect.x = -15;

      this.RendaCount++;


      if(this.Enemy.Player2FLG){
        this.Enemy.RendaStart();
      }
    },

    RendaAdd: function(){
      this.RendaCount++;
      if(this.RendaCount >= this.RendaRemit){
//        this.KnockOut();
        this.Hissatu();


      }
      var randX = Math.floor( Math.random() * 50 );
      var randY = Math.floor( Math.random() * 150 ) - 75;
    //  var toucheffect = TouchEffect(this.x + randX + 50,this.y + randY,0.2).addChildTo(EffectGroup);


      // 図形をシーンに追加
      var hit = Sprite("HitEffect").addChildTo(EffectGroup);
      hit.setSize(200,200);
      // 位置を指定
      hit.setPosition(this.x + randX + 65,this.y + randY);
      hit.tweener
      .clear()
      .to({alpha:0.3,scaleX:0.2,scaleY:0.2}, 250)
      .call(function(){
        hit.remove();
      })

      if(this.Enemy.Player2FLG){
        this.Enemy.RendaAdd();
      }
    },

    Hissatu(){
      this.MoveMode = "Hissatu";
      this.PlayerSS.gotoAndPlay('Kamae');

      this.RendaCount = 0;
      this.RendaTimer = 0;

      this.RendaEffect.remove();
      this.RendaEffectSS.remove();

      GameMain.TutorialText.text = "";
      GameMain.HissatuMove();

      if(this.Enemy.Player2FLG){
        this.Enemy.Hissatu();
      }
    },

    KnockOut: function(){

      var hissatueffect;
      hissatueffect = Sprite('HissatuEffect').addChildTo(this);
      hissatueffect.rotation = 140;
      hissatueffect.setSize(300,230);
      hissatueffect.x = -30;
      hissatueffect.y = 0;
      hissatueffect.scaleX = 1;
      hissatueffect.scaleY = 1;
      hissatueffect.tweener
      .clear()
      .wait(250)
      .to({alpha:0},400)
      .call(function(){
        hissatueffect.remove();
      })
      var self = this;
      this.tweener
        .clear()
        .call(function(){
          self.PlayerSS.gotoAndPlay('Uppercut');



          self.Enemy.KnockOut();
        })
        .to({x:self.DefaultX,y:self.DefaultY - 100},1000,"easeOutQuint")
        .call(function(){
          self.MoveMode = "KO";
        })
        .wait(1000)
        .to({x:self.DefaultX,y:self.DefaultY},300,"easeInQuart")
        .call(function(){
          self.PlayerSS.gotoAndPlay('Normal');
          self.MoveMode = "Normal";
        })
        .wait(1000)
        .call(function(){
          GameMain.NextEnemy();
        })


    },

    WIN: function(){
      this.MoveMode = "Win";
      this.PlayerSS.gotoAndPlay('Uppercut');
      this.Player.tweener
        .clear()
        .to({y:-270,x:30},1000,"easeOutCubic")

    },

});
