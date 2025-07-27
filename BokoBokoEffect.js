phina.define("BokoBokoEffect", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit({
        width: 550,
        height: 550,
        fill: "green",
        stroke: null,

      });
      var randX = Math.floor( Math.random() * 14 ) + 2;
      var randY = Math.floor( Math.random() * 14 ) + 2;
      var randrotation = Math.floor( Math.random() * 81 ) -40 ;
      var randtext = Math.floor( Math.random() * 5 ) ;
      var bokotext = "";
      switch (randtext) {
        case 0:
          bokotext = "ゴス"
          break;

        case 1:
          bokotext = "ボコ"
          break;

        case 2:
          bokotext = "ドカッ"
          break;

        case 3:
          bokotext = "バキ"
          break;

        case 4:
          bokotext = "ドゴォ"
          break;


        default:

      }

      if(GameMain.Player.Enemy.Player2FLG){
        bokotext = "オラ"
      }


      var BokoBokoLabel = Label(bokotext).addChildTo(this);
      BokoBokoLabel.setPosition(GameMain.gridX.span(randX),GameMain.gridY.span(randY));
      BokoBokoLabel.rotation =randrotation;
      // ラベルを表示
      BokoBokoLabel.fill = 'brack'; // 色を変更
      BokoBokoLabel.fontSize = 200; // フォントサイズを変更
      BokoBokoLabel.tweener
      .clear()
      .to({scaleX:0.4,scaleY:0.4}, 200)
      .call(function(){
        BokoBokoLabel.remove();
      })



    },

    update: function(app) {


    },



});
