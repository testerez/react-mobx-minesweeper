import * as Config from './Config';
import Game from './Game';
import {observable} from 'mobx';
import {autobind} from 'core-decorators';

@autobind
export default class{
  @observable config = Config.easy;
  @observable game = new Game(this.config);

  newGame() {
    this.game = new Game(this.config);
  }
}
