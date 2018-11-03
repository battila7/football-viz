(function mainIIFE() {
    downloadDataset()
        .then(dataset => makePitch(pitchStyle, dataset));

    var pitchStyle = {
        selector: 'body',
        width: '1150px',
        height: '780px',
        lineColor: '#FFFFFF',
        lineWidth: 5,
        grassColor: "#A1C349"
    };

    function downloadDataset() {
        return fetch('data/shots.json')
            .then(response => response.json())
    }
})();
