const path = require('path');
const { writeFileSync, readFileSync, readdirSync } = require('fs');

const { sourceDirectory, destinationDirectory } = require('./args');

(function main() {
    const files = readdirSync(sourceDirectory);

    files
        .map(loadFile)
        .map(filterEvents)
        .forEach(writeToFile);
})();

function loadFile(filename) {
    return JSON.parse(readFileSync(toSourceFile(filename)));
}

function filterEvents(match) {
    const SHOT_TYPE_NAME = 'Shot';

    const events = match.events
        .filter(e => e.type.name == SHOT_TYPE_NAME);

    return Object.assign({}, match, { events });
}

function writeToFile(match) {
    const filename = toDestinationFile(match);

    const contents = JSON.stringify(match);

    writeFileSync(filename, contents);
};

function toSourceFile(filename) {
    return path.join(sourceDirectory, filename);
};

function toDestinationFile({ home_team, away_team, match_date}) {
    return path.join(destinationDirectory, `${match_date}_${home_team.home_team_name}_${away_team.away_team_name}.json`);
};
