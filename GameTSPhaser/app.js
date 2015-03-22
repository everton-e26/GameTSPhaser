var Game;
(function (Game) {
    var ExtremeWalkingSimulator = (function () {
        function ExtremeWalkingSimulator() {
            this.game = new Phaser.Game(1280, 720, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload
            });
        }
        ExtremeWalkingSimulator.prototype.preload = function () {
            this.game.load.image('title', '/Graphics/TitleScreen.png');
            this.game.load.image('scene', '/Graphics/scene720p.png');
            this.game.load.image('gameover', '/Graphics/GameOver.png');

            this.game.load.atlasXML("HERO_WALKING", "Graphics/Hero_Walking.png", "Graphics/Hero_Walking.xml");
            this.game.load.atlasXML("HERO_IDLE", "Graphics/Hero_Idle.png", "Graphics/Hero_Idle.xml");

            this.game.load.audio("TitleSong", ["Sounds/TitleSong.mp3", "Sounds/TitleSong.ogg", "Sounds/TitleSong.wav"]);
        };

        ExtremeWalkingSimulator.prototype.create = function () {
            this.game.state.add("TitleScreenState", Game.States.TitleScreenState, true);
            this.game.state.add("GamePlayState", Game.States.GamePlayState, false);
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        };
        return ExtremeWalkingSimulator;
    })();
    Game.ExtremeWalkingSimulator = ExtremeWalkingSimulator;
})(Game || (Game = {}));

window.onload = function () {
    var game = new Game.ExtremeWalkingSimulator();
};
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game;
(function (Game) {
    (function (GameObjects) {
        (function (PlayerState) {
            PlayerState[PlayerState["IDLE"] = 0] = "IDLE";
            PlayerState[PlayerState["WALKING"] = 1] = "WALKING";
        })(GameObjects.PlayerState || (GameObjects.PlayerState = {}));
        var PlayerState = GameObjects.PlayerState;

        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(game, x, y) {
                this.game = game;
                this.walkingSpeed = 0;
                this.RIGHT_ARROW = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                this.RIGHT_ARROW.onDown.add(Player.prototype.MoveRigth, this);

                this.LEFT_ARROW = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                this.LEFT_ARROW.onDown.add(Player.prototype.MoveLessRight, this);

                this.ESCAPE = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
                this.ESCAPE.onDown.add(Player.prototype.GameOver, this);

                _super.call(this, game, x, y, "HERO_WAKING", 0);

                this.anchor.set(0.0, 1.0);
                this.StartIdle();
            }
            Player.prototype.update = function () {
                if (this.playerState == 1 /* WALKING */) {
                    this.x += (this.walkingSpeed / Player.MAX_SPEED) * (60 / this.game.time.elapsedMS);
                }
            };

            Player.prototype.MoveRigth = function () {
                if (this.playerState == 0 /* IDLE */) {
                    this.StartWalking();
                } else {
                    if (this.walkingSpeed < Player.MAX_SPEED) {
                        this.walkingSpeed++;
                    }
                    this.animations.currentAnim.speed = this.walkingSpeed;
                }
            };

            Player.prototype.StartWalking = function () {
                this.playerState = 1 /* WALKING */;
                this.walkingSpeed = 5;
                this.loadTexture("HERO_WALKING", 0);
                this.animations.add("walk");
                this.animations.play("walk", this.walkingSpeed, true);
            };

            Player.prototype.StartIdle = function () {
                this.playerState = 0 /* IDLE */;
                this.walkingSpeed = 0;
                this.loadTexture("HERO_IDLE", 0);
                this.animations.add("idle");
                this.animations.play("idle", 15, true);
            };

            Player.prototype.MoveLessRight = function () {
                if (this.playerState != 0 /* IDLE */) {
                    this.walkingSpeed--;
                    if (this.walkingSpeed > 0) {
                        this.animations.currentAnim.speed = this.walkingSpeed;
                    } else {
                        this.StartIdle();
                    }
                }
            };

            Player.prototype.GameOver = function () {
            };
            Player.MAX_SPEED = 30;
            return Player;
        })(Phaser.Sprite);
        GameObjects.Player = Player;
    })(Game.GameObjects || (Game.GameObjects = {}));
    var GameObjects = Game.GameObjects;
})(Game || (Game = {}));
var Game;
(function (Game) {
    (function (States) {
        var GamePlayState = (function (_super) {
            __extends(GamePlayState, _super);
            function GamePlayState() {
                _super.call(this);
            }
            GamePlayState.prototype.create = function () {
                this.player = new Game.GameObjects.Player(this.game, 0, this.game.height - 50);
                this.game.add.existing(this.player);
            };
            return GamePlayState;
        })(Phaser.State);
        States.GamePlayState = GamePlayState;
    })(Game.States || (Game.States = {}));
    var States = Game.States;
})(Game || (Game = {}));
var Game;
(function (Game) {
    (function (States) {
        var TitleScreenState = (function (_super) {
            __extends(TitleScreenState, _super);
            function TitleScreenState() {
                _super.call(this);
            }
            TitleScreenState.prototype.create = function () {
                this.titleScreenImage = this.add.sprite(0, 0, "title");
                this.titleScreenImage.scale.setTo(this.game.width / this.titleScreenImage.width, this.game.height / this.titleScreenImage.height);

                this.music = this.game.add.audio("TitleSong");
                this.music.volume = 0.25;
                this.music.loop = true;
                this.music.play();

                this.input.onTap.addOnce(this.titleClicked, this);
            };

            TitleScreenState.prototype.titleClicked = function () {
                this.music.stop();
                this.game.state.start("GamePlayState");
            };
            return TitleScreenState;
        })(Phaser.State);
        States.TitleScreenState = TitleScreenState;
    })(Game.States || (Game.States = {}));
    var States = Game.States;
})(Game || (Game = {}));
//# sourceMappingURL=app.js.map
