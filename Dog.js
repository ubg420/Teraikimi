phina.define("Dog", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit({
        width: 50,
        height: 50,
        fill: "green",
        stroke: null,

      });

        this.x = 100;
        this.y = 610;

        this.vx = 0;
        this.vy = 0;
        this.g  = 0;

        this.Dog = Sprite('Dog').addChildTo(this);
        this.DogSS = FrameAnimation('DogSS');
        this.DogSS.attachTo(this.Dog);
        this.DogSS.fit = false;
        this.Dog.setSize(80, 80);

        this.DogSS.gotoAndPlay('Normal');


        this.setBoundingType("rect");
        this.color = "hsla(133, 100%, 50%, 1)";
        this.ColisionFLG = false;

        //コリジョン
        this.colision = RectangleShape().addChildTo(this);
        this.colision.width = 80;
        this.colision.height = this.height;
        this.colision.alpha = 0; //コリジョン可視化 = 1

        this.HitFLG = false;

        this.MoveMode = "Normal";

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

      }

    //	this.x = this.mx + GameMain.Player.x;
    //	this.y = this.my + GameMain.Player.y;

    },

    HitCheck: function(){
      //当たり判定

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

    },

    Hit: function(){
      switch (this.MoveMode) {
        case "Normal":
          this.vx = -10;
          this.vy = -10;
          this.g  = 0.8;
          GameMain.GameOver();
          this.MoveMode = "Hit";

          break;
        }

    }

});
