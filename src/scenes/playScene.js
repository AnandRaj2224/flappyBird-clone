import Phaser from "phaser";

class PlayScene extends Phaser.Scene {

  constructor(config) {
    super('playScene');
    this.config = config;
    this.bird = null;
  }

  preLoad() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("bird", "assets/bird.png");
  }

  create() {
    this.add.image(0,0, "sky").setOrigin(0);
    this.bird = this.physics.add.sprite( this.config.startPostion.x, this.config.startPostion.y, "bird").setOrigin(0);
    bird.body.gravity.y = 400;
  }

  update() {

  }
}

export default PlayScene;