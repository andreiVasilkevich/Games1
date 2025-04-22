// import elwynnForestJSON from '../assets/elwynn.json';
import untitledJSON from '../assets/untitled.json'
import { Enemy } from '../entities/enemy';
import { Player } from '../entities/player';
import { LAYERS, SIZES, SPRITES, TILES } from '../utils/constants';

export class ElwynnForest extends Phaser.Scene {
    private player?: Player;
    private boar: Enemy;
    boarSecond: Enemy;
    killsText: Phaser.GameObjects.Text;
    killsCounter: number = 0;
    constructor() {
        super('ElwynnForestScene');
    }

    preload () {
        this.load.image(TILES.ELWYNN, 'src/assets/summer_tiles.png')
        this.load.tilemapTiledJSON('map', 'src/assets/untitled.json')
        this.load.spritesheet(SPRITES.PLAYER.base, 'src/assets/characters/alliance.png', {
            frameWidth: SIZES.PLAYER.WIDTH,
            frameHeight: SIZES.PLAYER.HEIGHT
        })
        this.load.spritesheet(SPRITES.PLAYER.fight, 'src/assets/characters/alliance-fight-small.png', {
            frameWidth: SIZES.PLAYER.WIDTH,
            frameHeight: SIZES.PLAYER.HEIGHT
        })

        this.load.spritesheet(SPRITES.BOAR.base, 'src/assets/characters/boar.png', {
            frameWidth: SIZES.BOAR.WIDTH,
            frameHeight: SIZES.BOAR.HEIGHT
        })
    }

    create () {
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage(untitledJSON.tilesets[0].name, TILES.ELWYNN, SIZES.TILE, SIZES.TILE);
        const groundLayer = map.createLayer(LAYERS.GROUND, tileset, 0, 0);
        const wallsLayer = map.createLayer(LAYERS.WALLS, tileset, 0, 0);

        this.player = new Player(this, 400, 250, SPRITES.PLAYER);
        this.boar = new Enemy(this, 600, 400, SPRITES.BOAR.base);
   
        this.boar.setPlayer(this.player);
       
        this.player.setEnemies([this.boar])
        
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.player.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, wallsLayer);
        wallsLayer.setCollisionByExclusion([-1]);

    }

    update(_: number, delta: number): void {
        this.player.update(delta);
        this.boar.update();
    }
}