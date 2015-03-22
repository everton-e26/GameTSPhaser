module Game.States {
    export class GamePlayState extends Phaser.State {

        game: Phaser.Game;
        player: Game.GameObjects.Player;
        constructor() {
            super();
        }

        create() {
            this.player = new GameObjects.Player(this.game, 0, this.game.height - 50);
            this.game.add.existing(this.player);
        }
    }
}