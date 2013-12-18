MouseGame.MainMenu = function (game) {
    //  Our main menu
    this.game = game;
};

MouseGame.MainMenu.prototype = {
    preload: function() {
        // game.load.image('mainmenu-background','assets/backgrounds/background.jpg');

        // game.load.image('background','assets/backgrounds/placeholder.png');
        // game.load.image('logo','assets/buttons/menu_title.png');

        // game.load.spritesheet('item', 'assets/buttons/actions.png', 96, 96);

        // game.load.tilemap('level', 'assets/maps/test-map.json', null, Phaser.Tilemap.TILED_JSON);
        // game.load.tileset('tiles', 'assets/tiles/game-tiles.png', 64, 64);
        // game.load.spritesheet('tile-logic', 'assets/tiles/tile-logic.png', 64, 64);

        // game.load.audio('menu-music', ['assets/music/game.mp3', 'assets/music/game.ogg']);
        // game.load.audio('game-music', ['assets/music/nowyouwilldie.mp3', 'assets/music/nowyouwilldie.ogg']);

        // // Buttons
        // game.load.image('button-play','assets/buttons/play.png');
        // game.load.image('button-credits','assets/buttons/credits.png');
    },

    create: function () {
        var bg = this.game.add.sprite(0, 0, 'mainmenu-background');
        // bg.scale.setTo(2.5, 2.5);

        // var t = this.game.add.sprite(100, 600, 'touhou');
        // t.anchor.setTo(0, 1);

        var logo = this.game.add.sprite(this.game.world.centerX, 200, 'logo');
        logo.anchor.setTo(0.5, 0.5);

        button = this.game.add.button(this.game.world.centerX, 500, 'button-play', this.startGame, this, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);

        var credits = this.game.add.button(this.game.world.centerX, 620, 'button-credits', this.showCredits, this, 2, 1, 0);
        credits.anchor.setTo(0.5, 0.5);
        //history.pushState(null, null, '#mainmenu');

        playMusic(true);
    },

    startGame: function() {
        this.game.state.start('levelselector');
    },

    showCredits: function() {
        this.game.state.start('credits');
    },
}

var menuMusic;
var gameMusic;

function playMusic(isMenuMusic) {
    if (typeof menuMusic === 'undefined') {
        menuMusic = game.add.audio('menu-music', 1, true);
    }

    if (typeof gameMusic === 'undefined') {
        gameMusic = game.add.audio('game-music', 1, true);
    }

    if (isMenuMusic === true) {
        if (menuMusic.isPlaying === true) {
            return;
        }

        // game.add.tween(gameMusic)
        //     .to({ volume: 0 }, 2500, Phaser.Easing.In, true, 0, false)
        //     .onCompleteCallback(function() {
                gameMusic.pause();
                menuMusic.play('',0,1,true);

            //     game.add.tween(menuMusic).to({ volume: 1 }, 2500, Phaser.Easing.In, true, 0, false).start();
            // }).start();
    } else {
        if (gameMusic.isPlaying === true) {
            return;
        }

        // game.add.tween(menuMusic)
        //     .to({ volume: 0 }, 2500, Phaser.Easing.In, true, 0, false)
        //     .onCompleteCallback(function() {
                menuMusic.pause();
                gameMusic.play('',0,1,true);

            //     game.add.tween(gameMusic).to({ volume: 1 }, 2500, Phaser.Easing.In, true, 0, false).start();
            // }).start();
    }
}
