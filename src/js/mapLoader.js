MouseGame.MapLoader = function() {
    "use strict";
};

MouseGame.MapLoader.prototype = {
    map: null,
    tileset: null,
    layer: null,

    TILE_WALLS : [201, 229, 230, 231],
    TILE_START: 2,
    TILE_GOAL : [203],
    TILE_SIZE: 64,
    TILE_HOLE: 211,
    RED_BUTTON: 84,
    RED_DOOR: 90,
    GREEN_BUTTON: 104,
    GREEN_DOOR: 110,
    YELLOW_BUTTON: 124,
    YELLOW_DOOR: 130,

    group: null,
    mapLayer: null,

    addWall: function(tile, x, y) {
        "use strict";

        //var c = group.create((x * TILE_SIZE), y * TILE_SIZE, 'tile-logic', 300);
        //c.body.immovable = true;
    },

    addPlayer: function(tile, x, y) {
        "use strict";

        MouseGame.Game.prototype.mouse = this.group.add(game.add.sprite(x * this.TILE_SIZE + (this.TILE_SIZE/2), y * this.TILE_SIZE + (this.TILE_SIZE/2), 'monkey'));
        MouseGame.Game.prototype.mouse.anchor.setTo(0.5, 0.9);
        MouseGame.Game.prototype.mouse.scale = {x: 0.8, y: 0.8};
    },

    addGoal: function(tile, x, y) {
        "use strict";

        var c = this.group.create((x * this.TILE_SIZE), y * this.TILE_SIZE, 'tile-logic', tile-201);
        c.body.immovable = true;
    },

    addOtherItem: function(tile, x, y) {
        "use strict";

        var sprite;

        var itemLookup = [];
        // itemLookup[211] = 'hole';
        itemLookup[217] = 'bottle_blue';
        itemLookup[218] = 'bottle_green';
        itemLookup[219] = 'bottle_red';
        itemLookup[220] = 'bottle_yellow';
        itemLookup[221] = 'key';
        itemLookup[222] = 'pill';
        itemLookup[223] = 'pipette';
        itemLookup[224] = 'pipetteset';

        var tileLookup = [];
        tileLookup[225] = this.RED_BUTTON; //red_button;
        tileLookup[229] = this.RED_DOOR; //red_button;
        tileLookup[226] = this.GREEN_BUTTON; //red_button;
        tileLookup[230] = this.GREEN_DOOR; //red_button;
        tileLookup[227] = this.YELLOW_BUTTON; //red_button;
        tileLookup[231] = this.YELLOW_DOOR; //red_button;

        if (typeof tileLookup[tile] !== 'undefined') {

            var c = this.group.create((x * this.TILE_SIZE), y * this.TILE_SIZE, 'tiles-sprites', tileLookup[tile]);
            c.name = tileLookup[tile];
            // c.body.immovable = true;

            return;
        }

        if (typeof itemLookup[tile] === 'undefined') {
            // console.warn(tile, 'is undefined');
            return;
        }

        // game.load.image('bottle_blue',  'assets/entities/bottle_blue.png');
        // game.load.image('bottle_green', 'assets/entities/bottle_green.png');
        // game.load.image('bottle_orange','assets/entities/bottle_orange.png');
        // game.load.image('bottle_red',   'assets/entities/bottle_red.png');
        // game.load.image('bottle_yellow','assets/entities/bottle_yellow.png');
        // game.load.image('key',          'assets/entities/key.png');
        // game.load.image('pill',         'assets/entities/pill.png');
        // game.load.image('pipette',      'assets/entities/pipette.png');
        // game.load.image('pipetteset',   'assets/entities/pipetteset.png');

        var item = this.group.add(game.add.sprite(x * this.TILE_SIZE + (this.TILE_SIZE/2), y * this.TILE_SIZE + (this.TILE_SIZE/2), 'tiles-sprites', itemLookup[sprite]));
        item.body.immovable = true;
    },

    parseEntities: function() {
        "use strict";

        this.group.destroy();
        this.group = game.add.group();

        if (typeof scientist !== 'undefined') {
            MouseGame.Game.scientist.kill();
        }

        if (typeof mouse !== 'undefined') {
            MouseGame.Game.mouse.kill();
        }

        MouseGame.Commands.prototype.resetDoors();

        for (var y = 0; y < this.mapLayer.data.length; y++) {
            for (var x = 0; x < this.mapLayer.data[y].length; x++) {

                var tile = this.mapLayer.data[y][x];

                if (tile !== 0) {

                    switch (tile){
                        case 201:
                            this.addWall(tile, x, y);
                            break;
                        case 202:
                            this.addPlayer(tile, x, y);
                            break;
                        case 203:
                            this.addGoal(tile, x, y);
                            break;

                        default:
                            this.addOtherItem(tile, x, y);
                    }
                }
            }
        }
    },

    createMap: function() {
        "use strict";

        game.stage.backgroundColor = '#000000';

        var mapName = game.state.states.levelselector.level;

        if (mapName === null) {
            game.state.start('levelselector');
            return;
        }

        this.map = game.add.tilemap(mapName);

        this.tileset = game.add.tileset('tiles');
        var decorations = game.add.tileset('decorations');

        // layer = game.add.tilemapLayer(0, 0, 1280, 720, tileset, map, 0);
        // layer = game.add.tilemapLayer(0, 0, 1280, 720, tileset, map, 2);

        MouseGame.Commands.prototype.orders = [];

        this.group = game.add.group();

        for (var i = 0; i < this.map.layers.length; i++) {
            if (this.map.layers[i].name === 'entities') {
                this.mapLayer = this.map.layers[i];
            } else {
                // game.add.tilemapLayer(0, 0, 1280, 720, decorations, map, i);
                game.add.tilemapLayer(0, 0, 1280, 720, this.tileset, this.map, i);
            }
        }

        this.parseEntities();
    }
};
