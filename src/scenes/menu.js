class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/bonk.wav');
        this.load.audio('sfx_explosion', './assets/pop.wav');
        this.load.audio('sfx_rocket', './assets/bonk.wav');
        this.load.audio('bgm', './assets/drunkuke.wav');
        //load assets

        this.load.image('backgroundSky', './assets/skyloop.jpg');
        this.load.image('radio', './assets/radio.png');
        this.load.image('rocks', './assets/foreground.png');
    }

    create() {

      this.backgroundSky = this.add.tileSprite(0, 0, 640, 480, 'backgroundSky').setOrigin(0, 0);
      this.rocks = this.add.tileSprite(0, 0, 640, 480, 'rocks').setOrigin(0, 0);

      

      this.radioTower = this.add.image(700, 0, 'radio').setOrigin(1, 0);
      this.radioTower.scale = 0.7;
        // menu text
        let menuConfig = {
            fontFamily: 'Helvetica',
            fontSize: '28px',
            backgroundColor: '#ffffff',
            color: '#000000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        
        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Artic Balloon Boof', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to slidee & (F) to Fling ur dart.', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#88bbFF';
        menuConfig.color = '#000000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding + 25, 'Press ← for "basic" or → for "acidic"', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000,
            acid: false,  
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 5,
            gameTimer: 45000,  
            acid: true,
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
    }
}