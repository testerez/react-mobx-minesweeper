import {observable} from 'mobx';


export default class Square{
  @observable position: number;
  @observable hasMine: boolean;
  @observable isRevealed: boolean = false;
  @observable isFlagged: boolean = false;

  constructor(
    position: number,
    hasMine: boolean,
    isRevealed: boolean = false,
    isFlagged: boolean = false
  ){
    this.position = position;
    this.hasMine = hasMine;
    this.isRevealed = isRevealed;
    this.isFlagged = isFlagged;
  }
}
