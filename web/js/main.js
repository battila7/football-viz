(function mainIIFE() {
    downloadDataset()
        .then(dataset => {
            makePitch(pitchStyle, dataset);
            //makeGradient(gradientStyle, dataset);
        });

    var pitchStyle = {
        selector: '.visualization-container',
        width: '100%',
        height: '100%',
        lineColor: '#e6cd63',
        lineWidth: 0.2,
        grassColor: '#000000'
    };

    var gradientStyle = {
        selector: '.gradient-panel',
        width: '100%',
        height: '100%',
    };

    function downloadDataset() {
        return fetch('data/out-final.json')
            .then(response => response.json())
    }
})();
