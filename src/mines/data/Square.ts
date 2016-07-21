
export default class Square{


  constructor(
    public position: number,
    public hasMine: boolean,
    public isRevealed: boolean = false,
    public isFlagged: boolean = false
  ){

  }
}
