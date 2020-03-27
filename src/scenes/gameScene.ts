import { Player } from "../objects/Player"
import { Wall } from "../objects/Wall"

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
}

export class GameScene extends Phaser.Scene {
  private player: Player
  private walls: Phaser.GameObjects.Group

  constructor() {
    super(sceneConfig)
  }

  public preload(): void {
    this.load.image("test", "/assets/test.png")
    this.load.image("bullet", "/assets/bullet.png")
    this.load.image("wall", "/assets/wall.png")
    this.load.image('target', '/assets/target.png')
  }

  public create(): void {
    this.player = new Player({
      scene: this,
      x: 100,
      y: 100,
      key: "test",
    })

    this.createWalls()

    this.game.canvas.addEventListener('mousedown', () => {
      this.game.input.mouse.requestPointerLock()
    })
    
  }

  private createWalls() {
    this.walls = this.physics.add.staticGroup()
    this.walls = this.physics.add.group({
      key: "wall",
      repeat: 15,
      setXY: { x: 16, y: 16, stepX: 32 },
    })
  }

  public update(): void {
    this.player.update()
    // this.playerCollision()
  }
  

  // private playerCollision() {
  //   this.physics.add.overlap(
  //     this.player.getProjectiles(),
  //     this.walls,
  //     this.destroyProjectile,
  //     null,
  //     this
  //   )
  }
 
  // private destroyProjectile(proj, wall) {
  //   // this.player.projectiles.killAndHide(proj)
  //   proj.disableBody(true, true)
  //   // proj.active = false
  // }

