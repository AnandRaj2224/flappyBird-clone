import Phaser from "phaser";

import PlayScene from "./scenes/playScene";
import MenuScene from './scenes/menuScene';
import PreloadScene from './scenes/preloadScene';
import ScoreScene from './scenes/scoreScene';
import PauseScene from './scenes/pauseScene';


const isMobile = window.innerWidth <= 768; // or any breakpoint you like

const WIDTH = 800;
const HEIGHT = 400;
const BIRD_POSITION = {x: WIDTH * 0.1, y : HEIGHT / 2};

const Scenes = [PreloadScene, MenuScene, ScoreScene, PlayScene, PauseScene];

const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const SHARED_CONFIG = {
  width : WIDTH,
  height : HEIGHT,
  startPosition : BIRD_POSITION,
}
const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  parent: 'game-container',
  pixelArt: true,
  physics: {
    default: "arcade"
  },
  scale: {
    mode: isMobile ? Phaser.Scale.FIT : Phaser.Scale.NONE,  // scale down only on mobile
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
   scene: initScenes()
}


new Phaser.Game(config);
