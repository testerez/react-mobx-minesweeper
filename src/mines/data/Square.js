"use strict";
var Square = (function () {
    function Square(position, hasMine, isRevealed, isFlagged) {
        if (isRevealed === void 0) { isRevealed = false; }
        if (isFlagged === void 0) { isFlagged = false; }
        this.position = position;
        this.hasMine = hasMine;
        this.isRevealed = isRevealed;
        this.isFlagged = isFlagged;
    }
    return Square;
}());
exports.__esModule = true;
exports["default"] = Square;
//# sourceMappingURL=Square.js.map