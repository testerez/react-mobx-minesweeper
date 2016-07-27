import {Game, Box} from '../data';

export function createGame(layout: string[]) {
    const boxes = layout
        .join(' ')
        .split(' ')
        .map((s, i) => new Box(i, s === 'x'));

    return new Game(
      {
        width: layout[0].split(' ').length,
        height: layout.length,
        mines: boxes.filter(s => s.hasMine).length,
      },
      boxes
    );
}
