const { writeFileSync, readFileSync } = require('fs');

const { sourceFile, destinationFile } = require('./args');

const UNKNOWN = 'unknown';

(function main() {
    const dataset = JSON.parse(readFileSync(sourceFile));

    const ratioDataset = Object.create(null);

    for (const key of Object.keys(dataset)) {
        if (key == UNKNOWN) {
            continue;
        }
        
        ratioDataset[key] = calculateRatios(dataset[key]);
    }

    writeToFile(ratioDataset);
})();

function calculateRatios(data) {
    const sum = Object.values(data).reduce((acc, curr) => acc + curr, 0);

    const ratioData = Object.create(null);

    for (const key of Object.keys(data)) {
        if (key == UNKNOWN) {
            continue;
        }

        ratioData[key] = data[key] / sum;
    }

    return ratioData;
};

function writeToFile(data) {
    const contents = JSON.stringify(data);

    writeFileSync(destinationFile, contents);
};
