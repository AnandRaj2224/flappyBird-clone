import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade'
  },
  scene: {
    preload: preload,
    create: create
  }
};

// Loading assets like images, music, etc.
function preload() {
  // 'this' context -- scene
  // Contains functions and properties we can use
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png'); 
}

function create() {
  // Place images in the center of the canvas
  this.add.image(config.width / 2, config.height / 2, 'sky'); 
  this.add.image(config.width / 2, config.height / 2, 'bird'); 
}

new Phaser.Game(config);
