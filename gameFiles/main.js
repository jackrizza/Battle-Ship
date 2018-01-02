class Game {
    constructor() {
        this.Player = require("./player");
        this.debug = "";
        this.background = new Audio('../assets/background.wav');
        this.soundButton = document.getElementById("soundButton");
        this.isMute = false;
        this.user = null;
    }
    music() {
        //Sound by Rajive from the Noun Project
        this.background.addEventListener('ended', _ => {
            this.currentTime = 0;
            this.play();
        }, false);
        this.background.play();
        this.soundButton.addEventListener("click", _ => {
            console.log("sound click");
            this.isMute = (this.isMute ? false : true);
            if(this.isMute) {
                this.soundButton.src = "../assets/mute.png";
                this.background.pause();
            }else {
                this.soundButton.src = "../assets/sound.png";
                this.background.play();
            }
        }, false);
    }
    setUp() {
        document.getElementById("app").innerHTML = `
        <div id="debug" class="${this.debug}">
        <span>Adjacent : </span><span id="adjacent"></span>
        <span>Oppisite : </span><span id="oppisite"></span>
        <span>Hypotenuse : </span><span id="hypotenuse"></span>
        <span>Rotate : </span><span id="rotate"></span>
        </div>
        <div id="GUI">
        <h1>HEALTH : <span id="health"></span></h1>
        <h1>XP : <span id="xp"></span></h1>
        </div>
    `;
        this.user = new this.Player("Jack", 100, 0);
        this.user.createPlayer();
        this.user.controlPlayer();
        this.user.GUI();
    }

    update() {
        if (this.user.health > 0) {
            // play game
            this.user.loseHealth();

        } else if (this.user.health == 0) {
            // game over
            document.getElementById("app").innerHTML = `
        <div class="center">
            <h1>Game Over</h1>
            <h2>Score : ${this.user.xp}</h2>
            <br />
            <button id="restartGame">Play Again</button>
        </div>
        `;
            this.user = null;
            document.getElementById("restartGame").addEventListener('click', _ => {
                this.setUp();
            });
        }
    }

}

module.exports = Game;