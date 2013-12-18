MouseGame.Ending = function (game) {
    //  Our main menu
    this.game = game;
};

var intro1;
var intro2;
var intro3;
var nextButton;
var introScreens = [];

MouseGame.Ending.prototype = {
    preload: function() {
        // game.load.image('title','assets/backgrounds/title.jpg');
        // game.load.image('intro-1','assets/backgrounds/intro-1.jpg');
        // game.load.image('intro-2','assets/backgrounds/intro-2.jpg');
        // game.load.image('intro-3','assets/backgrounds/intro-3.jpg');
        // game.load.image('intro-4','assets/backgrounds/intro-4.jpg');
        // game.load.image('intro-5','assets/backgrounds/intro-5.jpg');
        // game.load.image('intro-6','assets/backgrounds/intro-6.jpg');
        // game.load.image('intro-7','assets/backgrounds/intro-7.jpg');
        // game.load.image('intro-8','assets/backgrounds/intro-8.jpg');
        // game.load.image('intro-9','assets/backgrounds/intro-9.jpg');
        // game.load.image('intro-10','assets/backgrounds/intro-10.jpg');
        // game.load.audio('menu-music', ['assets/music/game.mp3', 'assets/music/game.ogg']);
    },

    create: function () {
        title = this.game.add.sprite(0, 0, 'ending');
        title.inputEnabled = true;
        title.events.onInputDown.add(this.showMenu, this);

        playMusic(true);
    },

    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
            this.showMenu();
        }
    },

    showMenu: function () {
        this.game.state.start('mainmenu');
    },
}
