phina.globalize();

var SCREEN_WIDTH    = 1280;
var SCREEN_HEIGHT   = 720;
var Group;
var ObjectGroup;
var BackGroup;
var EffectGroup;

var GameMain;

var TUTORIAL_FLG = true;

var ASSETS = {
  image: {
    'Back':'img/Back.png',
    'Player': 'img/Player.png',
    'TitleBack':'img/TitleBack.png',
    'StartLogo':'img/StartLogo.png',


    'Dog':'img/Dog.png',
    'Rikuzyo':'img/rikuzyo.png',
    'Car':'img/Car.png',
    'Zairaisen':'img/zairaisen_001.png',
    'Zairaisen2':'img/zairaisen_000.png',

    'RendaEffect':'img/RendaEffect.png',

    'Yubi':'img/yubi.png',
    'Flash':'img/flash.png',
    'Kaizyu':'img/kaizyu.png',
    'Inseki':'img/inseki.png',

    'Player2':'img/Player2.png',
    'RendaEffect2':'img/RendaEffect2.png',
    'HitEffect2':'img/HitEffect_2.png',
    'HissatuEffect2':'img/HitEffect_2_002.png',

    'HunbariEffect':'img/HitEffect_004.png',


    'HitEffect':'img/HitEffect_001.png',
    'HissatuButton':'img/PunchButton2.png',
    'HissatuEffect':'img/HitEffect_002.png',

    'YOUWIN':'img/YOUWIN.png',
    'YOULOSE':'img/YOULOSE.png',

    'KO':'img/KO.png',

    'Logo':'img/logo.png',
    'Retry':'img/Retry.png',
    'Tweet':'img/Tweet.png',

  },
  spritesheet: {
    'PlayerSS': 'spriteSS/PlayerSS.ss',
    'Player2SS': 'spriteSS/Player2SS.ss',

    'DogSS': 'spriteSS/DogSS.ss',
    'RikuzyoSS': 'spriteSS/RikuzyoSS.ss',
    'CarSS': 'spriteSS/CarSS.ss',

    'RendaEffectSS': 'spriteSS/RendaEffectSS.ss',




  },
  sound: {

  },
};

phina.main(function() {
  var app = GameApp({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
  });
  app.replaceScene(SceneSequence());
  app.run();
});

// SceneSequenceクラス
phina.define("SceneSequence", {
  superClass: "phina.game.ManagerScene",

  // 初期化
  init: function() {
    this.superInit({
      scenes: [

        {
          label: "Loading", // ラベル。参照用
          className: "LoadingScene", // シーンAのクラス名
          nextLabel:"Title",
        },

        {
          label: "Title", // ラベル。参照用
          className: "TitleScene", // シーンAのクラス名
          nextLabel:"Main",
        },

        {
          label: "Main",
          className: "MainScene",
        },

        {
          label: "Result",
          className: "ResultScene",
        }

      ]
    });
  }
});

phina.define("LoadingScene", {
  superClass: "phina.game.LoadingScene",

  init: function(params) {
    this.superInit({
      assets: ASSETS,
      exitType: "auto",

    });

  }

});

phina.define('ResultScene', {
  superClass: 'DisplayScene',

  init: function() {
    this.superInit();
  },
});
