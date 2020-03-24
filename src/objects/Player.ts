interface Props {
  scene: Phaser.Scene
  x: number
  y: number
  key: string
}

export class Player extends Phaser.GameObjects.Sprite {
  public body: Phaser.Physics.Arcade.Body
  private currentScene: Phaser.Scene

  constructor(props: Props) {
    super(props.scene, props.x, props.y, props.key)

    this.currentScene = props.scene
    this.initSprite()

    this.currentScene.add.existing(this)
  }

  private initSprite(): void {
    this.currentScene.physics.world.enable(this)
  }

  public update(): void {
    this.currentScene.input.on("pointermove", this.lookAt, this)
  }

  private lookAt(pointer): void {
    var angle =
      Phaser.Math.RAD_TO_DEG *
      Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y)
    this.setAngle(angle)
    this.body.rotation = angle
  }
}
