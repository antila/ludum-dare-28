var map;
var tileset;
var layer;

var TILE_WALLS  = [201, 229, 230, 231];
var TILE_START = 2;
var TILE_GOAL  = [203];
var TILE_SIZE = 64;
var TILE_HOLE = 211;
var RED_BUTTON = 84;
var RED_DOOR = 90;
var GREEN_BUTTON = 104;
var GREEN_DOOR = 110;
var YELLOW_BUTTON = 124;
var YELLOW_DOOR = 130;

var group;
var mapLayer;

function createMap() {
    game.stage.backgroundColor = '#000000';

    var mapName = this.game.state.states.levelselector.level;

    if (mapName === null) {
        this.game.state.start('levelselector');
        return;
    }

    map = game.add.tilemap(mapName);

    tileset = game.add.tileset('tiles');
    decorations = game.add.tileset('decorations');

    // layer = game.add.tilemapLayer(0, 0, 1280, 720, tileset, map, 0);
    // layer = game.add.tilemapLayer(0, 0, 1280, 720, tileset, map, 2);

    group = game.add.group();

    for (var i = 0; i < map.layers.length; i++) {
         if (map.layers[i].name === 'entities') {
            mapLayer = map.layers[i];
        } else {
            // game.add.tilemapLayer(0, 0, 1280, 720, decorations, map, i);
            game.add.tilemapLayer(0, 0, 1280, 720, tileset, map, i);
        }
    }

    parseEntities();
}

function parseEntities() {
    group.destroy();
    group = game.add.group();

    if (typeof scientist !== 'undefined') {
        scientist.kill();
    }

    if (typeof mouse !== 'undefined') {
        mouse.kill();
    }

    resetDoors();

    for (var y = 0; y < mapLayer.data.length; y++) {
        for (var x = 0; x < mapLayer.data[y].length; x++) {

            var tile = mapLayer.data[y][x];

            if (tile !== 0) {

                switch (tile){
                    case 201:
                        addWall(tile, x, y);
                        break;
                    case 202:
                        addPlayer(tile, x, y);
                        break;
                    case 203:
                        addGoal(tile, x, y);
                        break;

                    default:
                        addOtherItem(tile, x, y);
                }
            }
        };
    };
}

function addOtherItem(tile, x, y) {
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
    tileLookup[225] = RED_BUTTON; //red_button;
    tileLookup[229] = RED_DOOR; //red_button;
    tileLookup[226] = GREEN_BUTTON; //red_button;
    tileLookup[230] = GREEN_DOOR; //red_button;
    tileLookup[227] = YELLOW_BUTTON; //red_button;
    tileLookup[231] = YELLOW_DOOR; //red_button;

    if (typeof tileLookup[tile] !== 'undefined') {

        var c = group.create((x * TILE_SIZE), y * TILE_SIZE, 'tiles-sprites', tileLookup[tile]);
        c.name = tileLookup[tile];
        // c.body.immovable = true;

        return;
    }

    if (typeof itemLookup[tile] === 'undefined') {
        console.warn(tile, 'is undefined');
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

    var item = group.add(game.add.sprite(x * TILE_SIZE + (TILE_SIZE/2), y * TILE_SIZE + (TILE_SIZE/2), 'tiles-sprites', itemLookup[sprite]));
    item.body.immovable = true;
}

function addWall(tile, x, y) {
    //var c = group.create((x * TILE_SIZE), y * TILE_SIZE, 'tile-logic', 300);
    //c.body.immovable = true;
}

function addPlayer(tile, x, y) {

    // scientist = group.add(game.add.sprite(x * TILE_SIZE + (TILE_SIZE/2), y * TILE_SIZE + (TILE_SIZE/2), 'scientist'));
    // scientist.anchor.setTo(0.5, 0.9);

    mouse = group.add(game.add.sprite(x * TILE_SIZE + (TILE_SIZE/2), y * TILE_SIZE + (TILE_SIZE/2), 'monkey'));
    mouse.anchor.setTo(0.5, 0.9);
    // mouse.events.onOutOfBounds.add(alienOut, this);

    //mouse.fixedToCamera = true;
    //mouse.cameraOffset.x = 300;
    //mouse.cameraOffset.y = 300;

    // game.camera.follow(mouse, Phaser.Camera.FOLLOW_TOPDOWN);
    // game.world.setBounds(0, 0, TILE_SIZE * mapLayer.data.length, TILE_SIZE * mapLayer.data[0].length);


    // jellyfish = game.add.sprite(x * TILE_SIZE + (TILE_SIZE/2), y * TILE_SIZE + (TILE_SIZE/2), 'mummy');

    //  In the texture atlas the jellyfish uses the frame names blueJellyfish0000 to blueJellyfish0032
    //  So we can use the handy generateFrameNames function to create this for us.
    //jellyfish.animations.add('swim', Phaser.Animation.generateFrameNames('walk__', 0, 30, '', 4), 30, true);
    //jellyfish.animations.play('swim');
    // jellyfish.animations.play('walk', 30, true);

    //walk__000.png
}

function addGoal(tile, x, y) {
    var c = group.create((x * TILE_SIZE), y * TILE_SIZE, 'tile-logic', tile-201);
    c.body.immovable = true;
}




