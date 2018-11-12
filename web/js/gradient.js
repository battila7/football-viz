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

        [['off', '0%'], ['saved', '50%'], ['goal', '100%']]
            .forEach(([outcome, percentage]) => addGradientStop(gradient, dataset, outcome, percentage));
    }

    function addGradientStop(gradient, dataset, outcome, percentage) {
        const max = dataset.reduce((acc, curr) => acc.shots[outcome] > curr.shots[outcome] ? acc : curr, { shots: { [outcome]: 0 } });

        const colorString = toColorString(dataToColor(max.shots.off, max.shots.goal, max.shots.saved));

        gradient.append('stop')
            .attr('offset', percentage)
            .attr('stop-color', colorString)
            .attr('stop-opacity', 1);
    }
})();
