const path = require('path');
const { writeFileSync, readFileSync, readdirSync } = require('fs');

const outputPath = "out-final.json";
const inputDirectory = "data";

(function main() {
    const files = readdirSync(inputDirectory);

    const shots = files
        .map(loadFile)
        .reduce((acc, curr) => acc.concat(curr), [])
        .filter(event => event.type && event.type.name == "Shot")
        .map(event => {
            return {
                isGoal: event.shot.outcome.name == "Goal",
                startLocation: event.location
            }
        });

    const total = shots.length;
    const goalCount = shots.filter(shot => shot.isGoal).length;
    console.log(total);
    console.log(goalCount);
    console.log(goalCount / total);

    let rectangles = [];
    const boxSize = 2;

    for (let x = 0; x < 119; x += boxSize) {
        for (let y = 0; y < 80; y += boxSize) {
            rectangles.push({
                topLeft: [x, y],
                bottomRight: [x + boxSize, y + boxSize],
                shots: 0,
                goals: 0
            });
        }
    }

    shots.forEach(shot => {
        const rect = rectangles.find(rect => isInsideRectangle(rect, shot.startLocation));

        if (rect) {
            rect.shots++;

            if (shot.isGoal) {
                rect.goals++;
            }
        }
    })

    rectangles = rectangles.filter(rect => rect.goals > 0)

    rectangles.forEach(rect => {
        rect.relativeGoalRatio = rect.goals / rect.shots; 
    });

    let maxShots = 0;
    for (const rect of rectangles) {
        if (rect.shots > maxShots) {
            maxShots = rect.shots;
        }
    }

    rectangles.forEach(rect => {
        rect.absoluteGoalRatio = rect.goals / maxShots;
    });

    let rectShots = 0;
    let rectGoals = 0;
    rectangles.forEach(rect => {
        rectShots += rect.shots;
        rectGoals += rect.goals;
    })

    console.log(rectShots);
    console.log(rectGoals);

    writeFileSync(outputPath, JSON.stringify(rectangles, null, 2));
})();

function isInsideRectangle({ topLeft, bottomRight }, location ){
    return topLeft[0] <= location[0]
        && bottomRight[0] >= location[0]
        && topLeft[1] <= location[1]
        && bottomRight[1] >= location[1];
}

function loadFile(filename) {
    return JSON.parse(readFileSync(toSourceFile(filename)));
}

function loadFile(filename) {
    return JSON.parse(readFileSync(toSourceFile(filename)));
}

function toSourceFile(filename) {
    return path.join(inputDirectory, filename);
};

