import Box from './Box';
import { expect } from 'chai';
import Game from "./Game";

function createGame(layout: string[]){
    const boxes = layout
        .join(' ')
        .split(' ')
        .map((s, i) => new Box(i, s == 'x'));

    return new Game(
      {
        width: layout[0].split(' ').length,
        height: layout.length,
        mines: boxes.filter(s => s.hasMine).length,
      },
      boxes
    );
}

describe('MinesGame', () => {
    it('can\'t create invalid board', () => {
        expect(createGame.bind(null, [
            'x o o x o',
            'o o x x x',
            'o o x o',
            'o x x o 0',
        ])).to.throw();

        expect(createGame.bind(null, [
            'x o o x o',
            'o o x x x o',
            'o x x o 0',
        ])).to.throw();
    });

    it('creates a 1x1 board', () => {
      const game = new Game({
        width:1,
        height:1,
        mines:1,
      });
      expect(game.boxes.length).to.equal(1);
      expect(game.boxes[0].hasMine).to.be.true;
    });

    it('creates a 1x1 board with no mine', () => {
        const game = new Game({
        width:1,
        height:1,
        mines:0,
      });
      expect(game.boxes.length).to.equal(1);
      expect(game.boxes[0].hasMine).to.be.false;
    });

    it('creates a 100x100 board', () => {
      const game = new Game({
        width:100,
        height:100,
        mines:100,
      });
      expect(game.boxes.length).to.equal(100*100);
      expect(game.config.mines).to.equal(100);
    });

    it('counts surrounding mines', () => {
        const game = createGame([
            'x o o x o',
            'o o x x x',
            'o o x o x',
            'o x x o 0',
        ]);

        const checkCount = (x:number, y:number, expected:number) => {
            const position = game.getBox(x, y).position;
            expect(game.getAreaMinesCount(position)).to.equals(expected);
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
        expect(game.isWon).to.be.false;
        expect(game.isLost).to.be.false;
        [1, 2, 3, 4, 6, 7].forEach(i => game.reveal(i));
        expect(game.isWon).to.be.true;
        expect(game.isLost).to.be.false;
    });

    it('looses', () => {
        const game = createGame([
            'x o o',
            'o o x',
            'o o x',
        ]);
        expect(game.isWon).to.be.false;
        expect(game.isLost).to.be.false;
        game.reveal(0);
        expect(game.isWon).to.be.false;
        expect(game.isLost).to.be.true;
    });

    it('gets lines', () => {
        const game = new Game({
          width:5,
          height:10,
          mines:10,
        });
        const lines = game.getLines();
        expect(lines.length).to.eq(10);
        lines.forEach(l => expect(l.length).to.eq(5));
    });
});
