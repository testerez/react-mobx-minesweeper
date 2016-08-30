import Box from './Box';
import {chain, range, every} from 'lodash';
import {IGameConfig} from './Config';
import {observable, action} from 'mobx';

export default class Game {
  @observable isWon = false;
  @observable isLost = false;
  @observable boxes: Box[];

  isOver() {
    return this.isWon || this.isLost;
  }

  constructor(
    public config: IGameConfig,
    boxes: Box[] | null = null
  ) {
    const {
      width,
      height,
      mines,
    } = config;

    if (!boxes) {
      boxes = chain(range(0, width * height))
        .map(i => i < mines)
        .shuffle()
        .map((hasMine, i) => new Box(i, hasMine))
        .value();
    } else if (boxes.length !== config.width * config.height) {
      throw new Error('Invalid boxes length');
    }
    this.boxes = boxes;
  }

  @action
  private revealArround(position: number) {
    if (this.getAreaMinesCount(position)) {
      return;
    }
    this.getAreaboxes(position)
      .filter(s => !s.isRevealed)
      .forEach(s => {
        s.isRevealed = true;
        this.revealArround(s.position);
      });
  }

  @action
  reveal(position: number) {
    if (this.isOver()) {
      return;
    }
    const box = this.boxes[position];

    action(() => {


      box.isRevealed = true;

      // You loose?
      if (box.hasMine) {
        this.isLost = true;
        return;
      }

      this.revealArround(position);

      // You win?
      this.isWon = every(this.boxes, s =>
        s.isRevealed === !s.hasMine
      );
    })();
  }



  getAreaboxes(centerPosition: number) {
    const {width, height} = this.config;
    const {x, y} = this.positionToXy(centerPosition);

    const xMin = Math.max(0, x - 1);
    const xMax = Math.min(width - 1, x + 1);
    const yMin = Math.max(0, y - 1);
    const yMax = Math.min(height - 1, y + 1);

    const result: Box[] = [];
    for (let x2 = xMin; x2 <= xMax; x2 += 1) {
      for (let y2 = yMin; y2 <= yMax; y2 += 1) {
        result.push(this.getBox(x2, y2));
      }
    }
    return result;
  }

  getAreaMinesCount(centerPosition: number) {
    return this.getAreaboxes(centerPosition)
      .filter(box => box.hasMine)
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
    const {width} = this.config;
    return {
      x: position % width,
      y: Math.floor(position / width),
    };
  }

  getBox(x: number, y: number) {
    return this.boxes[
      this.xyToPosition(x, y)
    ];
  }

  getLines() {
    const {width, height} = this.config;
    return range(0, height).map(y => {
      const start = y * width;
      return this.boxes.slice(start, start + width);
    });
  }
}
