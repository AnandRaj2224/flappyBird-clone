import Phaser from "phaser";

const PIPES_TO_RENDER = 4;

class PlayScene extends Phaser.Scene {

  constructor(config) {
    super('playScene');
    this.config = config;
    this.bird = null;
    this.pipes = null;
    this.FLAP_VELOCITY = 250;

    this.pipeHorizontalDistance = 0;
    this.pipeHorizontalDistanceRange = [500,550];
    this.pipeVerticalDistanceRange = [100,250];

  }

  preLoad() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("bird", "assets/bird.png");
    this.load.image("pipe", "assets/pipe.png");
  }

  create() {
    this.add.image(0,0, "sky").setOrigin(0);
    this.bird = this.physics.add.sprite( this.config.startPostion.x, this.config.startPostion.y, "bird").setOrigin(0);
    bird.body.gravity.y = 400;

    pipes = this.physics.add.group();

    for(let i = 0; i <= PIPES_TO_RENDER; i++) {
      const upperPipe = this.pipes.create( 0,0, "pipe").setOrigin(0,1);
      const lowerPipe = this.pipes.create( 0,0, "pipe").setOrigin(0,0);
      this.placePipes(upperPipe,lowerPipe);
      this.pipes.setVelocityX(-200);

      this.input.on('pointerdown', this.flap,this);
      this.input.keyboard.on('keydown_SPACE', this.flap,this);

    }
  }

  update() {
    if(bird.y > config.height || bird.y < -config.height) {
      this.restartBirdPositon();
    }
    this.recyclePipes();
  }

  placePipes(uPipe,lPipe) {
    const rightMostPipe = getRightMostPipe();
    const pipeVerticalDistance = Phaser.Math.Between(...this.pipeVerticalDistanceRange);
    const pipeHorizontalDistance = Phaser.Math.Between(...this.pipeHorizontalDistanceRange);
    const upperPipePostion = Phaser.Math.Between(20,this.config.height-20-pipeVerticalDistance);
  
    uPipe.x = rightMostPipe + pipeHorizontalDistance;
    uPipe.y = upperPipePostion;
  
    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance;
  
    uPipe.setVelocityX(-VELOCITY);
    lPipe.setVelocityX(-VELOCITY);
  
  }
  recyclePipes() {
    const tempPipes = [];
    this.pipes.getChildren().forEach(pipe => {
      if(pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);
        if(tempPipes.length === 2) {
          this.placePipes(...tempPipes);
        }
      }
    });
  }
  getRightMostPipe() {
    let rightMostPipe = 0;
  
    this.pipes.getChildren().forEach(function(pipe) {
      rightMostPipe = Math.max(pipe.x,rightMostPipe);
    });
    return rightMostPipe;
  }
  
  restartBirdPositon() {
    this.bird.x = this.config.startPostion.x;
    this.bird.y = this.config.startPostion.y;
    this.bird.setVelocityY(0);
  }
  
  flap() {
    this.bird.body.velocity.y = -this.FLAP_VELOCITY;
  }
}

export default PlayScene;