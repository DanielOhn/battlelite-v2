interface Props {
  scene: Phaser.Scene
  x: number
  y: number
  key: string
}

export class Player extends Phaser.GameObjects.Sprite {
  public body: Phaser.Physics.Arcade.Body
  private currentScene: Phaser.Scene

  private keys: Map<string, Phaser.Input.Keyboard.Key>

  public getKeys(): Map<string, Phaser.Input.Keyboard.Key> {
    return this.keys
  }

  private addKey(key: string): Phaser.Input.Keyboard.Key {
    return this.currentScene.input.keyboard.addKey(key)
  }

  private handleInput() {
    if (this.keys.get("UP").isDown) this.body.setVelocityY(-300)
    else if (this.keys.get("DOWN").isDown) this.body.setVelocityY(300)
    else this.body.setVelocityY(0)

    if (this.keys.get("RIGHT").isDown) this.body.setVelocityX(300)
    else if (this.keys.get("LEFT").isDown) this.body.setVelocityX(-300)
    else this.body.setVelocityX(0)
  }

  constructor(props: Props) {
    super(props.scene, props.x, props.y, props.key)

    this.currentScene = props.scene
    this.initSprite()

    this.currentScene.add.existing(this)
  }

  private initSprite(): void {
    this.currentScene.physics.world.enable(this)
    this.body.setSize(42, 42)

    this.keys = new Map([
      ["UP", this.addKey("W")],
      ["DOWN", this.addKey("S")],
      ["LEFT", this.addKey("A")],
      ["RIGHT", this.addKey("D")],
    ])
  }

  public update(): void {
    this.currentScene.input.on("pointermove", this.lookAt, this)
    this.handleInput()
  }

  private lookAt(pointer): void {
    var angle =
      Phaser.Math.RAD_TO_DEG *
      Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y)
    this.setAngle(angle)
  }
}
