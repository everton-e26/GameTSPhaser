module Game {

    export class ExtremeWalkingSimulator {
        game: Phaser.Game;

        constructor() {

            var width = window.innerWidth;
            var heigth = window.innerHeight;

            if( width > 1280 || heigth > width) {
                width = 1280;
                heigth = 720;
            }

            this.game = new Phaser.Game(width, heigth, Phaser.AUTO, 'content', {
                create: this.create, preload: this.preload
            });
        }

        preload() {
            //Graphics
            this.game.load.image('title', '/Graphics/TitleScreen.png');
            this.game.load.image('scene', '/Graphics/scene720p.png');
            this.game.load.image('gameover', '/Graphics/GameOver.png');

            //Spritesheets

            this.game.load.atlasXML(
                "HERO_WALKING",
                "Graphics/Hero_Walking.png",
                "Graphics/Hero_Walking.xml");
            this.game.load.atlasXML(
                "HERO_IDLE",
                "Graphics/Hero_Idle.png",
                "Graphics/Hero_Idle.xml");

            //gameOver

            this.game.load.audio("TitleSong", ["Sounds/TitleSong.mp3", "Sounds/TitleSong.ogg", "Sounds/TitleSong.wav"]);
        }

        create() {
            this.game.state.add("TitleScreenState", Game.States.TitleScreenState, true);
            this.game.state.add("GamePlayState", Game.States.GamePlayState, false);
            this.game.state.add("GameOverState", Game.States.GameOverState, false);
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }
    }
}

window.onload = () => {

    var game = new Game.ExtremeWalkingSimulator();
}