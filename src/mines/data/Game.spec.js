"use strict";
var Game_1 = require('./Game');
var Square_1 = require('./Square');
var chai_1 = require('chai');
var Game_2 = require("./Game");
function createGame(layout) {
    var squares = layout
        .join(' ')
        .split(' ')
        .map(function (s, i) { return new Square_1["default"](i, s == 'x'); });
    return new Game_2["default"](layout[0].split(' ').length, layout.length, squares);
}
describe('MinesGame', function () {
    it('can\'t create invalid grid', function () {
        chai_1.expect(createGame.bind(null, [
            'x o o x o',
            'o o x x x',
            'o o x o',
            'o x x o 0',
        ])).to.throw();
        chai_1.expect(createGame.bind(null, [
            'x o o x o',
            'o o x x x o',
            'o x x o 0',
        ])).to.throw();
    });
    it('creates a 1x1 grid', function () {
        var game = Game_2["default"].create(1, 1, 1);
        chai_1.expect(game._getSquares().length).to.equal(1);
        chai_1.expect(game._getSquares()[0].hasMine).to.be.true;
    });
    it('creates a 1x1 grid with no mine', function () {
        var game = Game_1["default"].create(1, 1, 0);
        chai_1.expect(game._getSquares().length).to.equal(1);
        chai_1.expect(game._getSquares()[0].hasMine).to.be.false;
    });
    it('creates a 1000x1000 grid', function () {
        var game = Game_1["default"].create(1000, 1000, 100);
        chai_1.expect(game._getSquares().length).to.equal(1000 * 1000);
        chai_1.expect(game.minesCount).to.equal(100);
    });
    it('counts surrounding mines', function () {
        var game = createGame([
            'x o o x o',
            'o o x x x',
            'o o x o x',
            'o x x o 0',
        ]);
        var checkCount = function (x, y, expected) {
            var position = game.getSquare(x, y).position;
            chai_1.expect(game.getAreaMinesCount(position)).to.equals(expected);
        };
        checkCount(0, 0, 1);
        checkCount(4, 3, 1);
        checkCount(4, 0, 3);
        checkCount(0, 3, 1);
        checkCount(4, 1, 4);
        checkCount(2, 1, 4);
    });
    it('can win', function () {
        var game = createGame([
            'x o o',
            'o o x',
            'o o x',
        ]);
        chai_1.expect(game.isWon).to.be.false;
        chai_1.expect(game.isLost).to.be.false;
        [1, 2, 3, 4, 6, 7].forEach(function (i) { return game.reveal(i); });
        chai_1.expect(game.isWon).to.be.true;
        chai_1.expect(game.isLost).to.be.false;
    });
    it('can loose', function () {
        var game = createGame([
            'x o o',
            'o o x',
            'o o x',
        ]);
        chai_1.expect(game.isWon).to.be.false;
        chai_1.expect(game.isLost).to.be.false;
        game.reveal(0);
        chai_1.expect(game.isWon).to.be.false;
        chai_1.expect(game.isLost).to.be.true;
    });
});
//# sourceMappingURL=Game.spec.js.map