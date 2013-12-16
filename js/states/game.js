MouseGame.Game = function (game) {

    this.game = game;

    var game;
    var img;
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;

    var background;

    var scientist;
    var mouse;

    var ui;
};


MouseGame.Game.prototype = {
    levels: [
        'test-map',
        'test-scroll',
        'level1'
    ],

    preload: function () {
        var activeLevel = this.game.state.states.levelselector.level;
        game.load.tilemap(activeLevel, 'assets/maps/' + activeLevel + '.json', null, Phaser.Tilemap.TILED_JSON);

        // this.game.load.spritesheet('balls', '../assets/sprites/balls.png', 17, 17);
        game.load.image('mainmenu-background','assets/backgrounds/background.jpg');

        game.load.image('background','assets/backgrounds/placeholder.png');

        game.load.spritesheet('item', 'assets/buttons/actions.png', 96, 96);
        game.load.spritesheet('orders', 'assets/buttons/sequence.png', 96, 96);

        game.load.tileset('tiles', 'assets/tiles/new-tiles.png', 64, 64);
        game.load.spritesheet('tiles-sprites', 'assets/tiles/new-tiles.png', 64, 64);
        game.load.spritesheet('tile-logic', 'assets/tiles/tile-logic.png', 64, 64);

        game.load.audio('game-music', ['assets/music/nowyouwilldie.mp3', 'assets/music/nowyouwilldie.ogg']);

        for (var i = 0; i < this.levels.length; i++) {
            var level = this.levels[i];
            game.load.tilemap(level, 'assets/maps/' + level + '.json', null, Phaser.Tilemap.TILED_JSON);
        };

        // Entities
        game.load.image('scientist',    'assets/entities/scientist.png');
        game.load.image('monkey',       'assets/entities/monkey.png');
        game.load.image('bottle_blue',  'assets/entities/bottle_blue.png');
        game.load.image('bottle_green', 'assets/entities/bottle_green.png');
        game.load.image('bottle_orange','assets/entities/bottle_orange.png');
        game.load.image('bottle_red',   'assets/entities/bottle_red.png');
        game.load.image('bottle_yellow','assets/entities/bottle_yellow.png');
        game.load.image('key',          'assets/entities/key.png');
        game.load.image('pill',         'assets/entities/pill.png');
        game.load.image('pipette',      'assets/entities/pipette.png');
        game.load.image('pipetteset',   'assets/entities/pipetteset.png');

        // game.load.atlasXML('testAnimation', 'assets/animations/test.png', 'assets/animations/test.xml');
        // game.load.spritesheet('mummy', 'assets/animations/test.png', 226, 340, 4);
    },

    create: function () {
        createMap();

        ui = game.add.group();

        background = ui.add(game.add.sprite(0, 0, 'background'));
        createButtons();

        var level = this.game.state.states.levelselector.level;
        history.replaceState(level, 'hey', level+'#game');

        playMusic(false);

        isPlaying = false;
    },

    update: function() {
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
        this.game.state.start('levelselector');
    }

}

