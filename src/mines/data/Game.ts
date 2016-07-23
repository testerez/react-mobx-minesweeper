import Square from './Square';
import {chain, range, every} from 'lodash';
import {IGameConfig} from './Config';
import {observable, computed, action} from 'mobx';

export default class MinesGame {
  @observable isWon = false;
  @observable isLost = false;
  @observable squares: Square[];

  constructor(
    public config: IGameConfig,
    squares: Square[] | null = null
  ) {
    const {
      width,
      height,
      mines,
    } = config;

    if (!squares) {
      squares = chain(range(0, width * height))
        .map(i => i < mines)
        .shuffle()
        .map((hasMine, i) => new Square(i, hasMine))
        .value();
    } else if (squares.length != config.width * config.height) {
      throw new Error('Invalid squares length');
    }
    this.squares = squares;
  }

  private revealArround(position:number){
    if(this.getAreaMinesCount(position)){
      return;
    }
    this.getAreaSquares(position)
      .filter(s => !s.isRevealed)
      .forEach(s => {
        s.isRevealed = true;
        this.revealArround(s.position);
      });
  }

  @action
  reveal(position: number) {
    const square = this.squares[position];

    square.isRevealed = true;

    // You loose?
    if (square.hasMine) {
      this.isLost = true;
      this.squares.forEach(s => s.isRevealed = true);
      return;
    }

    this.revealArround(position);

    // You win?
    this.isWon = every(this.squares, s =>
      s.isRevealed == !s.hasMine
    );
  }



  getAreaSquares(centerPosition: number) {
    const {width, height} = this.config;
    const {x, y} = this.positionToXy(centerPosition);

    const xMin = Math.max(0, x - 1);
    const xMax = Math.min(width - 1, x + 1);
    const yMin = Math.max(0, y - 1);
    const yMax = Math.min(height - 1, y + 1);

    const result: Square[] = [];
    for (let x2 = xMin; x2 <= xMax; x2++) {
      for (let y2 = yMin; y2 <= yMax; y2++) {
        result.push(this.getSquare(x2, y2));
      }
    }
    return result;
  }

  getAreaMinesCount(centerPosition: number) {
    return this.getAreaSquares(centerPosition)
      .filter(square => square.hasMine)
      .length;
  }

  xyToPosition(x: number, y: number) {
    const {width, height} = this.config;

    if (x < 0 || x > width - 1) {
      throw new Error(`x is out of bound: ${x}`);
    }
    if (y < 0 || y > height - 1) {
      throw new Error(`y is out of bound: ${y}`);
    }
    return y * width + x;
  }

  positionToXy(position: number) {
    const {width, height} = this.config;
    return {
      x: position % width,
      y: Math.floor(position / width),
    };
  }

  getSquare(x: number, y: number) {
    return this.squares[
      this.xyToPosition(x, y)
    ];
  }

  getLines(){
    const {width, height} = this.config;
    return range(0, height).map(y => {
      const start = y * width;
      return this.squares.slice(start, start + width)
    });
  }
}
