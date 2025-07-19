import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
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
  this.load.image("pipe", "assets/pipe.png");
}

const VELOCITY = 200;
const FLAP_VELOCITY = 250;
let bird = null;
let upperPipe = null;
let lowerPipe = null;

const initialBirdPostion = {
  x : config.width * 0.1,
  y : config.height / 2
}

function create() {
  // Place images in the center of the canvas
  this.add.image(config.width / 2, config.height / 2, "sky");
  bird = this.physics.add.sprite( initialBirdPostion.x, initialBirdPostion.y, "bird").setOrigin(0);
  upperPipe = this.physics.add.sprite( 400, 100, "pipe").setOrigin(0,1);
  lowerPipe = this.physics.add.sprite( 400, upperPipe.y + 100, "pipe").setOrigin(0,0);

  bird.body.gravity.y = 400;
  bird.body.velocity  = VELOCITY;

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);

}

function update (time , delta) {
  if(bird.x >= config.width - bird.width) {
    bird.body.velocity  = -VELOCITY;
  } else if(bird.x <= 0) {
    bird.body.velocity  = VELOCITY;
  }
  if(bird.y > config.height || bird.y < -config.height) {
    restartBirdPositon();
  }
}

function restartBirdPositon() {
    bird.y = initialBirdPostion.y;
    bird.velocity.y = 0; 
}

function flap() {
  bird.body.velocity = FLAP_VELOCITY;
}
new Phaser.Game(config);
