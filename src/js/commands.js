var orders = [];
var mouseTween;
var isPlaying = false;
var goButton;

function createButtons() {
    for (var i = 0; i < 4; i++)
    {
        createButton(onTileClick, i);
    }

    goButton = ui.add(game.add.button(1050, 600, 'item', playLevel, this, 20, 21, 22));

    var resetButton = game.add.button(1160, 600, 'item', resetLevel, this, 25, 26, 27);
}

function createButton(callback, position) {
    var item;
    var offsetX = 1050;
    var offsetY = 50;
    var padding = 20;

    var posX = (90 + offsetX);
    var posY = (90 * position) + offsetY + (padding * position);
    var icon = position * 5;
    var iconOver = icon + 1;
    var iconDown = icon + 2;

    item = ui.add((game.add.button(posX, posY, 'item', callback, this, icon, iconOver, iconDown)));
    item.spriteNumber = position;
}

function onTileClick(item) {
    if (isPlaying === true) {
        return;
    }

    if (orders.length >= 32) {
        //return;
    }

    var icon = (item.spriteNumber * 5) + 2;
    var iconOver = icon + 1;
    var iconDown = icon + 1;

    var order = game.add.button(0, 0, 'item', onOrderClick, this, icon, iconOver, iconDown);

    order.inputEnabled = true;
    order.spriteNumber = item.spriteNumber;
    order.inactive = false;
    // order.events.onInputDown.add(onOrderClick, this);
    orders.push(order);
    renderOrders();
}

function onOrderClick(item) {
    if (isPlaying === true) {
        return;
    }

    orders.splice(item.index, 1);
    //item.inactive = true;
    item.kill();
    renderOrders();
}

function renderOrders() {
    for (var i = 0; i < orders.length; i++) {
        var order = orders[i];

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
    };
}

function stopButton() {
    resetDoors(90, 229, 900);
    resetDoors(110, 230, 1100);
    resetDoors(130, 231, 1300);

    isPlaying = false;
    // mouseTween.stop();

    for (var i = 0; i < orders.length; i++) {
        orders[i].inactive = true;
    };

    if (typeof mouseTween !== 'undefined') {
        mouseTween.stop();
    }

    executeOrder();

    parseEntities();

    for (var i = 0; i < orders.length; i++) {
        orders[i].inactive = false;
    }
    renderOrders();

}

function cancelAllOrders() {
   for (var i = 0; i < orders.length; i++) {
        orders[i].inactive = true;
    };
}

function playLevel() {
    if (isPlaying === true) {
        goButton.setFrames(20, 21, 22);
        stopButton();
        return;
    }

    isPlaying = true;
    goButton.setFrames(22, 22, 22);
    executeOrder();
}

function resetLevel() {
    if (isPlaying === true) {
        stopButton();
    }

    var numOrders = orders.length;
    for (var i = numOrders - 1; i >= 0; i--) {
        onOrderClick(orders[i]);
    };

    goButton.setFrames(20, 21, 22);
}

function executeOrder() {
    if (isPlaying === false) {
        return;
    }

    group.sort();

    var order;

    for (var i = 0; i < orders.length; i++) {
        if (orders[i].inactive === false && typeof order === 'undefined') {
            orders[i].inactive = true;
            order = orders[i];
        }
    }

    if (typeof order === 'undefined') {
        return;
    }

    switch (order.spriteNumber){
        case 0:
            moveMouse('UP');
            break;
        case 1:
            moveMouse('RIGHT');
            break;
        case 2:
            moveMouse('LEFT');
            break;
        case 3:
            moveMouse('DOWN');
            break;
    }

    renderOrders();
}

