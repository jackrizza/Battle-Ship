class Sprites {
    constructor() {
        this.app = document.getElementById("app");
    }

    createPlayer() {
        let user = document.createElement("img");
        user.id = "user";
        user.src = "../assets/ship.png";
        this.app.appendChild(user);
        return user;

    }

    createAlien() {
        let alien = document.createElement("img");
        alien.id = "alien";
        alien.src = "../assets/alien.png";
        this.app.appendChild(alien);
        return alien;
    }
}

module.exports = Sprites;