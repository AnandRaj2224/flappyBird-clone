import Phaser from "phaser";

const PIPES_TO_RENDER = 4;
const VELOCITY = 200;

class PlayScene extends Phaser.Scene {

  constructor(config) {
    super('playScene');
    this.config = config;
    this.bird = null;
    this.pipes = null;
    this.FLAP_VELOCITY = 300;
    

    this.pipeHorizontalDistance = 0;
    this.pipeHorizontalDistanceRange = [500,550];
    this.pipeVerticalDistanceRange = [100,250];

    this.score = 0;
    this.scoreText = '';
  }

  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("bird", "assets/bird.png");
    this.load.image("pipe", "assets/pipe.png");
    this.load.image("pause", "assets/pause.png");
  }

  create() {
    this.createBG();
    this.createBird();
    this.createPipes();
    this.createScore();
    this.createPause();
    this.handleInputs();
  }

  update() {
    this.checkGameStatus();
    this.recyclePipes();
    this.createColliders();
  }

  createBG() {
    this.add.image(0,0, "sky").setOrigin(0);
  }

  createBird() {
    this.bird = this.physics.add.sprite( this.config.startPostion.x, this.config.startPostion.y, "bird").setOrigin(0);
    this.bird.body.gravity.y = 600;
    this.bird.setCollideWorldBounds(true);
  }

  createPipes() {
    this.pipes = this.physics.add.group();

    for(let i = 0; i <= PIPES_TO_RENDER; i++) {
      const upperPipe = this.pipes.create( 0,0, "pipe").setImmovable(true).setOrigin(0,1);
      const lowerPipe = this.pipes.create( 0,0, "pipe").setImmovable(true).setOrigin(0,0);
      this.placePipes(upperPipe,lowerPipe);
      this.pipes.setVelocityX(-200);
    }
  }
  
  createColliders() {
    this.physics.add.collider(this.bird,this.pipes,this.gameOver,null,this);
  }

  createScore() {
    this.score = 0;
    const bestScore = localStorage.getItem('bestScore');
    this.scoreText = this.add.text(16,16,`Score: ${0}`, {fontSize : '32px', fill : '#000'});
    this.add.text(16,52,`Best Score: ${bestScore|| 0}`, {fontSize : '18px', fill : '#000'});
  }

  createPause() {
    this.add.image(this.config.width - 10, this.config.height -10, 'pause')
      .setScale(3)
      .setOrigin(1)
  }

  handleInputs() {
    this.input.on('pointerdown', this.flap,this);
    this.input.keyboard.on('keydown_SPACE', this.flap,this);
  }
  checkGameStatus() {
    if(this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0) {
    this.gameOver();
    }

  }
  placePipes(uPipe,lPipe) {
    const rightMostPipe = this.getRightMostPipe();
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
          this.increaseScore();
          this.saveBestScore();
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
  
  saveBestScore() {
    const bestScoreText = localStorage.getItem('bestScore');
    const bestScore = bestScoreText && parseInt(bestScoreText,10);

    if(!bestScore || this.score > bestScore) {
      localStorage.setItem('bestScore',this.score);
    }
  }

  gameOver() {
    this.physics.pause();
    this.bird.setTint(0xEE4824);

    this.saveBestScore();

    this.time.addEvent({
      delay : 1000,
      callback : () => {
        this.scene.restart();
      },
      loop : false
    });
   
  }
  
  flap() {
    this.bird.body.velocity.y = -this.FLAP_VELOCITY;
  }
  increaseScore() {
    this.score++;
    this.scoreText.setText(`score: ${this.score}`)
  }
}

export default PlayScene;