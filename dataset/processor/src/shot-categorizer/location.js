function isInRectangle(topLeft, bottomRight, point) {
    return (topLeft[0] <= point[0]) && (bottomRight[0] >= point[0]) &&
        (topLeft[1] <= point[1]) && (bottomRight[1] >= point[1]);
};

const rectangles = {
    'ownHalf': {
        topLeft: [0, 0],
        bottomRight: [60, 80]
    },
    'farEnemyHalf': {
        topLeft: [60, 0],
        bottomRight: [90, 80]
    },
    'rightFlank': {
        topLeft: [90, 0],
        bottomRight: [120, 18]
    },
    'mid': {
        topLeft: [90, 18],
        bottomRight: [102, 62]
    },
    'leftFlank': {
        topLeft: [90, 62],
        bottomRight: [120, 80]
    },
    'rightFlank16': {
        topLeft: [102, 18],
        bottomRight: [120, 30]
    },
    'mid16': {
        topLeft: [102, 30],
        bottomRight: [114, 50]
    },
    'leftFlank16': {
        topLeft: [102, 50],
        bottomRight: [120, 62]
    },
    'box': {
        topLeft: [114, 30],
        bottomRight: [120, 50]
    }
};

module.exports = function categorizeShotLocation(shot) {
    let startLocation = 'unknown';

    for (const value of Object.keys(rectangles)) {
        if (isInRectangle(rectangles[value].topLeft, rectangles[value].bottomRight, shot.startLocation)) {
            startLocation = value;
            break;
        }
    }

    return Object.assign({}, shot, { startLocation });
};
