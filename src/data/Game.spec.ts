import Game from './Game';
import { createGame } from '../testHelper';


describe('MinesGame', () => {
  it('can\'t create invalid board', () => {
    expect(createGame.bind(null, [
      'x o o x o',
      'o o x x x',
      'o o x o',
      'o x x o 0',
    ])).toThrow();

    expect(createGame.bind(null, [
      'x o o x o',
      'o o x x x o',
      'o x x o 0',
    ])).toThrow();
  });

  it('creates a 1x1 board', () => {
    const game = new Game({
      width: 1,
      height: 1,
      mines: 1,
      name: 'custom',
    });
    expect(game.boxes.length).toEqual(1);
    expect(game.boxes[0].hasMine).toEqual(true);
  });

  it('creates a 1x1 board with no mine', () => {
    const game = new Game({
      width: 1,
      height: 1,
      mines: 0,
      name: 'custom',
    });
    expect(game.boxes.length).toEqual(1);
    expect(game.boxes[0].hasMine).toEqual(false);
  });

  it('creates a 100x100 board', () => {
    const game = new Game({
      width: 100,
      height: 100,
      mines: 100,
      name: 'custom',
    });
    expect(game.boxes.length).toEqual(100 * 100);
    expect(game.config.mines).toEqual(100);
  });

  it('counts surrounding mines', () => {
    const game = createGame([
      'x o o x o',
      'o o x x x',
      'o o x o x',
      'o x x o 0',
    ]);

    const checkCount = (x: number, y: number, expected: number) => {
      const position = game.getBox(x, y).position;
      expect(game.getAreaMinesCount(position)).toEqual(expected);
    };

    checkCount(0, 0, 1);
    checkCount(4, 3, 1);
    checkCount(4, 0, 3);
    checkCount(0, 3, 1);
    checkCount(4, 1, 4);
    checkCount(2, 1, 4);
  });

  it('wins', () => {
    const game = createGame([
      'x o o',
      'o o x',
      'o o x',
    ]);
    expect(game.isWon).toEqual(false);
    expect(game.isLost).toEqual(false);
    [1, 2, 3, 4, 6, 7].forEach(i => game.reveal(i));
    expect(game.isWon).toEqual(true);
    expect(game.isLost).toEqual(false);
  });

  it('looses', () => {
    const game = createGame([
      'x o o',
      'o o x',
      'o o x',
    ]);
    expect(game.isWon).toEqual(false);
    expect(game.isLost).toEqual(false);
    game.reveal(0);
    expect(game.isWon).toEqual(false);
    expect(game.isLost).toEqual(true);
  });

  it('gets lines', () => {
    const game = new Game({
      width: 5,
      height: 10,
      mines: 10,
      name: 'custom',
    });
    const lines = game.getLines();
    expect(lines.length).toEqual(10);
    lines.forEach(l => expect(l.length).toEqual(5));
  });
});
