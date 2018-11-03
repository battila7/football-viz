var makeGradient = (function gradientIIFE() {
    const GRADIENT_ID = 'shot-gradient';

    return function makeGradient(styleOptions, dataset) {
        const container = d3.select(styleOptions.selector)
            .append('svg')
            .attr('width', styleOptions.width)
            .attr('height', styleOptions.height);

        addGradient(container, dataset);

        container.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', styleOptions.width)
            .attr('height', styleOptions.height)
            .style('fill', `url(#${GRADIENT_ID})`)
            .style('fill-opacity', `1`)
    };

    function addGradient(container, dataset) {
        const defs = container.append('defs');

        const gradient = defs.append('linearGradient')
            .attr('id', GRADIENT_ID)
            .attr('x1', '0%')
            .attr('x2', '0%')
            .attr('y1', '0%')
            .attr('y2', '100%');

        [['ownHalf', '0%'], ['leftFlank', '50%'], ['box', '100%']]
            .map(([region, percentage]) => [dataset[region], percentage])
            .forEach(([data, percentage]) => addGradientStop(gradient, data, percentage));
    }

    function addGradientStop(gradient, data, percentage) {
        const colorString = toColorString(dataToColor(data.off, data.goal, data.saved));

        gradient.append('stop')
            .attr('offset', percentage)
            .attr('stop-color', colorString)
            .attr('stop-opacity', 1);
    }
})();
