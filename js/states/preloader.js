MouseGame.Preloader = function (game) {

    this.game = game;

};

MouseGame.Preloader.prototype = {

    preload: function () {
        game.load.image('preloader-background','assets/backgrounds/preloader.jpg');
    },

    create: function () {
        game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        game.stage.scale.setShowAll();
        window.addEventListener('resize', function () {
          game.stage.scale.refresh();
        });
        game.stage.scale.refresh();

        var bg = this.game.add.sprite(0, 0, 'preloader-background');

        switch (window.location.hash){
            case '#mainmenu':
                this.game.state.start('mainmenu');
                break;
            case '#credits':
                this.game.state.start('credits');
                break;
            case '#levelselector':
                this.game.state.start('levelselector');
                break;
            case '#game':
                var level = window.location.pathname;

                this.game.state.states.levelselector.level = level.replace('/', '');
                this.game.state.start('game');
                break;

            default:
                this.game.state.start('intro');
        }

    }

}
