class Bullet {
    constructor(mX, mY) {
        this.mouseX = mX;
        this.mouseY = mY;
        this.velocity = 2;
        this.app = document.getElementById("app");
    }
    wait(ms) {
        var d = new Date();
        var d2 = null;
        do {
            d2 = new Date();
        }
        while (d2 - d < ms);
    }
    createBullet() {
        // create bullet
        let lazer = new Audio('../assets/lazer.wav');
        let bullet = document.createElement("div");
        bullet.style.position = "absolute";
        bullet.style.width = "2px";
        bullet.style.height = "4px";
        bullet.style.left = window.innerWidth / 2 + "px";
        bullet.style.top = window.innerHeight / 2 + "px";
        bullet.style.background = "red";
        this.app.appendChild(bullet);
        lazer.play();
        // fire bullet
        this.app.removeChild(bullet);
    }
}

module.exports = Bullet;