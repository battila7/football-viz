(function mainIIFE() {
    downloadDataset()
        .then(dataset => makePitch(pitchStyle, dataset));

    var pitchStyle = {
        selector: '.visualization-container',
        width: '100%',
        height: '100%',
        lineColor: '#e6cd63',
        lineWidth: 0.2,
        grassColor: '#000000'
    };

    function downloadDataset() {
        return fetch('data/dataset.json')
            .then(response => response.json())
    }
})();
