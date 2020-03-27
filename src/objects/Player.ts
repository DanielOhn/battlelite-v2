import { Projectile } from "./Projectile"

interface Props {
  scene: Phaser.Scene
  x: number
  y: number
  key: string
}

// Moves
// MAKE Object or Class for each ability
// Basic
// - speed
// - duration
// - projectiles
// - key
// - cooldown
// - collision

// SpellOne & SpellTwo + Ult
// - speed
// - duration
// - projectiles
// - key
// - cooldown
// - collision

//
export class Player extends Phaser.GameObjects.Sprite {
  public body: Phaser.Physics.Arcade.Body
  public projectiles: Phaser.GameObjects.Group

  public hp: number = 5

  private reticle: Phaser.GameObjects.Sprite

  // private moveSpeed: number
  // private basicAttack: Object { speed, cooldown, key }

  private keys: Map<string, Phaser.Input.Keyboard.Key>
  private currentScene: Phaser.Scene

  constructor(props: Props) {
    super(props.scene, props.x, props.y, props.key)

    this.currentScene = props.scene
    this.initSprite()

    this.currentScene.cameras.main.startFollow(this.reticle)
    // this.currentScene.cameras.main.zoom(1.5)

    this.currentScene.add.existing(this)
  }

  public getKeys(): Map<string, Phaser.Input.Keyboard.Key> {
    return this.keys
  }

  private addKey(key: string): Phaser.Input.Keyboard.Key {
    return this.currentScene.input.keyboard.addKey(key)
  }

  private basicAbility(pointer) {
    if (this.active === false) return

    let proj = this.projectiles.get().setActive(true).setVisible(true)

    if (proj) {
      proj.shoot(this, this.reticle)
    }
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

    this.projectiles = this.currentScene.physics.add.group({
      classType: Projectile,
      runChildUpdate: true,
    })

    // Aiming Sprite
    this.reticle = this.currentScene.physics.add.sprite(800, 700, "target")
    this.reticle.setOrigin(.5, .5).setDisplaySize(15, 15)
    this.currentScene.input.on(
      "pointermove",
      (pointer) => {
        if (this.currentScene.input.mouse.locked) {
          this.reticle.x += pointer.movementX
          this.reticle.y += pointer.movementY
        }
      },
      this
    )
  }

  private constrainReticle(reticle) {
    let disX: number, disY: number;
    let range: number = 300

    disX = reticle.x - this.x
    disY = reticle.y - this.y

    if (disX > range) reticle.x = this.x + range
    else if ( disX < -range) reticle.x = this.x - range

    if (disY > range) reticle.y = this.y + range
    else if ( disY < -range) reticle.y = this.y - range
  }

  // private initProjectiles(): void {
  //   this.projectiles = this.currentScene.physics.add.group({
  //     key: "bullet",
  //     maxSize: 4,
  //   })
  // }

  // public getProjectiles(): Phaser.GameObjects.Group {
  //   return this.projectiles
  // }

  public update(): void {
    this.handleInput()
    this.constrainReticle(this.reticle)

    this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.reticle.x, this.reticle.y)
    this.reticle.body.setVelocityX(this.body.velocity.x)
    this.reticle.body.setVelocityY(this.body.velocity.y)
  }

  private handleInput() {
    if (this.keys.get("UP").isDown) this.body.setVelocityY(-300)
    else if (this.keys.get("DOWN").isDown) this.body.setVelocityY(300)
    else this.body.setVelocityY(0)

    if (this.keys.get("RIGHT").isDown) this.body.setVelocityX(300)
    else if (this.keys.get("LEFT").isDown) this.body.setVelocityX(-300)
    else this.body.setVelocityX(0)

    this.currentScene.input.on("pointerdown", this.basicAbility, this)
  }
}
