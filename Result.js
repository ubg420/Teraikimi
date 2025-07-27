phina.define("Result", {
    superClass: "DisplayElement",
    init: function() {
      this.superInit({
        width: 0,
        height: 0,
      });

      this.x = 0;
      this.y = 0;

      var url = "http://cachacacha.com/GAME/Teraikimi/";
      var enemyname = "";
      var tweetText = "";
      var winflg = false;
      switch (GameMain.GameLevel) {
        case 1:
          tweetText = "YOU LOSE! 子犬は無残にも陸上部員の餌食となった・・・。 " + url + " #寺井キミってやつは #かちゃコム";
          break;

        case 2:
          tweetText = "YOU LOSE! 子犬は無残にも軽自動車の餌食となった・・・。 " + url + " #寺井キミってやつは #かちゃコム";

        break;

        case 3:
          tweetText = "YOU LOSE! 子犬は無残にも無人在来線の餌食となった・・・。 " + url + " #寺井キミってやつは #かちゃコム";

        break;

        case 4:
          tweetText = "YOU LOSE! 子犬は無残にも怪獣王の餌食となった・・・。 " + url + " #寺井キミってやつは #かちゃコム";

        break;

        case 5:
          tweetText = "YOU LOSE! 子犬は無残にも月の餌食となった・・・" + url + " #寺井キミってやつは #かちゃコム";

          break;

        case 6:
          tweetText = "YOU LOSE! 子犬は無残にも寺井シャドウの餌食となった・・・" + url + " #寺井キミってやつは #かちゃコム";

          break;

        case 7:
          tweetText = "YOU WIN！！子犬を守り切った！！" + url + " #寺井キミってやつは #かちゃコム";
          winflg = true;
          break;

        default:

      }

      if(winflg){
        var youwin = Sprite('YOUWIN').addChildTo(this);
        youwin.scaleX = 5;
        youwin.scaleY = 5;
        youwin.alpha = 0;
        youwin.tweener
        .clear()
        .to({scaleX:1.4,scaleY:1.4,alpha:1}, 1300,"easeOutQuart");
        youwin.x = SCREEN_WIDTH /2;
        youwin.y = 200;
      }
      else{
        var youlose = Sprite('YOULOSE').addChildTo(this);
        youlose.scaleX = 5;
        youlose.scaleY = 5;
        youlose.alpha = 0;
        youlose.tweener
        .clear()
        .to({scaleX:1.4,scaleY:1.4,alpha:1}, 1300,"easeOutQuart");
        youlose.x = SCREEN_WIDTH /2;
        youlose.y = 200;
      }

      var tweet = Sprite('Tweet',200,70).addChildTo(this);

      var score = 0;
      this.ResultTxt = "";

      var Tweettxt = encodeURIComponent(tweetText);
      tweet.x = 500;
      tweet.y = -100;
      tweet.tweener
      .clear()
      .wait(1000)
      .to({y:400}, 1300,"easeOutQuart");
      // タッチ判定を有効に
      tweet.setInteractive(true);
      // タッチ終了時に発火
      tweet.onclick = function() {
        // 自身を削除
        window.open("http://twitter.com/intent/tweet?text=" + Tweettxt);
      };

      var retry = Sprite('Retry',200,70).addChildTo(this);
      retry.x = 760;
      retry.y = -100;
      retry.tweener
      .clear()
      .wait(1100)
      .to({y:400}, 1300,"easeOutQuart");
      // タッチ判定を有効に
      retry.setInteractive(true);
      // タッチ終了時に発火
      retry.onclick = function() {
        // 自身を削除
        GameMain.Retry();

      };


      var cachacacha = Sprite('Logo').addChildTo(this);
      cachacacha.setSize(300,100);
      cachacacha.x = 630;
      cachacacha.y = 1200;
      cachacacha.tweener
      .clear()
      .wait(1700)
      .to({y:600}, 1300,"easeOutQuart");
      // タッチ判定を有効に
      cachacacha.setInteractive(true);
      // タッチ終了時に発火
      cachacacha.onclick = function() {
        // 自身を削除
        window.open("http://www.cachacacha.com/");
      };



    },

    update: function(app) {

    },

});
