var game = new Phaser.Game(1280, 720, Phaser.AUTO);

setTimeout(function() {
    game.state.add('preloader', MouseGame.Preloader, true);
    game.state.add('mainmenu', MouseGame.MainMenu);
    game.state.add('game', MouseGame.Game);
    game.state.add('credits', MouseGame.Credits);
    game.state.add('levelselector', MouseGame.LevelSelector);
    game.state.add('intro', MouseGame.Intro);
}, 1);
