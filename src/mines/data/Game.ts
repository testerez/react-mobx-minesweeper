import Square from './Square';
import {chain, range, every} from 'lodash';

export default class MinesGame {
    isWon = false;
    isLost = false;
    minesCount = 0;

    constructor(
      public width: number,
      public height: number,
      public squares: Square[]
    ){
      if(squares.length != width * height){
        throw new Error('Invalid squares length');
      }
      this.minesCount = squares
        .filter(s => s.hasMine)
        .length;
    }

    reveal(position:number){
        const square = this.squares[position];
        square.isRevealed = true;
        if(square.hasMine){
            this.isLost = true;
            return;
        }
        this.isWon = every(this.squares, s =>
            s.isRevealed == !s.hasMine
        );
    }

    static create(
      width: number,
      heigth: number,
      minesCount: number
    ) {
        const squares = chain(range(0, width * heigth))
          .map(i => i < minesCount)
          .shuffle()
          .map((hasMine, i) => new Square(i, hasMine))
          .value();
        return new MinesGame(width, heigth, squares);
    }

    getAreaSquares(centerPosition:number){
        const {x, y} = this.positionToXy(centerPosition);
        const xMin = Math.max(0, x - 1);
        const xMax = Math.min(this.width - 1, x + 1);
        const yMin = Math.max(0, y - 1);
        const yMax = Math.min(this.height - 1, y + 1);

        const result:Square[] = [];
        for(let x2 = xMin; x2 <= xMax; x2++){
            for(let y2 = yMin; y2 <= yMax; y2++) {
                result.push(this.getSquare(x2, y2));
            }
        }
        return result;
    }

    getAreaMinesCount(centerPosition:number){
      return this.getAreaSquares(centerPosition)
        .filter(square => square.hasMine)
        .length;
    }

    xyToPosition(x:number, y:number){
        if(x < 0 || x > this.width - 1){
            throw new Error(`x is out of bound: ${x}`);
        }
        if(y < 0 || y > this.height - 1){
            throw new Error(`y is out of bound: ${y}`);
        }
        return y * this.width + x;
    }

    positionToXy(position:number){
        return {
            x: position % this.width,
            y: Math.floor(position/this.width),
        };
    }

    getSquare(x:number, y:number){
        return this.squares[
            this.xyToPosition(x, y)
        ];
    }

    // For tests only
    public _getSquares(){
      return this.squares;
    }
}
