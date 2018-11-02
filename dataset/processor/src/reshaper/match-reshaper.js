const reshapeEvent = require('./event-reshaper');

function idReshaper({ match_id }) {
    return { 
        id: match_id
    };
};

function dateReshaper({ match_date, kick_off }) {
    return {
        date: match_date,
        time: kick_off
    };
};

function teamReshaper({ home_team, away_team }) {
    return {
        teams: {
            home: home_team.home_team_name,
            away: away_team.away_team_name
        }
    };
};

function scoreReshaper({ home_score, away_score }) {
    return {
        score: {
            home: home_score,
            away: away_score
        }
    };
};

function eventReshaper({ events }) {
    const reshapedEvents = events.map(reshapeEvent);

    return {
        events: reshapedEvents
    };
}

const matchReshapers = [
    idReshaper,
    dateReshaper,
    teamReshaper,
    scoreReshaper,
    eventReshaper
];

module.exports = function reshapeMatch(match) {
    const properties = matchReshapers.map(f => f(match));

    return Object.assign({}, ...properties);
};