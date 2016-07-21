import Grid from './Game';
import Square from './Square';
import { expect } from 'chai';
import Game from "./Game";

function createGame(layout: string[]){
    const squares = layout
        .join(' ')
        .split(' ')
        .map((s, i) => new Square(i, s == 'x'));

    return new Game(
        layout[0].split(' ').length,
        layout.length,
        squares
    );
}

describe('MinesGame', () => {
    it('can\'t create invalid grid', () => {
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

    it('creates a 1x1 grid', () => {
      const game = Game.create(1, 1, 1);
      expect(game._getSquares().length).to.equal(1);
      expect(game._getSquares()[0].hasMine).to.be.true;
    });

    it('creates a 1x1 grid with no mine', () => {
        const game = Grid.create(1, 1, 0);
        expect(game._getSquares().length).to.equal(1);
        expect(game._getSquares()[0].hasMine).to.be.false;
    });

    it('creates a 1000x1000 grid', () => {
        const game = Grid.create(1000, 1000, 100);
        expect(game._getSquares().length).to.equal(1000*1000);
        expect(game.minesCount).to.equal(100);
    });

    it('counts surrounding mines', () => {
        const game = createGame([
            'x o o x o',
            'o o x x x',
            'o o x o x',
            'o x x o 0',
        ]);

        const checkCount = (x:number, y:number, expected:number) => {
            const position = game.getSquare(x, y).position;
            expect(game.getAreaMinesCount(position)).to.equals(expected);
        };

        checkCount(0, 0, 1);
        checkCount(4, 3, 1);
        checkCount(4, 0, 3);
        checkCount(0, 3, 1);
        checkCount(4, 1, 4);
        checkCount(2, 1, 4);
    });

    it('can win', () => {
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

    it('can loose', () => {
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
});
