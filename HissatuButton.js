phina.define("HissatuButton", {
    superClass: "DisplayElement",
    init: function(X,Y) {
      this.superInit({
        width: 180,
        height: 180,
        fill: "green",
        stroke: null,

      });

        this.tag = "Button";
        this.x =X;
        this.y =Y;

        this.sprite = Sprite('HissatuButton').addChildTo(this);
        this.sprite.setSize(180,180)
        this.sprite.scaleX = 2;
        this.sprite.scaleY = 2;
        this.sprite.alpha = 0;


        this.setInteractive(true);

        this.sprite.tweener
        .clear()
        .to({alpha:1,scaleX:1,scaleY:1}, 120)


    },

    update: function(app) {


    },


    onpointstart: function(){
        GameMain.PushHissatuButton();
        var te = TouchEffect(this.x,this.y,5).addChildTo(EffectGroup);
        this.remove();


    },


});
