MouseGame.LevelSelector = function (game) {
    "use strict";

    //  Our main menu
    this.game = game;
};

MouseGame.LevelSelector.prototype = {
    level: null,
    levels: [
        'test-map',
        'test-scroll',
        'level1'
    ],

    create: function () {
        "use strict";

        var bg = this.game.add.sprite(0, 0, 'mainmenu-background');
        var ui = game.add.group();

        var backButton = ui.add(this.game.add.button(1050, 600, 'button-back', this.showMenu, this, 2, 1, 0));
        backButton.anchor.setTo(0.5, 0.5);

        // var levels = this.game.state.states.game.levels;

        // for (var i = 0; i < this.levels.length; i++) {
        //     var levelName = this.levels[i];

        //     var levelButton = ui.add(this.game.add.button(this.game.world.centerX, 70 + (i*55), 'button', this.startGame, this, 2, 1, 0));
        //     levelButton.anchor.setTo(0.5, 0.5);
        //     levelButton.level = levelName;

        //     var text = game.add.bitmapText(this.game.world.centerX - 80, 55 + (i*55), levelName, { font: '24px DejaVu', align: 'center' });
        // };

        var posY = 80;
        var posX = 80;

        for (var i = 1; i <= 8; i++) {

            if ((i-1) % 4 === 0) {
                posY += 100;
                //posX = 80;
            }
            posX = 250 + ((i-1) % 4) * 270;

            var levelButton = ui.add(this.game.add.button(posX, posY, 'button-level' + i, this.startGame, this, 2, 1, 0));
            levelButton.anchor.setTo(0.5, 0.5);
            levelButton.level = 'level' + i;

            if (localStorage["level-" + levelButton.level] === 'true') {
                var check = this.game.add.sprite(posX + 15, posY - 50, 'button-check');
                // check.scale.x = check.scale.y = 0.5;
            }
        }

        //history.pushState(null, null, '#levelselector');
    },

    startGame: function (button) {
        "use strict";

        this.level = button.level;
        this.game.state.states.levelselector.level = button.level;
        this.game.state.start('game');
    },

    showMenu: function () {
        "use strict";

        this.game.state.start('mainmenu');
    },
};

function clearSaves() {
    "use strict";

    for (var i = 1; i <= 15; i++) {
        localStorage["level-level" + 1] = null;
    }
}
