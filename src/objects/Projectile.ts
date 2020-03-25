interface Props {
  scene: Phaser.Scene
  x: number
  y: number
  key: string
  destination: {
    x: number
    y: number
  }
}

export class Projectile extends Phaser.GameObjects.Image {
  public body: Phaser.Physics.Arcade.Body

  private speed: number
  private pointer: { x: number; y: number }

  constructor(props: Props) {
    super(props.scene, props.x, props.y, props.key)

    this.pointer = props.destination

    this.initImage()
    this.scene.add.existing(this)
  }

  private initImage(): void {
    this.speed = 1000
    this.setOrigin(0.5, 0.5)
    this.setDepth(2)

    this.scene.physics.world.enable(this)
    this.scene.physics.moveTo(this, this.pointer.x, this.pointer.y, this.speed)
  }

  public update(): void {}
}
