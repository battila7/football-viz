const path = require('path');
const { writeFileSync, readFileSync, readdirSync } = require('fs');

const { sourceDirectory, destinationDirectory } = require('./args');

const outputFilename = path.join(destinationDirectory, 'shots.json');

(function main() {
    const files = readdirSync(sourceDirectory);

    const events = files
        .map(loadFile)
        .map(match => match.events)
        .reduce((acc, curr) => acc.concat(curr), [])
        .map(transformEvent);

    writeToFile(events);
})();

function loadFile(filename) {
    return JSON.parse(readFileSync(toSourceFile(filename)));
}

function transformEvent({ startLocation, outcome }) {
    return {
        startLocation,
        outcome
    };
}

function writeToFile(data) {
    const contents = JSON.stringify(data);

    writeFileSync(outputFilename, contents);
};

function toSourceFile(filename) {
    return path.join(sourceDirectory, filename);
};
