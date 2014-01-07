MouseGame.Commands = function () {
    "use strict";
};

MouseGame.Commands.prototype = {
    orders: [],
    mouseTween: null,
    isPlaying: false,
    goButton: null,

    createButtons: function() {
        "use strict";

        for (var i = 0; i < 4; i++)
        {
            this.createButton(this.onTileClick, i);
        }

        this.goButton = MouseGame.Game.ui.add(game.add.button(1050, 600, 'item', this.playLevel, this, 20, 21, 22));

        var resetButton = game.add.button(1160, 600, 'item', this.resetLevel, this, 25, 26, 27);
    },

    createButton: function(callback, position) {
        "use strict";

        var item;
        var offsetX = 1050;
        var offsetY = 50;
        var padding = 20;

        var posX = (90 + offsetX);
        var posY = (90 * position) + offsetY + (padding * position);
        var icon = position * 5;
        var iconOver = icon + 1;
        var iconDown = icon + 2;

        item = MouseGame.Game.ui.add((game.add.button(posX, posY, 'item', callback, this, icon, iconOver, iconDown)));
        item.spriteNumber = position;
    },

    onTileClick: function(item) {
        "use strict";

        if (this.isPlaying === true) {
            return;
        }

        // if (MouseGame.Commands.prototype.orders.length >= 32) {
            //return;
        // }

        var icon = (item.spriteNumber * 5) + 2;
        var iconOver = icon + 1;
        var iconDown = icon + 1;

        var order = game.add.button(0, 0, 'item', this.onOrderClick, this, icon, iconOver, iconDown);

        order.inputEnabled = true;
        order.spriteNumber = item.spriteNumber;
        order.inactive = false;
        // order.events.onInputDown.add(onOrderClick, this);

        MouseGame.Commands.prototype.orders.push(order);
        this.renderOrders();
    },

    onOrderClick: function(item) {
        "use strict";

        if (this.isPlaying === true) {
            return;
        }

        MouseGame.Commands.prototype.orders.splice(item.index, 1);
        //item.inactive = true;
        item.kill();
        this.renderOrders();
    },

    renderOrders: function() {
        "use strict";

        for (var i = 0; i < MouseGame.Commands.prototype.orders.length; i++) {
            var order = MouseGame.Commands.prototype.orders[i];

            var iconActive = (order.spriteNumber * 5) + 3;
            var iconInactive = iconActive + 1;

            if (order.inactive === false) {
                order.setFrames(iconInactive, iconActive, iconInactive);
            } else {
                order.setFrames(iconActive, iconInactive, iconInactive);
            }

            order.y = 580;
            order.x = 25 + (i * 40);
            if (i > 22) {
                order.y += 50;
                order.x -= (23 * 40);
            }
            if (i > 44) {
                order.y += 50;
                order.x -= (45 * 40);
            }

            order.index = i;
        }
    },

    stopButton: function() {
        "use strict";

        this.resetDoors(90, 229, 900);
        this.resetDoors(110, 230, 1100);
        this.resetDoors(130, 231, 1300);

        this.isPlaying = false;

        for (var i = 0; i < MouseGame.Commands.prototype.orders.length; i++) {
            MouseGame.Commands.prototype.orders[i].inactive = true;
        }

        if (typeof MouseGame.Commands.prototype.mouseTween !== 'undefined') {
            MouseGame.Commands.prototype.mouseTween.stop();
        }

        this.executeOrder();

        MouseGame.MapLoader.prototype.parseEntities();

        for (var b = 0; b < MouseGame.Commands.prototype.orders.length; b++) {
            MouseGame.Commands.prototype.orders[b].inactive = false;
        }

        this.renderOrders();
    },

    cancelAllOrders: function() {
        "use strict";

        for (var i = 0; i < MouseGame.Commands.prototype.orders.length; i++) {
            MouseGame.Commands.prototype.orders[i].inactive = true;
        }
    },

    playLevel: function() {
        "use strict";

        if (MouseGame.Commands.prototype.orders.length === 0) {
            return;
        }

        if (this.isPlaying === true) {
            this.goButton.setFrames(20, 21, 22);
            this.stopButton();
            return;
        }

        this.isPlaying = true;
        this.goButton.setFrames(22, 22, 22);

        this.executeOrder();
    },

    resetLevel: function() {
        "use strict";

        if (this.isPlaying === true) {
            this.stopButton();
        }

        var numOrders = MouseGame.Commands.prototype.orders.length;
        for (var i = numOrders - 1; i >= 0; i--) {
            this.onOrderClick(MouseGame.Commands.prototype.orders[i]);
        }

        this.goButton.setFrames(20, 21, 22);
    },

    executeOrder: function() {
        "use strict";

        if (this.isPlaying === false) {
            return;
        }

        MouseGame.MapLoader.prototype.group.sort();

        var order;

        for (var i = 0; i < MouseGame.Commands.prototype.orders.length; i++) {
            if (MouseGame.Commands.prototype.orders[i].inactive === false && typeof order === 'undefined') {
                MouseGame.Commands.prototype.orders[i].inactive = true;
                order = MouseGame.Commands.prototype.orders[i];
            }
        }

        if (typeof order === 'undefined') {
            return;
        }

        switch (order.spriteNumber){
            case 0:
                MouseGame.Commands.prototype.moveMouse('UP');
                break;
            case 1:
                MouseGame.Commands.prototype.moveMouse('RIGHT');
                break;
            case 2:
                MouseGame.Commands.prototype.moveMouse('LEFT');
                break;
            case 3:
                MouseGame.Commands.prototype.moveMouse('DOWN');
                break;
        }

        MouseGame.Commands.prototype.renderOrders();
    },

    moveMouse: function(direction) {
        "use strict";

        if (this.isPlaying === false) {
            return;
        }

        var position = {
            x: MouseGame.Game.prototype.mouse.x,
            y: MouseGame.Game.prototype.mouse.y
        };

        var runNext = true;

        if (direction === 'LEFT') {
            position.x -= MouseGame.MapLoader.prototype.TILE_SIZE;
        }

        if (direction === 'RIGHT') {
            position.x += MouseGame.MapLoader.prototype.TILE_SIZE;
        }

        if (direction === 'UP') {
            position.y -= MouseGame.MapLoader.prototype.TILE_SIZE;
        }

        if (direction === 'DOWN') {
            position.y += MouseGame.MapLoader.prototype.TILE_SIZE;
        }

        var targetTile;
        var tileX = Math.floor(position.x/MouseGame.MapLoader.prototype.TILE_SIZE);
        var tileY = Math.floor(position.y/MouseGame.MapLoader.prototype.TILE_SIZE);
        for (var i = 0; i < MouseGame.MapLoader.prototype.map.layers.length; i++) {
            if (MouseGame.MapLoader.prototype.map.layers[i].name === 'entities') {
                targetTile = MouseGame.MapLoader.prototype.map.getTile(tileX, tileY, i);//mapLayer.data[tileY][tileX];
            }

            if (MouseGame.MapLoader.prototype.map.getTile(tileX, tileY, i) === 6) {
                targetTile = MouseGame.MapLoader.prototype.TILE_HOLE;
            }
        }

        if (targetTile === MouseGame.MapLoader.prototype.TILE_HOLE) {
            game.add.tween(MouseGame.Game.prototype.mouse).to({ angle: -125 }, 1500, Phaser.Easing.Out, true, 0, false);
            game.add.tween(MouseGame.Game.prototype.mouse.scale).to({ x: 0, y: 0, angle: 125 }, 1500, Phaser.Easing.In, true, 0, false);
            // cancelAllOrders();
            runNext = false;
        }

        if (targetTile === 225) {
            MouseGame.Commands.prototype.toggleDoor(90, 229, 900);
        }
        if (targetTile === 226) {
            MouseGame.Commands.prototype.toggleDoor(110, 230, 1100);
        }
        if (targetTile === 227) {
            MouseGame.Commands.prototype.toggleDoor(130, 231, 1300);
        }

        // Collision with wall
        if (MouseGame.MapLoader.prototype.TILE_WALLS.indexOf(targetTile) !== -1) {
            game.add.tween(MouseGame.Game.prototype.mouse.scale).to(
                { x: 1.1, y: 1.1 }, 150,
                Phaser.Easing.Back.In,
                true, 0, false
            ).to(
                { x: 1, y: 1 }, 150,
                Phaser.Easing.Back.Out,
                true, 0, false
            );

            // game.add.tween(MouseGame.Game.prototype.mouse)
            //     .onCompleteCallback(function() {
            //         console.log('tween');
                    this.executeOrder();
            // }).start();

            return;
        }

        MouseGame.Commands.prototype.mouseTween = game.add.tween(MouseGame.Game.prototype.mouse).to(
            { x: position.x,
              y: position.y
            },
            150,
            Phaser.Easing.Back.InOut,
            true,
            0,
            false
        ).onCompleteCallback(function() {
            if (this.isPlaying === false) {
                return;
            }

            if (MouseGame.MapLoader.prototype.TILE_GOAL.indexOf(targetTile) !== -1) {
                MouseGame.Commands.prototype.victoryAnimation();

                return;
            } else {
                // Remain calm and keep playing

                // Stop tile
                if (targetTile === 212) {
                    // runNext = false
                    MouseGame.Commands.prototype.executeOrder();
                    return;
                }

                if (runNext) {
                    MouseGame.Commands.prototype.moveMouse(direction);
                }
            }
        });

        //
    },

    victoryAnimation: function() {
        "use strict";

        // End level
        MouseGame.Commands.prototype.mouseTween = game.add.tween(MouseGame.Game.prototype.mouse.scale)
            .to({ x: 1.1, y: 1.1 }, 150, Phaser.Easing.Back.In, true, 0, false)
            .to({ x: 1, y: 1 }, 150, Phaser.Easing.Back.Out, true, 0, false)
            .repeat(4)
        ;

        // Save progress
        var mapName = game.state.states.levelselector.level;
        localStorage["level-" + mapName] = true;

        // Hack to change scene after 4sec
        game.add.tween(MouseGame.Game.prototype.mouse)
            .delay(500)
            .onCompleteCallback(function() {
                // goToLevelSecletor();
                MouseGame.Commands.prototype.resetLevel();

                if (mapName === 'level8') {
                    game.state.start('ending', true, false);
                } else {
                    MouseGame.Commands.prototype.goToLevelSecletor();
                }
            }).start();

    },

    goToLevelSecletor: function() {
        "use strict";

        game.state.start('levelselector', true, false);
    },

    resetDoors: function(door, floor, open) {
        "use strict";

        MouseGame.MapLoader.prototype.group.forEach(function(item) {
            if (item.name === open) {
                var tileX = Math.floor(item.x / MouseGame.MapLoader.prototype.TILE_SIZE);
                var tileY = Math.floor(item.y / MouseGame.MapLoader.prototype.TILE_SIZE);

                for (var i = 0; i < MouseGame.MapLoader.prototype.map.layers.length; i++) {
                    if (MouseGame.MapLoader.prototype.map.layers[i].name === 'entities') {
                        MouseGame.MapLoader.prototype.map.putTile(floor, tileX, tileY, i);
                        item.revive();
                        // item.texture.setFrame(90);
                        item.name = door;
                    }
                }
            }

        }, this);
    },

    toggleDoor: function(door, floor, open) {
        "use strict";

        MouseGame.MapLoader.prototype.group.forEach(function(item) {
            var tileX = Math.floor(item.x/MouseGame.MapLoader.prototype.TILE_SIZE);
            var tileY = Math.floor(item.y/MouseGame.MapLoader.prototype.TILE_SIZE);

            if (item.name === door) {
                for (var i = 0; i < MouseGame.MapLoader.prototype.map.layers.length; i++) {
                    if (MouseGame.MapLoader.prototype.map.layers[i].name === 'entities') {
                        MouseGame.MapLoader.prototype.map.putTile(open, tileX, tileY, i);
                    }
                }

                item.name = open;
                item.kill();
            } else if (item.name === open) {
                for (var d = 0; d < MouseGame.MapLoader.prototype.map.layers.length; d++) {
                    if (MouseGame.MapLoader.prototype.map.layers[d].name === 'entities') {
                        MouseGame.MapLoader.prototype.map.putTile(floor, tileX, tileY, d);
                    }
                }

                item.name = door;
                item.revive();
            }
        }, this);

    }
};





