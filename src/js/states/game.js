MouseGame.Game = function () {
    "use strict";
};


MouseGame.Game.prototype = {
    img: null,
    width: document.body.clientWidth,
    height: document.body.clientHeight,

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

        // var x, y, cx, cy, dx, dy, angle, scale;

        // x = game.input.position.x;
        // y = game.input.position.y;
        // cx = game.world.centerX;
        // cy = game.world.centerY;
        if (game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
            this.quitToMenu();
        }

        // ui.x = game.camera.x;
        // ui.y = game.camera.y;
    },

    quitToMenu: function () {
        "use strict";

        this.game.state.start('levelselector');
    }

};

