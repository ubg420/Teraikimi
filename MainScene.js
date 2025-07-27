phina.define('MainScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.backgroundColor = '#444';

    GameMain = this;

    BackGroup =  DisplayElement().addChildTo(this);
    ObjectGroup = DisplayElement().addChildTo(this);

    this.bg = Sprite("Back").addChildTo(BackGroup);
    this.bg.setSize(SCREEN_WIDTH+10,SCREEN_HEIGHT+10)
    this.bg.setPosition(this.gridX.center(),this.gridY.center());

    this.Player = Player().addChildTo(this);
    this.Dog = Dog().addChildTo(this);
  //  this.Rikuzyo = Rikuzyo().addChildTo(ObjectGroup);
    EffectGroup = DisplayElement().addChildTo(this);

    var self = this;




    this.TutorialFLG = true;
    this.TutorialText;
    this.TutorialText = Label('').addChildTo(self);
    this.TutorialText.setPosition(self.gridX.center(),self.gridY.center(-4));
    this.TutorialText.fill = 'white'; // 色を変更
    this.TutorialText.strokeWidth = 8;
    this.TutorialText.fontSize = 84; // フォントサイズを変更

    this.BlackBG;
    this.PushHissatuCount = 0;
    this.HissatuButtonMax = 1;  //TODO
    this.HissatuTimer = 0;
    this.HissatuRemit = 50;
    this.GameMode = "Normal";


  //  this.DebugFLG = true;
    this.GameLevel = 1;


    if(!TUTORIAL_FLG){
      this.NextEnemy();
    }
    else{
      this.GameStart();
    }



    this.timer = 0;


  },

  update: function(app){


    if(this.GameMode === "Hissatu"){

      this.HissatuTimer++;
      if(this.HissatuTimer > this.HissatuRemit){
        this.HissatuMiss();
      }


    }


  },

  onpointstart: function(e){
    switch (this.Player.MoveMode) {
      case "Normal":
        this.Player.CatchAction();

        break;

      case "Kamae":
        this.Player.RendaStart();

        this.bg.tweener
        .clear()
        .to({y:this.gridY.center()}, 50)
        .to({y:this.gridY.center(0.2)}, 50)
        .to({y:this.gridY.center(-0.2)}, 50)
        .to({y:this.gridY.center()}, 50)
        var bokoboko = BokoBokoEffect().addChildTo(EffectGroup);
        var toucheffect = TouchEffect(e.pointer.x,e.pointer.y,2).addChildTo(EffectGroup);

        break;


      case "Renda":

        this.bg.tweener
        .clear()
        .to({y:this.gridY.center()}, 50)
        .to({y:this.gridY.center(0.2)}, 50)
        .to({y:this.gridY.center(-0.2)}, 50)
        .to({y:this.gridY.center()}, 50)
        var bokoboko = BokoBokoEffect().addChildTo(EffectGroup);
        var toucheffect = TouchEffect(e.pointer.x,e.pointer.y,2).addChildTo(EffectGroup);

        this.Player.RendaAdd();

        break;


      case "GameOver":

        break;

      default:

    }
/*
    var toucheffect = Sprite("HitEffect").addChildTo(EffectGroup);
    toucheffect.setPosition(e.pointer.x,e.pointer.y);
    toucheffect.tweener
    .clear()
    .to({alpha:0,scaleX:3,scaleY:3}, 300)
    .call(function(){
      toucheffect.remove();
    })
*/

    //var toucheffect = TouchEffect(e.pointer.x,e.pointer.y).addChildTo(EffectGroup);

  },



  NextEnemy:function(){
    var self = this;
    var enemytext = "";
    switch (this.GameLevel) {
      case 1:
        enemytext = '陸上部員が\n接近中';
        break;

      case 2:
        enemytext = '軽自動車が\n接近中';

      break;

      case 3:
        enemytext = '無人在来線が\n接近中';

      break;

      case 4:
        enemytext = '怪獣王が\n接近中';

      break;

      case 5:
        enemytext = '月が接近中';

        break;

      case 6:
        enemytext = '';

        break;

      default:

    }

    var EnemyLabel;
    this.tweener
    .clear()
    .call(function(){
      EnemyLabel = Label(enemytext).addChildTo(self);
      EnemyLabel.setPosition(self.gridX.center(),self.gridY.center(-4));
      EnemyLabel.fill = 'white'; // 色を変更
      EnemyLabel.strokeWidth = 8;
      EnemyLabel.fontSize = 84; // フォントサイズを変更
      EnemyLabel.scaleY = 1.5;
      EnemyLabel.scaleX = 1.5;
      EnemyLabel.tweener
        .clear()
        .to({alpha:1}, 1)
        .wait(300)
        .to({alpha:0}, 1)
        .wait(300)
        .setLoop(true)
      })
    .wait(1900)
    .call(function(){
      EnemyLabel.remove();
    })
    .wait(500)
    .call(function(){
      switch (self.GameLevel) {
        case 1:
          var Enemy = Rikuzyo().addChildTo(ObjectGroup);
          self.HissatuButtonMax = 1;
          break;

        case 2:
          var car = Car().addChildTo(ObjectGroup);
          self.HissatuButtonMax = 2;

        break;


        case 3:
          var zairaisen = Zairaisen().addChildTo(ObjectGroup);
          self.HissatuButtonMax = 3;

        break;

        case 4:
          var kaizyu = Kaizyu().addChildTo(ObjectGroup);
          self.HissatuButtonMax = 4;

        break;

        case 5:
          var inseki = Inseki().addChildTo(ObjectGroup);
          self.HissatuButtonMax = 5;

          break;

        case 6:
          var player2;
          var player2SS;
          var youwin;
          self.HissatuButtonMax = 6;

          self.tweener
          .clear()
          .call(function(){
              youwin = Sprite('YOUWIN').addChildTo(self);
              youwin.scaleX = 5;
              youwin.scaleY = 5;
              youwin.alpha = 0;
              youwin.tweener
              .clear()
              .to({scaleX:1.4,scaleY:1.4,alpha:1}, 1300,"easeOutQuart");
              youwin.x = SCREEN_WIDTH /2;
              youwin.y = 200;
          })
          .wait(3000)
          .call(function(){

            player2 = Sprite('Player2').addChildTo(EffectGroup);
            player2SS = FrameAnimation('Player2SS');
            player2SS.attachTo(player2);
            player2SS.fit = false;
            player2.setSize(100, 100);
            player2SS.gotoAndPlay('Uppercut');
            player2.setPosition(SCREEN_WIDTH,500);


            var hissatueffect2 = Sprite('HissatuEffect2').addChildTo(EffectGroup);
            hissatueffect2.setPosition(SCREEN_WIDTH,500);
            hissatueffect2.rotation = 30;
            hissatueffect2.tweener
              .clear()
              .by({x:-300,y:-300,alpha:-1}, 1300,"easeOutQuart")
              .call(function(){
                hissatueffect2.remove();
              })

            player2.tweener
              .clear()
              .by({x:-300,y:-300}, 1300,"easeOutQuart")
              .wait(200)
              .to({y:595}, 1000,"easeInCubic")
              .call(function(){
                player2SS.gotoAndPlay('Normal');
              })
              .wait(2000)
              .call(function(){
                player2SS.gotoAndPlay('Uppercut');
              })
              .to({x: 1400,y:295}, 1000,"easeOutCubic")
              .call(function(){
                  var p2label;
                  p2label = Label("寺井シャドウ\nが接近中").addChildTo(self);
                  p2label.setPosition(self.gridX.center(),self.gridY.center(-4));
                  p2label.fill = 'white'; // 色を変更
                  p2label.strokeWidth = 8;
                  p2label.fontSize = 84; // フォントサイズを変更
                  p2label.scaleY = 1.5;
                  p2label.scaleX = 1.5;
                  p2label.tweener
                    .clear()
                    .to({alpha:1}, 1)
                    .wait(300)
                    .to({alpha:0}, 1)
                    .wait(300)
                    .setLoop(true)
                    .to({alpha:1}, 1)
                    .wait(300)
                    .to({alpha:0}, 1)
                    .wait(300)
                    .to({alpha:1}, 1)
                    .wait(300)
                    .call(function(){
                      p2label.remove();
                    })
                })
                .wait(3000)
                .call(function(){
                  var p2 = Player2().addChildTo(ObjectGroup);
                })

            youwin.x = SCREEN_WIDTH /2;
            youwin.y = 200;
            youwin.tweener
              .clear()
              .wait(300)
              .by({x:-1000,y:-1000,rotation:-300}, 2300,"easeOutQuart");


          })

          break;

        case 7:
          self.Player.WIN();
          var result = Result().addChildTo(self);

          break;

        default:

      }





    });



  },


  FirstEnemy:function(){
    var EnemyLabel;
    var self = this;
    this.tweener
    .clear()
    .call(function(){
        EnemyLabel = Label('陸上部員が\n接近中').addChildTo(self);
        EnemyLabel.setPosition(self.gridX.center(),self.gridY.center(-4));
        EnemyLabel.fill = 'white'; // 色を変更
        EnemyLabel.strokeWidth = 8;
        EnemyLabel.fontSize = 84; // フォントサイズを変更
        EnemyLabel.scaleY = 1.5;
        EnemyLabel.scaleX = 1.5;
        EnemyLabel.tweener
          .clear()
          .to({alpha:1}, 1)
          .wait(300)
          .to({alpha:0}, 1)
          .wait(300)
          .setLoop(true)

    })
    .wait(1900)
    .call(function(){
        EnemyLabel.remove();
        self.TutorialText.text = "タイミングよくタッチして\n止めろ！";

    })
    .wait(2000)
    .call(function(){
        var Enemy = Rikuzyo().addChildTo(ObjectGroup);

    })

  },




  GameStart: function(){
    var startlabel;
    var self = this;
    var yubi;
    this.tweener
    .clear()
    .wait(400)
    .call(function(){
      startlabel = Label('寺井').addChildTo(self);
      startlabel.setPosition(self.gridX.center(),self.gridY.center(-4));
      startlabel.fill = 'white'; // 色を変更
      startlabel.strokeWidth = 8;
      startlabel.fontSize = 84; // フォントサイズを変更

      yubi = Sprite("Yubi").addChildTo(self);
      yubi.setSize(100,100)
      yubi.setPosition(self.gridX.center(),self.gridY.center());
      yubi.rotation = 90;
      yubi.tweener
        .clear()
        .by({y:100}, 400,"easeInCubic")
        .by({y:-100}, 400,"easeOutQuart")
        .setLoop(true)

    })
    .wait(2000)
    .call(function(){
      startlabel.text = "こいぬ";
      yubi.setPosition(self.gridX.center(-7),self.gridY.center(-2));

    })
    .wait(2000)
    .call(function(){
      yubi.remove();
      startlabel.y += 100;
      startlabel.text = "まもれ！";
      startlabel.rotation = 13;
      startlabel.tweener
        .clear()
        .by({scaleX:2,scaleY:2}, 400,"easeOutExpo")
        .wait(500)
        .by({x:1400,y:-500,rotation:380}, 300)
        .call(function(){
          startlabel.remove();
        })

      })
    .wait(1500)
    .call(function(){
      self.FirstEnemy();

    });


  },

  GameOver: function(){
    this.GameMode = "GameOver";
    this.TutorialText.text = "";
    var result = Result().addChildTo(this);
  },

  Retry: function(){
    this.exit("Main");
  },

  RendaTutorial: function(){
    if(this.TutorialFLG){
      this.TutorialText.text = "連打！！";
      this.TutorialText.rotation = -10;
      this.TutorialText.fontSize = 120;
      this.TutorialText.scaleX = 1.2;
      this.TutorialText.scaleY = 1.2;
      this.TutorialText.tweener
        .clear()
        .to({scaleX:1,scaleY:1}, 100)
      //this.TutorialFLG = false;

    }
  },

  FlashEffect: function(){
    var Flash;

    //コリジョン
    Flash = RectangleShape().addChildTo(this);
    Flash.width = SCREEN_WIDTH * 2;
    Flash.height = SCREEN_HEIGHT * 2;
    Flash.fill = "white";
    Flash.tweener
      .clear()
      .wait(5)
      .call(function(){
        Flash.remove();
      })

  },

  HissatuMove: function(){
    this.BlackBG = RectangleShape().addChildTo(BackGroup);
    this.BlackBG.width = SCREEN_WIDTH * 2;
    this.BlackBG.height = SCREEN_HEIGHT * 2;
    this.BlackBG.fill = "black";

    var Flash;

    var self = this;


    this.tweener
      .clear()
      .call(function(){
        Flash = Sprite("Flash").addChildTo(BackGroup);
        Flash.setSize(SCREEN_WIDTH,SCREEN_HEIGHT)
        Flash.setPosition(self.gridX.center(),self.gridY.center(1));
        Flash.tweener
          .clear()
          .wait(300)
          .to({alpha:0}, 1000)
          .wait(300)


      })
      .wait(1400)
      .call(function(){

        self.TutorialText.text = "押せ！";
        self.TutorialText.scaleX = 1.2;
        self.TutorialText.scaleY = 1.2;
        self.TutorialText.tweener
          .clear()
          .to({scaleX:1,scaleY:1}, 50)
        self.TutorialText.rotation =-10;
        self.CreateHissatuButton();

      })
      .to({alpha:0}, 1000)
      .wait(300)
      .call(function(){
        Flash.remove();

      })
  },

  CreateHissatuButton: function(){

    this.HissatuTimer = 0;
    this.GameMode = "Hissatu";

    //TODO HISSATU
    switch (this.HissatuButtonMax) {
      case 1:
        var hissatuButton = HissatuButton(this.gridX.center(),this.gridY.center()).addChildTo(EffectGroup);

        break;

      case 2:
        var hissatuButton1 = HissatuButton(this.gridX.center(-3),this.gridY.center()).addChildTo(EffectGroup);
        var hissatuButton2 = HissatuButton(this.gridX.center(3),this.gridY.center()).addChildTo(EffectGroup);


        break;

      case 3:
      var hissatuButton1 = HissatuButton(this.gridX.center(-3),this.gridY.center(-4)).addChildTo(EffectGroup);
      var hissatuButton2 = HissatuButton(this.gridX.center(3),this.gridY.center(-4)).addChildTo(EffectGroup);
      var hissatuButton3 = HissatuButton(this.gridX.center(),this.gridY.center(4)).addChildTo(EffectGroup);

        break;

      case 4:
        var hissatuButton1 = HissatuButton(this.gridX.center(-4),this.gridY.center(-4)).addChildTo(EffectGroup);
        var hissatuButton2 = HissatuButton(this.gridX.center(-4),this.gridY.center(4)).addChildTo(EffectGroup);
        var hissatuButton3 = HissatuButton(this.gridX.center(4),this.gridY.center(-4)).addChildTo(EffectGroup);
        var hissatuButton4 = HissatuButton(this.gridX.center(4),this.gridY.center(4)).addChildTo(EffectGroup);

        break;

      case 5:
        var hissatuButton = HissatuButton(this.gridX.center(),this.gridY.center()).addChildTo(EffectGroup);
        var hissatuButton1 = HissatuButton(this.gridX.center(-4),this.gridY.center(-4)).addChildTo(EffectGroup);
        var hissatuButton2 = HissatuButton(this.gridX.center(-4),this.gridY.center(4)).addChildTo(EffectGroup);
        var hissatuButton3 = HissatuButton(this.gridX.center(4),this.gridY.center(-4)).addChildTo(EffectGroup);
        var hissatuButton4 = HissatuButton(this.gridX.center(4),this.gridY.center(4)).addChildTo(EffectGroup);

        break;

      case 6:
        var hissatuButton = HissatuButton(this.gridX.center(-4),this.gridY.center(-4)).addChildTo(EffectGroup);
        var hissatuButton1 = HissatuButton(this.gridX.center(),this.gridY.center(-4)).addChildTo(EffectGroup);
        var hissatuButton2 = HissatuButton(this.gridX.center(4),this.gridY.center(-4)).addChildTo(EffectGroup);
        var hissatuButton3 = HissatuButton(this.gridX.center(-4),this.gridY.center(4)).addChildTo(EffectGroup);
        var hissatuButton4 = HissatuButton(this.gridX.center(),this.gridY.center(4)).addChildTo(EffectGroup);
        var hissatuButton4 = HissatuButton(this.gridX.center(4),this.gridY.center(4)).addChildTo(EffectGroup);

        break;

      default:


    }

  },

  HissatuMiss: function(){

    var group = EffectGroup.children;
    group.eraseIfAll(function(elem) {
      if (elem.tag === 'Button') {
        return true;
      }
    });

    this.Player.Enemy.Run();
    this.Player.Miss();
    this.BlackBG.remove();
    this.TutorialText.text = "";


  },

  PushHissatuButton: function(){

    this.PushHissatuCount++;
    if(this.PushHissatuCount >= this.HissatuButtonMax){
      this.KnockOut();
    }

  },

  KnockOut: function(){
    TUTORIAL_FLG = false;
    this.PushHissatuCount = 0;
    this.BlackBG.remove();
    this.TutorialText.text = "";
    this.Player.KnockOut();
    this.GameMode = "Normal";
    this.HissatuTimer = 0;
    this.GameLevel++;

    var ko = Sprite("KO").addChildTo(BackGroup);
    ko.setPosition(this.gridX.center(),this.gridY.center(-4));
    ko.scaleX = 4;
    ko.scaleY = 4;
    ko.alpha = 0;
    ko.tweener
      .clear()
      .to({alpha:1,scaleX:1,scaleY:1}, 300,"easeOutCirc")
      .wait(1700)
      .call(function(){
        ko.remove();
      })

  },

  BlackOut: function(){
    //コリジョン
    this.BlackBG = RectangleShape().addChildTo(BackGroup);
    this.BlackBG.width = SCREEN_WIDTH * 2;
    this.BlackBG.height = SCREEN_HEIGHT * 2;
    this.BlackBG.fill = "black";
    /*
    BlackBG.tweener
      .clear()
      .wait(1300)
      .call(function(){
        BlackBG.remove();
      })
    */

    var Flash;
    Flash = Sprite("Flash").addChildTo(BackGroup);
    Flash.setSize(SCREEN_WIDTH,SCREEN_HEIGHT)
    Flash.setPosition(this.gridX.center(),this.gridY.center(2));

    Flash.tweener
      .clear()
      .to({alpha:0}, 1000)
      .wait(300)
      .call(function(){

        Flash.remove();
      })

  },



});
