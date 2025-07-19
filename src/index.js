import Phaser, { Physics, Scenes } from "phaser";

const config = {
  type : Phaser.AUTO,
  width : 800,
  height : 600,
  Physics : {
    default : 'arcade'
  },
  Scenes : {
    preload,
    create,
  }
};

// loading assests like -- images, music,..
function preload () {
}

function create () {
}

new Phaser.Game(config);