console.log("I am linked");


//this is the slightly modded version of ghetto space invaders (now with sound!), in the process of adding new stuff!

/* 
Currently added:
Balloon assets
colorful blue sky background
hell music, written and recorded by yours truly

to do:
add cute puffy clouds
change rocket to throwing dart
change sound effects
change balloon popping animation
make dart steerable (tilt left and right instead of sliding)
make dart faster
add trees on either side of the screen
vodka button
maybe 2 players :)

*/
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