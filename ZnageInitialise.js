window.initialise = function(){
	window.gridHeight = 20;  // cells
	window.gridWidth = 20;  // cells
	window.movingTimeStep = 120;  // milliseconds
	window.movingTimeStepDecrement = 5;  // milliseconds
	window.minimumMovingTimeStep = 80;  // milliseconds
	window.feedingTimeStep = 3000;  // milliseconds
	window.keyCodeForUp = 'W'.charCodeAt(0);
	window.keyCodeForRight = 'D'.charCodeAt(0);
	window.keyCodeForDown = 'S'.charCodeAt(0);
	window.keyCodeForLeft = 'A'.charCodeAt(0);
	window.keyCodeForPause = ' '.charCodeAt(0);
	window.isPaused = false;
	window.debugMode = false;
	window.currentDirection = 2;
	window.lastDirectionCommand = 2;
	window.directions = [2];
    window.directionKeyCodeMapping = {};
	window.defineInitialKeyCodeMapping()
	window.initialiseElements()
	window.initialiseCrosshairs();
	window.initialiseSound();
	window.nextCellGettingFunctions = [
		function(){return window.grid.cells[window.worm.head.row - 1][window.worm.head.column]},
		function(){return window.grid.cells[window.worm.head.row][window.worm.head.column + 1]},
		function(){return window.grid.cells[window.worm.head.row + 1][window.worm.head.column]},
		function(){return window.grid.cells[window.worm.head.row][window.worm.head.column - 1]}
	];

};

window.bindEventHandlers = function(){
	window.theButton.onmousedown = start;
	window.onkeydown = function(keyDownEvent){
        window.directionKeyCodeMapping[keyDownEvent.keyCode]();
	};
	document.oncontextmenu = function(clickEvent){  // TODO: is this 'clickEvent' in the scope of 'window' ?
		clickEvent.preventDefault();
	};
	document.onmousedown = function(clickEvent) {
		if (window.debugMode && clickEvent.target.tagName == 'TD') {
			switch(clickEvent.which){
				case 1: clickEvent.target.beFood(); break;  // left click
				case 2: clickEvent.target.beNormal(); break;  // middle click
				case 3: clickEvent.target.beObstacle(); break;  // right click
				default: break;
			};
		};
	};
};

window.defineInitialKeyCodeMapping = function(){
    window.directionKeyCodeMapping[keyCodeForUp] = function(){window.directions.push(0); window.lastDirectionCommand = 0;};
    window.directionKeyCodeMapping[keyCodeForRight] = function(){window.directions.push(1); window.lastDirectionCommand = 1;};
    window.directionKeyCodeMapping[keyCodeForDown] = function(){window.directions.push(2); window.lastDirectionCommand = 2;};
    window.directionKeyCodeMapping[keyCodeForLeft] = function(){window.directions.push(3); window.lastDirectionCommand = 3;};
    window.directionKeyCodeMapping[keyCodeForPause] = function(){window.togglePause()};
};

window.defineSelfBiteAvoidingKeyCodeMapping = function(){
    window.directionKeyCodeMapping[keyCodeForUp] = function(){if(window.lastDirectionCommand % 2 != 0) {window.directions.push(0); window.lastDirectionCommand = 0;}};
    window.directionKeyCodeMapping[keyCodeForRight] = function(){if(window.lastDirectionCommand % 2 != 1) {window.directions.push(1); window.lastDirectionCommand = 1;}};
    window.directionKeyCodeMapping[keyCodeForDown] = function(){if(window.lastDirectionCommand % 2 != 0) {window.directions.push(2); window.lastDirectionCommand = 2;}};
    window.directionKeyCodeMapping[keyCodeForLeft] = function(){if(window.lastDirectionCommand % 2 != 1) {window.directions.push(3); window.lastDirectionCommand = 3;}};
};

window.definePausedKeyCodeMapping = function(){
    window.directionKeyCodeMapping[keyCodeForUp] = function(){};
    window.directionKeyCodeMapping[keyCodeForRight] = function(){};
    window.directionKeyCodeMapping[keyCodeForDown] = function(){};
    window.directionKeyCodeMapping[keyCodeForLeft] = function(){};
};

window.disableKeys = function(){
	window.definePausedKeyCodeMapping();
    window.directionKeyCodeMapping[keyCodeForPause] = function(){};
};
