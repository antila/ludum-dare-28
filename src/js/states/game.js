MouseGame.Game = function () {
    "use strict";
};


MouseGame.Game.prototype = {
    img: null,
    width: document.body.clientWidth,
    height: document.body.clientHeight,
    keyReset: false,

    background: null,

    scientist: null,
    mouse: null,
    ui: null,
    pauseMenu: null,
    buttonCounter: 0,
    gamePaused: false,

    levels: [
        'test-map',
        'test-scroll',
        'level1',
        'level-doors-medium',
        'level-doors-hard'
    ],

    preload: function () {
        "use strict";

        var activeLevel = this.game.state.states.levelselector.level;

        game.load.tileset('tiles', 'assets/tiles/new-tiles.png', 64, 64);
        game.load.spritesheet('tiles-sprites', 'assets/tiles/new-tiles.png', 64, 64);
    },

    create: function () {
        "use strict";

        MouseGame.MapLoader.prototype.createMap();

        MouseGame.Game.ui = game.add.group();

        var background = MouseGame.Game.ui.add(game.add.sprite(0, 0, 'background'));
        MouseGame.Commands.prototype.createButtons();

        var level = this.game.state.states.levelselector.level;
        // history.replaceState(level, 'hey', level+'#game');

        playMusic(false);

        MouseGame.Commands.isPlaying = false;
    },

    update: function() {
        "use strict";

        if (game.input.keyboard.isDown(Phaser.Keyboard.ESC) && this.buttonCounter > 20) {
            if (this.gamePaused === false) {
                this.buttonCounter = 0;
                this.pauseGame();
            } else {
                this.buttonCounter = 0;
                this.unpauseGame();
            }
        }

        this.buttonCounter++;
    },

    quitToMenu: function () {
        "use strict";

        this.game.state.start('levelselector');
    },
    // pause the game
    pauseGame : function () {
        'use strict';

        MouseGame.Game.prototype.gamePaused = true;
        this.pauseMenu = game.add.text(game.width / 2, game.height / 2, 'the game is paused', { font: '30px Arial'});
        this.pauseMenu.anchor.setTo(0.5, 0.5);
        playMusic(false, true);
    },

    unpauseGame: function () {
        MouseGame.Game.prototype.gamePaused = false;
        this.pauseMenu.destroy();
        console.log(this.pauseMenu);
        playMusic(false, false);
    }
};

