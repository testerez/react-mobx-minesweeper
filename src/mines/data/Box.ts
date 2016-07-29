import {observable, action} from 'mobx';
import {autobind} from 'core-decorators';

@autobind
export default class{
  @observable position: number;
  @observable hasMine: boolean;
  @observable isRevealed = false;
  @observable isFlagged = false;

  @action
  toggleFlag() {
    action(() => {
      this.isFlagged = !this.isFlagged;
    })();
  }

  constructor(
    position: number,
    hasMine: boolean,
  ) {
    this.position = position;
    this.hasMine = hasMine;
  }
}
