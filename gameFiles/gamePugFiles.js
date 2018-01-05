class PugFiles {
    constructor() {

    }
    setUp() {
        return `
div(id="debug" class="#{class}")
    span Adjacent : 
        span#adjacent
    br
    span Oppisite : 
        span#oppisite
    br
    span Hypotenuse : 
        span#hypotenuse
    br
    span Rotate : 
        span#rotate
#GUI   
    h1 HEALTH :
        span#health
    h1 XP : 
        span#xp    
`;
    }
    gameOver() {
        return `
.center
    h1 Game Over
    h2 Score : #{xp}
    br
    button#restartGame Play Again
                `;
    }
}

module.exports = PugFiles;