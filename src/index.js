import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update : update,
  },
};

// Loading assets like images, music, etc.
function preload() {
  // 'this' context -- scene
  // Contains functions and properties we can use
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
}

const VELOCITY = 200;
let bird = null;

function create() {
  // Place images in the center of the canvas
  this.add.image(config.width / 2, config.height / 2, "sky");
  bird = this.physics.add.image(config.width / 10, config.height / 2, "bird");
  bird.body.gravity.y = 200;
  bird.body.velocity  = VELOCITY;
}

function update (time , delta) {
  if(bird.x >= config.width - bird.width) {
    bird.body.velocity  = -VELOCITY;
  } else if(bird.x <= 0) {
    bird.body.velocity  = VELOCITY;
  }
}

new Phaser.Game(config);
