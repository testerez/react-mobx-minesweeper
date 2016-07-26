import {observable} from 'mobx';


export default class{
  @observable position: number;
  @observable hasMine: boolean;
  @observable isRevealed = false;
  @observable isFlagged = false;

  constructor(
    position: number,
    hasMine: boolean,
  ) {
    this.position = position;
    this.hasMine = hasMine;
  }
}
