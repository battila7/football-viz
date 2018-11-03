(function mainIIFE() {
    downloadDataset()
        .then(dataset => makePitch(pitchStyle, dataset));

    var pitchStyle = {
        selector: '.visualization-container',
        width: '100%',
        height: '100%',
        lineColor: '#FFFFFF',
        lineWidth: 5,
        grassColor: "#A1C349"
    };

    function downloadDataset() {
        return fetch('data/shots.json')
            .then(response => response.json())
    }
})();
