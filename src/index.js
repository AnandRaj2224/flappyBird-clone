import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade"
  },
  scene: {
    preload: preload,
    create: create,
    update : update,
  },
};

let bird = null;

const VELOCITY = 200;
const FLAP_VELOCITY = 250;
const PIPES_TO_RENDER = 4;
let pipeHorizontalDistance = 0;

const pipeDistance = [100,250];

const initialBirdPostion = {
  x : config.width * 0.1,
  y : config.height / 2
}

function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("bird", "assets/bird.png");
  this.load.image("pipe", "assets/pipe.png");
}

function create() {
  this.add.image(0,0, "sky").setOrigin(0);
  bird = this.physics.add.sprite( initialBirdPostion.x, initialBirdPostion.y, "bird").setOrigin(0);
  bird.body.gravity.y = 400;


  for(let i = 0; i <= PIPES_TO_RENDER; i++) {
    const upperPipe = this.physics.add.sprite( 0,0, "pipe").setOrigin(0,1);
    const lowerPipe = this.physics.add.sprite( 0,0, "pipe").setOrigin(0,0);

    placePipes(upperPipe,lowerPipe);
  }

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);

}

function update (time , delta) {
  if(bird.y > config.height || bird.y < -config.height) {
    restartBirdPositon();
  }
}

function restartBirdPositon() {
  bird.x = initialBirdPostion.x;
  bird.y = initialBirdPostion.y;
  bird.setVelocityY(0);
}

function flap() {
  bird.body.velocity.y = -FLAP_VELOCITY;
}

function placePipes(uPipe,lPipe) {
  pipeHorizontalDistance += 400;
  let pipeVerticalDistance = Phaser.Math.Between(...pipeDistance);
  let upperPipePostion = Phaser.Math.Between(20,config.height-20-pipeVerticalDistance);

  uPipe.x = pipeHorizontalDistance;
  uPipe.y = upperPipePostion;

  lPipe.x = uPipe.x;
  lPipe.y = uPipe.y + pipeVerticalDistance;

  uPipe.setVelocityX(-VELOCITY);
  lPipe.setVelocityX(-VELOCITY);

}
new Phaser.Game(config);
