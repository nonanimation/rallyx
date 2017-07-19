requirejs.config({
    baseUrl: '.',
    paths: {
    }
});

requirejs([
    "gameOptions",
    "screen",
], function (gameOptions,
    Screen,
) {
        game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, null, "game");

        var Init = function (game) {
            this.preload = function () {
                // game.scale.setUserScale(3, 3);
                game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

                game.scale.pageAlignHorizontally = true;
                game.scale.pageAlignVertically = true;
                // game.stage.disableVisibilityChange = true;

                //game.load.audio('default', ['captured.wav']);
            };

            this.create = function () {

                // var backgroundMusic = game.add.audio('default');
                // backgroundMusic.loop = true;
                // backgroundMusic.play();

                // starting ARCADE physics
                game.physics.startSystem(Phaser.Physics.ARCADE);
                game.state.start("title");
            };
        };

        var Title = function (game) {

            this.preload = function () {
                game.load.image("title", "assets/title.png");
            };

            this.create = function () {
                game.add.sprite(0, 0, 'title');

                // handle keyboard
                game.input.keyboard.onDownCallback = function (ev) {
                    switch (ev.keyCode) {
                        case 32:
                        case 38:
                            game.state.start("screen");
                            break;
                    }
                };
            };
        };

        game.state.add("init", new Init(game));
        game.state.add("title", new Title(game));
        game.state.add("screen", new Screen(game));
        game.state.start("init");
    });
