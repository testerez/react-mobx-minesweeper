import * as Config from './Config';
import Game from './Game';
import {observable, action, useStrict} from 'mobx';
import {autobind} from 'core-decorators';

useStrict(true);

@autobind
export default class{
  @observable config = Config.easy;
  @observable game = new Game(this.config);

  @action
  newGame() {
    this.game = new Game(this.config);
  }
}
