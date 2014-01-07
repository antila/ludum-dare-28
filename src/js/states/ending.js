MouseGame.Ending = function () {
    "use strict";

    //  Our main menu
    this.game = game;
};

var intro1;
var intro2;
var intro3;
var nextButton;
var introScreens = [];

MouseGame.Ending.prototype = {
    create: function () {
        "use strict";

        var title = this.game.add.sprite(0, 0, 'ending');
        title.inputEnabled = true;
        title.events.onInputDown.add(this.showMenu, this);

        playMusic(true);
    },

    update: function() {
        "use strict";

        if (game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
            this.showMenu();
        }
    },

    showMenu: function () {
        "use strict";

        this.game.state.start('mainmenu');
    },
};
