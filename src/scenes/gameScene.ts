import { Player } from "../objects/Player"

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
}

export class GameScene extends Phaser.Scene {
  private player: Player

  constructor() {
    super(sceneConfig)
  }

  public preload(): void {
    this.load.image("test", "/assets/test.png")
    this.load.image("bullet", "/assets/bullet.png")
  }

  public create(): void {
    // this.add.image(500, 500, 'bullet')

    this.player = new Player({
      scene: this,
      x: 100,
      y: 100,
      key: "test",
    })

    
  }

  public update(): void {
    this.player.update()
  }
}
