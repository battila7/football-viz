function idReshaper({ id }) {
    return { 
        id
    };
};

function timeReshaper({ index, timestamp, minute, second }) {
    return {
        index,
        time: {
            timestamp,
            minute,
            second
        }
    };
};

function teamReshaper({ team, player }) {
    return {
        team: team.name,
        player: player.name
    };
};

function locationReshaper({ location }) {
    return {
        startLocation: location
    };
};

function shotReshaper({ shot }) {
    return {
        endLocation: shot.end_location,
        outcome: shot.outcome.name
    }
}

const eventReshapers = [
    idReshaper,
    timeReshaper,
    teamReshaper,
    locationReshaper,
    shotReshaper
];

module.exports = function reshapeEvent(event) {
    const properties = eventReshapers.map(f => f(event));

    return Object.assign({}, ...properties);
};
