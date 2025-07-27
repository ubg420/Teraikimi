phina.define('TitleScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit({
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
    });
    this.backgroundColor = '#444';

    var back = Sprite('TitleBack').addChildTo(this);
    back.setSize(SCREEN_WIDTH,SCREEN_HEIGHT);
    back.setPosition(this.gridX.center(),this.gridY.center());

    // ラベルを表示
    this.startlogo = Sprite('StartLogo').addChildTo(this);
    this.startlogo.setPosition(this.gridX.center(0),this.gridY.center(7.2));
    this.startlogo.tweener
      .clear()
      .to({alpha:1,scaleX:1.5,scaleY:1.5}, 700,"easeOutSine")
      .wait(800)
      .to({alpha:0,scaleX:1.8,scaleY:0.8}, 700,"easeInSine")
      .setLoop(true);





    this.StartFLG = false;

    this.flg = false;






  },

  update: function(app){

  },

  onpointend: function(){

    if(!this.StartFLG){
      this.Start();
      this.StartFLG = true;

      //Debug
      //this.exit();
      //
    }
  },

  Start: function(){
    this.exit();
  },

});
