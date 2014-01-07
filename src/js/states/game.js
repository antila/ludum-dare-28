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

        if (game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
            this.quitToMenu();
        }

        // if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && this.keyReset === false) {
        //     this.keyReset = true;
        //     var button0 = MouseGame.Commands.prototype.buttons[0];
        //     MouseGame.Commands.prototype.onTileClick(button0);
        // }

        // if (game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT) && this.keyReset === false) {
        //     this.keyReset = true;
        //     var button1 = MouseGame.Commands.prototype.buttons[1];
        //     MouseGame.Commands.prototype.onTileClick(button1);
        // }

        // if (game.input.keyboard.justPressed(Phaser.Keyboard.LEFT) && this.keyReset === false) {
        //     this.keyReset = true;
        //     var button2 = MouseGame.Commands.prototype.buttons[2];
        //     MouseGame.Commands.prototype.onTileClick(button2);
        // }

        // if (game.input.keyboard.justPressed(Phaser.Keyboard.DOWN) && this.keyReset === false) {
        //     this.keyReset = true;
        //     var button3 = MouseGame.Commands.prototype.buttons[3];
        //     MouseGame.Commands.prototype.onTileClick(button3);
        // }

        // if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER) && this.keyReset === false) {
        //     this.keyReset = true;
        //     MouseGame.Commands.prototype.playLevel();
        // }

        // if (game.input.keyboard.justPressed(Phaser.Keyboard.DELETE) && this.keyReset === false) {
        //     this.keyReset = true;
        //     var lastIndex = MouseGame.Commands.prototype.orders.length;
        //     var button = MouseGame.Commands.prototype.orders[lastIndex-1];
        //     if (typeof button !== 'undefined') {
        //         MouseGame.Commands.prototype.onOrderClick(button);
        //     }
        // }

        // if (game.input.keyboard.justReleased(Phaser.Keyboard.LEFT) ||
        //     game.input.keyboard.justReleased(Phaser.Keyboard.RIGHT) ||
        //     game.input.keyboard.justReleased(Phaser.Keyboard.UP) ||
        //     game.input.keyboard.justReleased(Phaser.Keyboard.DOWN) ||
        //     game.input.keyboard.justReleased(Phaser.Keyboard.ENTER) ||
        //     game.input.keyboard.justReleased(Phaser.Keyboard.DELETE)) {
        //     this.keyReset = false;
        // }
    },

    quitToMenu: function () {
        "use strict";

        this.game.state.start('levelselector');
    }

};

