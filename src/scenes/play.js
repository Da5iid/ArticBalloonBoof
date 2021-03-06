class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/dart.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('balloon1', './assets/balloon1.png')
        this.load.image('balloon2', './assets/balloon2.png')
        this.load.image('balloon3', './assets/balloon3.png')
        this.load.image('backgroundSky', './assets/skyloop.jpg');
        this.load.image('radio', './assets/radio.png');
        this.load.image('rocks', './assets/foreground.png');
        this.load.audio('bgm', ['./assets/drunkuke.wav']);

        // load spritesheet
        this.load.spritesheet('explosion', './assets/pop animation.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // background color
        game.backgroundColor = "#00a5dc";
        // background music
        let music = this.sound.add("bgm", { loop: false, volume: 0.5 });
        music.play();



        // place tile sprite
        // if (game.settings.acid == false) {
        //     this.backgroundSky = this.add.tileSprite(0, 0, 640, 480, 'backgroundSky').setOrigin(0, 0);
        //     this.rocks = this.add.tileSprite(0, 0, 640, 480, 'rocks').setOrigin(0, 0);
        //     this.radioTower = this.add.image(700, 0, 'radio').setOrigin(1, 0);
        //     this.radioTower.scale = 0.7;
        // } else {
            this.backgroundSky = this.add.tileSprite(0, 0, 640, 480, 'backgroundSky').setOrigin(0, 0);
            this.rocks = this.add.tileSprite(0, 0, 640, 480, 'rocks').setOrigin(0, 0);
            this.radioTower = this.add.image(700, 0, 'radio').setOrigin(1, 0);
            this.radioTower.scale = 0.7;

            this.backgroundSky.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
            this.rocks.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
            this.radioTower.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
        //}
        
        

        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        // add rocket (p1) HAD TO ADD 12 TO THE y POS OR IT WOULD BE HIDDEN BY THE BORDER TF? why is no one else having this issue, the code isn't wrong.
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - 85, 'rocket').setOrigin(0.5, 0);
        this.p1Rocket.scale = 0.75;

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'balloon1', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'balloon2', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'balloon3', 0, 10).setOrigin(0,0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);


        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;

          // display score
        let scoreConfig = {
            fontFamily: 'Helvetica',
            fontSize: '28px',
            backgroundColor: '#389fff',
            color: '#000000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
    

    // GAME OVER flag
    this.gameOver = false;
    
    // 60-second play clock timer
    scoreConfig.fixedWidth = 0;
    this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
        this.gameOver = true;
    }, null, this);
    
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.get('bgm').stop();
            this.scene.restart();
        }

        this.backgroundSky.tilePositionX += 0.4;
        this.rocks.tilePositionX += 0.7;

        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        } 

                // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        this.sound.play('sfx_explosion', {volume: 0.5});

        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
    this.p1Score += ship.points;
    this.scoreLeft.text = this.p1Score;
    }
}