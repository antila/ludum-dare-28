MouseGame.Credits = function (game) {
    //  Our main menu
    this.game = game;
};

MouseGame.Credits.prototype = {
    preload: function() {
        game.load.image('credits-background','assets/backgrounds/credits-background.jpg');

        // Buttons
        game.load.image('button-back','assets/buttons/back.png');
    },

    create: function () {

        var bg = this.game.add.sprite(0, 0, 'credits-background');
        // bg.scale.setTo(2.5, 2.5);

        // var t = this.game.add.sprite(100, 600, 'touhou');
        // t.anchor.setTo(0, 1);

        button = this.game.add.button(this.game.world.centerX, 630, 'button-back', this.showMenu, this, 2, 1, 0);
        button.anchor.setTo(0.5, 0.5);
        history.pushState(null, null, '#credits');
    },

    showMenu: function () {
        this.game.state.start('mainmenu');
    },
}
