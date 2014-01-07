var game = new Phaser.Game(1280, 720, Phaser.AUTO);

setTimeout(function() {
    "use strict";

    game.state.add('boot', MouseGame.Boot, true);
    game.state.add('preloader', MouseGame.Preloader);
    game.state.add('mainmenu', MouseGame.MainMenu);
    game.state.add('game', MouseGame.Game);
    game.state.add('credits', MouseGame.Credits);
    game.state.add('levelselector', MouseGame.LevelSelector);
    game.state.add('intro', MouseGame.Intro);
    game.state.add('ending', MouseGame.Ending);
}, 1);
