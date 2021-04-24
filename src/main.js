console.log("I am linked");


//this is the unmodified version of the game, in the process of adding new stuff!
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    backgroundColor: "#00a5dc",
    scene: [Menu, Play],
    parent: 'phaser_canvas',
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 16;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyF, keyR;