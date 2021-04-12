console.log("I am linked");

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 16;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyF, keyR;