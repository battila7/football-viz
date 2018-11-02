const { writeFileSync, readFileSync } = require('fs');

const { sourceFile, destinationFile } = require('./args');
const categorizeShotLocation = require('./location');
const categorizeShotOutcome = require('./outcome');

(function main() {
    const shots = JSON.parse(readFileSync(sourceFile));

    const categorizedShots = shots
        .map(categorizeShotLocation)
        .map(categorizeShotOutcome)

    writeToFile(categorizedShots);
})();

function writeToFile(data) {
    const contents = JSON.stringify(data);

    writeFileSync(destinationFile, contents);
};
