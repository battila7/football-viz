const path = require('path');
const { writeFileSync, readFileSync } = require('fs');

const { sourceDirectory, destinationDirectory } = require('./args');

const WORLD_CUP_MATCHES_FILE = path.join(sourceDirectory, 'data', 'matches', '43.json');

(function main() {
    const matches = JSON.parse(readFileSync(WORLD_CUP_MATCHES_FILE));

    matches
        .map(zipWithEvents)
        .map(mergeIntoSingleObject)
        .forEach(writeToFile);
})();

function zipWithEvents(match) {
    const events = JSON.parse(readFileSync(toSourceEventsFile(match.match_id)));

    return [match, events];
};

function mergeIntoSingleObject([match, events]) {
    return Object.assign({}, match, { events });
};

function writeToFile(match) {
    const filename = toDestinationFile(match);

    const contents = JSON.stringify(match);

    writeFileSync(filename, contents);
};

function toSourceEventsFile(id) {
    return path.join(sourceDirectory, 'data', 'events', `${id}.json`);
};

function toDestinationFile({ home_team, away_team, match_date}) {
    return path.join(destinationDirectory, `${match_date}_${home_team.home_team_name}_${away_team.away_team_name}.json`);
};
