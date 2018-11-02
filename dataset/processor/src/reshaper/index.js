const path = require('path');
const { writeFileSync, readFileSync, readdirSync } = require('fs');

const { sourceDirectory, destinationDirectory } = require('./args');
const reshapeMatch = require('./match-reshaper');

(function main() {
    const files = readdirSync(sourceDirectory);

    files
        .map(loadFile)
        .map(reshapeMatch)
        .forEach(writeToFile);
})();

function loadFile(filename) {
    return JSON.parse(readFileSync(toSourceFile(filename)));
}

function writeToFile(match) {
    const filename = toDestinationFile(match);

    const contents = JSON.stringify(match);

    writeFileSync(filename, contents);
};

function toSourceFile(filename) {
    return path.join(sourceDirectory, filename);
};

function toDestinationFile({ teams, date }) {
    return path.join(destinationDirectory, `${date}_${teams.home}_${teams.away}.json`);
};
