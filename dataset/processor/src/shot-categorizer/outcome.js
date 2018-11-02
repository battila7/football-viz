const mappings = {
    'goal': ['Goal'],
    'saved': ['Blocked', 'Saved'],
    'off': ['Off T', 'Post', 'Wayward', 'Redirect']
};

module.exports = function categorizeShotOutcome(shot) {
    let outcome = 'unknown';

    for (const key of Object.keys(mappings)) {
        if (mappings[key].includes(shot.outcome)) {
            outcome = key;
            break;
        }
    }

    return Object.assign({}, shot, { outcome });
};
