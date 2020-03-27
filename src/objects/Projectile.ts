interface Props {
  scene: Phaser.Scene
  x: number
  y: number
  key: string
}

export class Projectile extends Phaser.GameObjects.Image {
  public body: Phaser.Physics.Arcade.Body
  private currentScene: Phaser.Scene
  private born: number
  private speed: number

  constructor(props: Props) {
    super(props.scene, props.x, props.y, props.key)

    this.currentScene = props.scene

    this.initImage()
    this.currentScene.add.existing(this)
  }

  public shoot(shooter, target) {
    let pointer = this.currentScene.input.mousePointer

    this.setPosition(this.x, this.y)
    this.scene.physics.moveTo(this, pointer.x, pointer.y, this.speed)

    this.rotation = shooter.rotation
    this.born = 0
  }

  private initImage(): void {
    this.speed = 700
    this.setOrigin(0.5, 0.5)

    this.scene.physics.world.enable(this)
  }

  public update(delta: number): void {
    this.born += delta
    if (this.born > 1800) {
      this.setActive(false)
      this.setVisible(false)
    }
  }
}
