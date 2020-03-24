import * as Phaser from "phaser"

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: "Game",
}

export class GameScene extends Phaser.Scene {
  private square: Phaser.GameObjects.Rectangle & {
    body: Phaser.Physics.Arcade.Body
  }

  private triangle: Phaser.GameObjects.Triangle & {
    // body: Phaser.Physics.Arcade.Body
  }

  constructor() {
    super(sceneConfig)
  }

  public create() {
    this.square = this.add.rectangle(400, 400, 50, 50, 0xffffff) as any
    this.physics.add.existing(this.square)
  }

  public update() {
    const cursorKeys = this.input.keyboard.createCursorKeys()

    if (cursorKeys.up.isDown) {
      this.square.body.setVelocityY(-500)
    } else if (cursorKeys.down.isDown) {
      this.square.body.setVelocityY(500)
    } else {
      this.square.body.setVelocityY(0)
    }

    if (cursorKeys.right.isDown) {
      this.square.body.setVelocityX(500)
    } else if (cursorKeys.left.isDown) {
      this.square.body.setVelocityX(-500)
    } else {
      this.square.body.setVelocityX(0)
    }

    this.input.on("pointermove", this.lookAt, this)
  }

  private lookAt(pointer) {
    var angle =
      Phaser.Math.RAD_TO_DEG *
      Phaser.Math.Angle.Between(
        this.square.x,
        this.square.y,
        pointer.x,
        pointer.y
      )
    this.square.setAngle(angle)
  }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: "Sample",

  type: Phaser.AUTO,

  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
  },

  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },

  parent: "game",
  backgroundColor: "#000000",
  scene: GameScene,
}

export const game = new Phaser.Game(gameConfig)
