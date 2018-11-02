const { writeFileSync, readFileSync } = require('fs');

const { sourceFile, destinationFile } = require('./args');

(function main() {
    const shots = JSON.parse(readFileSync(sourceFile));

    const aggregatedDataset = createEmptyAggregatedDataset();

    shots.forEach(shot => {
        const counts = aggregatedDataset[shot.startLocation];

        ++counts[shot.outcome];
    });

    writeToFile(aggregatedDataset);
})();

function createEmptyAggregatedDataset() {
    const locationNames = [
        'ownHalf',
        'farEnemyHalf',
        'rightFlank',
        'mid',
        'leftFlank',
        'rightFlank16',
        'mid16',
        'leftFlank16',
        'box',
        'unknown'
    ];

    const outcomeNames = [
        'goal',
        'saved',
        'off',
        'unknown'
    ];

    const dataset = Object.create(null);

    for (const location of locationNames) {
        const counts = Object.create(null);

        for (const outcome of outcomeNames) {
            counts[outcome] = 0;
        }

        dataset[location] = counts;
    }

    return dataset;
};

function writeToFile(data) {
    const contents = JSON.stringify(data);

    writeFileSync(destinationFile, contents);
};
