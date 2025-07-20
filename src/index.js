import Phaser from "phaser";

import PlayScene from "./scenes/playScene";
import MenuScene from './scenes/menuScene';
import PreloadScene from './scenes/preloadScene';
import ScoreScene from './scenes/scoreScene';



const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = {x: WIDTH * 0.1, y : HEIGHT / 2};

const Scenes = [PreloadScene, MenuScene, ScoreScene, PlayScene];
const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const SHARED_CONFIG = {
  width : WIDTH,
  height : HEIGHT,
  startPostion : BIRD_POSITION,
}
const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: "arcade"
  },
   scene: initScenes()
}


new Phaser.Game(config);
