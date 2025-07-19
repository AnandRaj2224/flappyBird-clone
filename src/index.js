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
let pipes = null;

const VELOCITY = 200;
const FLAP_VELOCITY = 250;
const PIPES_TO_RENDER = 4;
let pipeHorizontalDistanceRange = [500,550];

const pipeVerticalDistanceRange = [100,250];

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
  pipes = this.physics.add.group();

  for(let i = 0; i <= PIPES_TO_RENDER; i++) {
    const upperPipe = pipes.create( 0,0, "pipe").setOrigin(0,1);
    const lowerPipe = pipes.create( 0,0, "pipe").setOrigin(0,0);

    placePipes(upperPipe,lowerPipe);
  }

  pipes.setVelocityX(-200);
  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown_SPACE', flap);

}

function update (time , delta) {
  if(bird.y > config.height || bird.y < -config.height) {
    restartBirdPositon();
  }
}

function placePipes(uPipe,lPipe) {
  const rightMostPipe = getRightMostPipe();
  const pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
  const pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange);
  const upperPipePostion = Phaser.Math.Between(20,config.height-20-pipeVerticalDistance);

  uPipe.x = rightMostPipe + pipeHorizontalDistance;
  uPipe.y = upperPipePostion;

  lPipe.x = uPipe.x;
  lPipe.y = uPipe.y + pipeVerticalDistance;

  uPipe.setVelocityX(-VELOCITY);
  lPipe.setVelocityX(-VELOCITY);

}

function getRightMostPipe() {
  let rightMostPipe = 0;

  pipes.getChildren().forEach(function(pipe) {
    rightMostPipe = Math.max(pipe.x,rightMostPipe);
  });
  return rightMostPipe;
}

function restartBirdPositon() {
  bird.x = initialBirdPostion.x;
  bird.y = initialBirdPostion.y;
  bird.setVelocityY(0);
}

function flap() {
  bird.body.velocity.y = -FLAP_VELOCITY;
}

new Phaser.Game(config);
