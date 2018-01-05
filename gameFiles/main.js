class Game {
    constructor() {
        this.Player = require("./player");
        this.gpf = require("./gamePugFiles");
        this.scenes = new this.gpf();
        this.pug = require("pug");
        this.debug = "";
        this.background = new Audio('../assets/background.wav');
        this.soundButton = document.getElementById("soundButton");
        this.isMute = false;
        this.user = "";
        this.gamePlayScene = this.pug.compile(this.scenes.setUp());
        this.gameOver = this.pug.compile(this.scenes.gameOver());
    }

    music() {
        //Sound button by Rajive from the Noun Project
        this.background.addEventListener('ended', _ => {
            this.currentTime = 0;
            this.play();
        }, false);
        this.background.play();

        this.soundButton.addEventListener("click", _ => {
            this.isMute = (this.isMute ? false : true);
            if (this.isMute) {
                this.soundButton.src = "../assets/mute.png";
                this.background.pause();
            } else {
                this.soundButton.src = "../assets/sound.png";
                this.background.play();
            }
        }, false);
    }

    draw() {
        document.getElementById("app").innerHTML = this.gamePlayScene({
            class : this.debug
        });
        this.user = new this.Player("Jack", 100, 0);
        this.user.createPlayer();
        this.user.controlPlayer();
        this.user.GUI();
    }

    update() {
        if (this.user.health > 0) {
            // play game

        } else if (this.user.health == 0) {
            // game over
            document.getElementById("app").innerHTML = this.gameOver({
                xp : this.user.xp
            });
            this.user = null;
            document.getElementById("restartGame")
                .addEventListener('click', _ => {
                    this.draw();
                });
        }
    }

}

module.exports = Game;