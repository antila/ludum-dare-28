MouseGame.Intro = function (game) {
    //  Our main menu
    this.game = game;
};

var intro1;
var intro2;
var intro3;
var nextButton;
var introScreens = [];

MouseGame.Intro.prototype = {
    preload: function() {
        game.load.image('title','assets/backgrounds/title.jpg');
        game.load.image('intro-1','assets/backgrounds/intro-1.jpg');
        game.load.image('intro-2','assets/backgrounds/intro-2.jpg');
        game.load.image('intro-3','assets/backgrounds/intro-3.jpg');
        game.load.image('intro-4','assets/backgrounds/intro-4.jpg');
        game.load.image('intro-5','assets/backgrounds/intro-5.jpg');
        game.load.image('intro-6','assets/backgrounds/intro-6.jpg');
        game.load.image('intro-7','assets/backgrounds/intro-7.jpg');
        game.load.image('intro-8','assets/backgrounds/intro-8.jpg');
        game.load.image('intro-9','assets/backgrounds/intro-9.jpg');
        game.load.image('intro-10','assets/backgrounds/intro-10.jpg');
        game.load.audio('menu-music', ['assets/music/game.mp3', 'assets/music/game.ogg']);
    },

    create: function () {
        intro10 = this.game.add.sprite(0, 0, 'intro-10');
        intro9 = this.game.add.sprite(0, 0, 'intro-9');
        intro8 = this.game.add.sprite(0, 0, 'intro-8');
        intro7 = this.game.add.sprite(0, 0, 'intro-7');
        intro6 = this.game.add.sprite(0, 0, 'intro-6');
        intro5 = this.game.add.sprite(0, 0, 'intro-5');
        intro4 = this.game.add.sprite(0, 0, 'intro-4');
        intro3 = this.game.add.sprite(0, 0, 'intro-3');
        intro2 = this.game.add.sprite(0, 0, 'intro-2');
        intro1 = this.game.add.sprite(0, 0, 'intro-1');
        title = this.game.add.sprite(0, 0, 'title');

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
        if (game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
            this.showMenu();
        }
    },

    nextSlide: function() {
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
        this.game.state.start('mainmenu');
    },
}
