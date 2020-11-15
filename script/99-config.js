znakeConfig = {
    devMode: false,
    gridHeight: 20,  // cells
    gridWidth: 20,  // cells
    movingTimeStep: 120,  // milliseconds
    movingTimeStepDecrement: 5,  // milliseconds
    minimumMovingTimeStep: 70,  // milliseconds
    feedingTimeStep: 3000,  // milliseconds
    numberOfFoodCellsAtOnce: 1,
    startAtCentre: true,
    keys: {
        up: 'E',
        right: 'F',
        down: 'D',
        left: 'S',
        pause: ' ',
    },
    soundVolume: 0.15,  // [0~1]
    runMode: runModeEnum.manual,  // 0 = manual 1 = auto
}
