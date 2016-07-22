import * as Config from './Config';
import Game from './Game';
import {observable} from 'mobx';

export default class{
  @observable config = Config.easy;
  @observable game = new Game(this.config);

  newGame(){
    this.game = new Game(this.config);
  }
}
