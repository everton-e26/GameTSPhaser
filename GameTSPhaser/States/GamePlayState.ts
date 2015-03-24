module Game.States {
    export class GamePlayState extends Phaser.State {

        game: Phaser.Game;
        player: Game.GameObjects.Player;
        myScene: GameObjects.Myscene;
        constructor() {
            super();
        }

        create() {
            //the world needs be the first thing to be created - not it's a rule but more professional
            this.myScene = new GameObjects.Myscene(this.game, 0, 0);
            this.player = new GameObjects.Player(this.game, 0, this.game.height - 50);

            this.game.add.existing(this.myScene);
            this.game.add.existing(this.player);

            this.game.world.setBounds(0, 0, this.myScene.width * 2, this.myScene.height);
            this.game.camera.follow(this.player);
        }
    }
}