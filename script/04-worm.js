Worm = function (game) {
    this.game = game;
    this.sections = [];
    this.sections.push(this.game.grid.getStartCell());
    this.head.beWorm();
    this.directionQueue = [2];
    this.currentDirection = 2;
    this.previousDirection = 2;
    this.directionFuncs = {};
    this.mapKeys();
}

Worm.prototype.update = function () {
    let nextCell = this.getNextCell();

    if (nextCell.isDeadly)
        this.game.gameOver();

    else if (nextCell.isFood) {
        this.moveHeadTo(nextCell);
        this.game.scoreUp(this.length);
    }
    else {
        this.moveHeadTo(nextCell);
        this.moveTail();
    }
}

Worm.prototype.moveHeadTo = function (nextHeadCell) {
    this.sections.unshift(nextHeadCell);
    this.head.beWorm();
}

Worm.prototype.moveTail = function () {
    this.tail.beBlank();
    this.sections.splice(-1, 1);
}

Worm.prototype.getNextCell = function () {
    if (this.directionQueue.hasAny)
        this.currentDirection = this.directionQueue.takeFirstOut();
    return this.game.grid.getNextCell(this);
}

Worm.prototype.die = function () {
    this.sections.forEach(function (section) { section.beObstacle(); });
}

Worm.prototype.mapKeys = function () {
    let me = this;
    for (let directionName in directionEnum) {
        let directionCode = directionEnum[directionName];
        this.directionFuncs[directionCode] = function () {
            if (me.shouldIgnoreDirection(directionCode))
                return;
            me.directionQueue.push(directionCode);
            me.previousDirection = directionCode;
        };
    }
}

Worm.prototype.shouldIgnoreDirection = function (dirCode) {
    if (dirCode === this.previousDirection)
        return true;
    if (this.isMulticellular && dirCode === oppositeDirectionEnum[this.previousDirection]) // No backwards moving
        return true;
}

Object.defineProperties(Worm.prototype, {
    head: { get: function () { return this.sections[0] } },
    tail: { get: function () { return this.sections.last } },
    length: { get: function () { return this.sections.length } },
    isUnicellular: { get: function () { return this.length === 1 } },
    isMulticellular: { get: function () { return this.length !== 1 } },
});