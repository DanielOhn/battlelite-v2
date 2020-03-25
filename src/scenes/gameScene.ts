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
  }

  public create(): void {
    this.player = new Player({
      scene: this,
      x: 100,
      y: 100,
      key: "test",
    })

    this.createWalls()
  }

  private createWalls() {
    this.walls = this.add.group({
      active: true,
      maxSize: 4 * 15,
      runChildUpdate: true,
    })

    for (let i = 0; i < 15; i++) {
      this.walls.add(
        new Wall({
          scene: this,
          x: i * 32,
          y: 0,
          key: "wall",
        })
      )
      this.walls.add(
        new Wall({
          scene: this,
          x: i * 32,
          y: 15 * 32,
          key: "wall",
        })
      )
      this.walls.add(
        new Wall({
          scene: this,
          x: 0,
          y: i * 32,
          key: "wall",
        })
      )
      this.walls.add(
        new Wall({
          scene: this,
          x: 15 * 32,
          y: i * 32,
          key: "wall",
        })
      )
    }
  }

  public update(): void {
    this.player.update()
  }
}
