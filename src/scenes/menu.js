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
    }

    create() {
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
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
    }
}