"use strict";
var Square_1 = require('./Square');
var lodash_1 = require('lodash');
var MinesGame = (function () {
    function MinesGame(width, height, squares) {
        this.width = width;
        this.height = height;
        this.squares = squares;
        this.isWon = false;
        this.isLost = false;
        this.minesCount = 0;
        if (squares.length != width * height) {
            throw new Error('Invalid squares length');
        }
        this.minesCount = squares
            .filter(function (s) { return s.hasMine; })
            .length;
    }
    MinesGame.prototype.reveal = function (position) {
        var square = this.squares[position];
        square.isRevealed = true;
        if (square.hasMine) {
            this.isLost = true;
            return;
        }
        this.isWon = lodash_1.every(this.squares, function (s) {
            return s.isRevealed == !s.hasMine;
        });
    };
    MinesGame.create = function (width, heigth, minesCount) {
        var squares = lodash_1.chain(lodash_1.range(0, width * heigth))
            .map(function (i) { return i < minesCount; })
            .shuffle()
            .map(function (hasMine, i) { return new Square_1["default"](i, hasMine); })
            .value();
        return new MinesGame(width, heigth, squares);
    };
    MinesGame.prototype.getAreaSquares = function (centerPosition) {
        var _a = this.positionToXy(centerPosition), x = _a.x, y = _a.y;
        var xMin = Math.max(0, x - 1);
        var xMax = Math.min(this.width - 1, x + 1);
        var yMin = Math.max(0, y - 1);
        var yMax = Math.min(this.height - 1, y + 1);
        var result = [];
        for (var x2 = xMin; x2 <= xMax; x2++) {
            for (var y2 = yMin; y2 <= yMax; y2++) {
                result.push(this.getSquare(x2, y2));
            }
        }
        return result;
    };
    MinesGame.prototype.getAreaMinesCount = function (centerPosition) {
        return this.getAreaSquares(centerPosition)
            .filter(function (square) { return square.hasMine; })
            .length;
    };
    MinesGame.prototype.xyToPosition = function (x, y) {
        if (x < 0 || x > this.width - 1) {
            throw new Error("x is out of bound: " + x);
        }
        if (y < 0 || y > this.height - 1) {
            throw new Error("y is out of bound: " + y);
        }
        return y * this.width + x;
    };
    MinesGame.prototype.positionToXy = function (position) {
        return {
            x: position % this.width,
            y: Math.floor(position / this.width)
        };
    };
    MinesGame.prototype.getSquare = function (x, y) {
        return this.squares[this.xyToPosition(x, y)];
    };
    // For tests only
    MinesGame.prototype._getSquares = function () {
        return this.squares;
    };
    return MinesGame;
}());
exports.__esModule = true;
exports["default"] = MinesGame;
//# sourceMappingURL=Game.js.map