function moveMouse(direction) {
    var position = {
        x: mouse.x,
        y: mouse.y
    };

    var runNext = true;

    // Down
    if (direction === 'LEFT') {
        position.x -= TILE_SIZE
    }

    // Up
    if (direction === 'RIGHT') {
        position.x += TILE_SIZE
    }

    // Left
    if (direction === 'UP') {
        position.y -= TILE_SIZE
    }

    // Right
    if (direction === 'DOWN') {
        position.y += TILE_SIZE
    }
    var targetTile;
    var tileX = Math.floor(position.x/TILE_SIZE);
    var tileY = Math.floor(position.y/TILE_SIZE);
    for (var i = 0; i < map.layers.length; i++) {
        if (map.layers[i].name === 'entities') {
            targetTile = map.getTile(tileX, tileY, i);//mapLayer.data[tileY][tileX];
        }

        if (map.getTile(tileX, tileY, i) === 6) {
            targetTile = TILE_HOLE;
        }
    }




    if (targetTile === TILE_HOLE) {
        game.add.tween(mouse).to({ angle: -125 }, 1500, Phaser.Easing.Out, true, 0, false);
        game.add.tween(mouse.scale).to({ x: 0, y: 0, angle: 125 }, 1500, Phaser.Easing.In, true, 0, false);
        // cancelAllOrders();
        runNext = false;
    }

    if (targetTile === 225) {
        toggleDoor(90, 229, 900);
    }
    if (targetTile === 226) {
        toggleDoor(110, 230, 1100);
    }
    if (targetTile === 227) {
        toggleDoor(130, 231, 1300);
    }

    // Collision with wall
    if (TILE_WALLS.indexOf(targetTile) !== -1) {
        game.add.tween(mouse.scale).to(
            { x: 1.1, y: 1.1 }, 150,
            Phaser.Easing.Back.In,
            true, 0, false
        ).to(
            { x: 1, y: 1 }, 150,
            Phaser.Easing.Back.Out,
            true, 0, false
        );

        game.add.tween(mouse)
            .onCompleteCallback(executeOrder).start();

        return;
    }

    mouseTween = game.add.tween(mouse).to(
        { x: position.x,
          y: position.y
        },
        150,
        Phaser.Easing.Back.InOut,
        true,
        0,
        false
    ).onCompleteCallback(function() {
        if (TILE_GOAL.indexOf(targetTile) !== -1) {
            victoryAnimation();

            return;
        } else {
            // Remain calm and keep playing

            // Stop tile
            if (targetTile === 212) {
                // runNext = false
                executeOrder();
                return;
            }

            if (runNext) {
                moveMouse(direction);
            }
        }
    });

    //
}

function victoryAnimation() {
    // End level
    mouseTween = game.add.tween(mouse.scale)
        .to({ x: 1.1, y: 1.1 }, 150, Phaser.Easing.Back.In, true, 0, false)
        .to({ x: 1, y: 1 }, 150, Phaser.Easing.Back.Out, true, 0, false)
        .repeat(4)
    ;

    // Save progress
    var mapName = this.game.state.states.levelselector.level;
    localStorage["level-" + mapName] = true;

    // Hack to change scene after 4sec
    game.add.tween(mouse)
        .delay(500)
        .onCompleteCallback(function() {
            // goToLevelSecletor();

            if (mapName === 'level8') {
                this.game.state.start('ending', true, false);
            } else {
                goToLevelSecletor();
            }
        }).start();

}

function goToLevelSecletor() {
    this.game.state.start('levelselector', true, false);
}

function resetDoors(door, floor, open) {
    group.forEach(function(item) {
        if (item.name === open) {
            var tileX = Math.floor(item.x / TILE_SIZE);
            var tileY = Math.floor(item.y / TILE_SIZE);

            for (var i = 0; i < map.layers.length; i++) {
                if (map.layers[i].name === 'entities') {
                    map.putTile(floor, tileX, tileY, i);
                    item.revive();
                    // item.texture.setFrame(90);
                    item.name = door;
                }
            }
        }

    }, this);
}

// door=90, floor=229, open=900

function toggleDoor(door, floor, open) {
    group.forEach(function(item) {
        var tileX = Math.floor(item.x/TILE_SIZE);
        var tileY = Math.floor(item.y/TILE_SIZE);

        if (item.name === door) {
            for (var i = 0; i < map.layers.length; i++) {
                if (map.layers[i].name === 'entities') {
                    map.putTile(open, tileX, tileY, i);
                }
            }

            item.name = open;
            item.kill();
        } else if (item.name === open) {
            for (var i = 0; i < map.layers.length; i++) {
                if (map.layers[i].name === 'entities') {
                    map.putTile(floor, tileX, tileY, i);
                }
            }

            item.name = door;
            item.revive();
        }
    }, this);

}
