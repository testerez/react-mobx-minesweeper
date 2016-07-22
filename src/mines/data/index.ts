import * as Config from './Config';
import Game from './Game';

export default class{
  config = Config.easy;
  game: Game | null;

  newGame(){
    this.game = new Game(this.config);
  }
}
