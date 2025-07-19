import Phaser from "phaser";
import PlayScene from "./scenes/playScene";

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = {x: WIDTH * 0.1, y : HEIGHT / 2};

const SHARED_CONFIG = {
  width : WIDTH,
  height : HEIGHT,
  startingPostion : BIRD_POSITION,
}
const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: "arcade"
  },
  scene: [new PlayScene(SHARED_CONFIG)] 
};

const VELOCITY = 200;

new Phaser.Game(config);
