MouseGame.Intro = function (game) {
    "use strict";

    //  Our main menu
    this.game = game;
};

var intro1;
var intro2;
var intro3;
var nextButton;
var introScreens = [];

MouseGame.Intro.prototype = {
    create: function () {
        "use strict";

        var intro10 = this.game.add.sprite(0, 0, 'intro-10');
        var intro9 = this.game.add.sprite(0, 0, 'intro-9');
        var intro8 = this.game.add.sprite(0, 0, 'intro-8');
        var intro7 = this.game.add.sprite(0, 0, 'intro-7');
        var intro6 = this.game.add.sprite(0, 0, 'intro-6');
        var intro5 = this.game.add.sprite(0, 0, 'intro-5');
        var intro4 = this.game.add.sprite(0, 0, 'intro-4');
        var intro3 = this.game.add.sprite(0, 0, 'intro-3');
        var intro2 = this.game.add.sprite(0, 0, 'intro-2');
        var intro1 = this.game.add.sprite(0, 0, 'intro-1');
        var title = this.game.add.sprite(0, 0, 'title');

        intro10.inputEnabled = true;
        intro9.inputEnabled = true;
        intro8.inputEnabled = true;
        intro7.inputEnabled = true;
        intro6.inputEnabled = true;
        intro5.inputEnabled = true;
        intro4.inputEnabled = true;
        intro3.inputEnabled = true;
        intro2.inputEnabled = true;
        intro1.inputEnabled = true;
        title.inputEnabled = true;

        intro10.events.onInputDown.add(this.nextSlide, this);
        intro9.events.onInputDown.add(this.nextSlide, this);
        intro8.events.onInputDown.add(this.nextSlide, this);
        intro7.events.onInputDown.add(this.nextSlide, this);
        intro6.events.onInputDown.add(this.nextSlide, this);
        intro5.events.onInputDown.add(this.nextSlide, this);
        intro4.events.onInputDown.add(this.nextSlide, this);
        intro3.events.onInputDown.add(this.nextSlide, this);
        intro2.events.onInputDown.add(this.nextSlide, this);
        intro1.events.onInputDown.add(this.nextSlide, this);
        title.events.onInputDown.add(this.nextSlide, this);

        introScreens = [title, intro1, intro2, intro3, intro4, intro5, intro6, intro7, intro8, intro9, intro10];

        playMusic(true);
    },

    update: function() {
        "use strict";

        if (game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
            this.showMenu();
        }
    },

    nextSlide: function() {
        "use strict";

        if (introScreens.length > 1) {
            var nextScene = introScreens.shift();

            game.add.tween(nextScene)
                .to({ alpha: 0 }, 500, Phaser.Easing.Linear.None)
                .start();
        } else {
            this.showMenu();
        }

    },

    showMenu: function () {
        "use strict";

        this.game.state.start('mainmenu');
    },
};
