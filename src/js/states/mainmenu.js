var menuMusic;
var gameMusic;

function playMusic(isMenuMusic) {
    "use strict";

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

MouseGame.MainMenu = function (game) {
    "use strict";

    //  Our main menu
    this.game = game;
};

MouseGame.MainMenu.prototype = {
    create: function () {
        "use strict";

        var bg = this.game.add.sprite(0, 0, 'mainmenu-background');

        var logo = this.game.add.sprite(this.game.world.centerX, 200, 'logo');
        logo.anchor.setTo(0.5, 0.5);

        var button = this.game.add.button(this.game.world.centerX, 500, 'button-play', this.startGame, this, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);

        var credits = this.game.add.button(this.game.world.centerX, 620, 'button-credits', this.showCredits, this, 2, 1, 0);
        credits.anchor.setTo(0.5, 0.5);
        //history.pushState(null, null, '#mainmenu');

        playMusic(true);
    },

    startGame: function() {
        "use strict";

        this.game.state.start('levelselector');
    },

    showCredits: function() {
        "use strict";

        this.game.state.start('credits');
    },
};

