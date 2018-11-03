(function mainIIFE() {
    downloadDataset()
        .then(dataset => {
            makePitch(pitchStyle, dataset);
            makeGradient(gradientStyle, dataset);
        });

    var pitchStyle = {
        selector: '.visualization-container',
        width: '100%',
        height: '100%',
        lineColor: '#FFFFFF',
        lineWidth: 5,
        grassColor: '#3bba21'
    };

    var gradientStyle = {
        selector: '.gradient-panel',
        width: '100%',
        height: '100%',
    };

    function downloadDataset() {
        return fetch('data/shots.json')
            .then(response => response.json())
    }
})();
