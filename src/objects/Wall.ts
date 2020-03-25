import { Physics } from "phaser"

interface Props {
  scene: Phaser.Scene
  x: number
  y: number 
  key: string
}

export class Wall extends Phaser.GameObjects.Image {
  public body: Physics.Arcade.StaticBody

  constructor(props: Props) {
    super(props.scene, props.x, props.y, props.key)

    this.initImage()
    this.scene.add.existing(this)
  }

  private initImage(): void {
    this.setOrigin(0, 0)

    this.scene.physics.world.enable(this)
  }

  update(): void {}
}
