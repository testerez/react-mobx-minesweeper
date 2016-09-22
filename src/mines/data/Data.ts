import * as Config from './Config';
import Game from './Game';
import Ui from './Ui';
import { observable, action, useStrict } from 'mobx';
import { autobind } from 'core-decorators';

useStrict(true);

@autobind
export default class Data {
  @observable config = Config.easy;
  @observable game = new Game(this.config);
  @observable ui = new Ui();

  @action setConfig(config: Config.IGameConfig) {
    this.config = config;
    this.newGame();
  }

  @action
  newGame() {
    this.game = new Game(this.config);
  }
}
