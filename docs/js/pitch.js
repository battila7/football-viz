var makePitch = (function pitchIIFE() {
    return function makePitch(styleOptions, dataset) {
        const container = d3.select(styleOptions.selector)
            .append('svg')
            .attr('width', styleOptions.width)
            .attr('height', styleOptions.height)
            .attr('viewBox', '0 0 100 70');

        const defs = container.append("defs");
        defs.append("filter")
              .attr("id", "blur")
              .attr('x', '-50%')
              .attr('y', '-50%')
              .attr('width', '400%')
              .attr('height', '400%')
            .append("feGaussianBlur")
              .attr('in', 'SourceGraphic')
              .attr("stdDeviation", 0.4)

        defs.append("filter")
                .attr("id", "selectionBlur")
                .attr('x', '-50%')
                .attr('y', '-50%')
                .attr('width', '200%')
                .attr('height', '200%')
            .append("feGaussianBlur")
                .attr('in', 'SourceGraphic')
                .attr("stdDeviation", 0.4)

        drawPitch(container, styleOptions);

        drawData(container, dataset);
    };

    function drawData(container, dataset) {
        const g = dataset.map(p => p.goals);
        g.sort((a, b) => a - b);
        g.pop();

        const smallCircle = d3.select("#small-circle-legend")
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 10 10'); 

        smallCircle.append('circle')
            .attr('cx', 5)
            .attr('cy', 5)
            .attr('r', 2.5)
            .style('stroke-width', 0)
            .style('fill', '#ffffff');

        const bigCircle = d3.select("#big-circle-legend")
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 10 10'); 

        bigCircle.append('circle')
            .attr('cx', 5)
            .attr('cy', 5)
            .attr('r', 5)
            .style('stroke-width', 0)
            .style('fill', '#ffffff');

        const blueCircle = d3.select("#blue-circle-legend")
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 10 10'); 

        blueCircle.append('circle')
            .attr('cx', 5)
            .attr('cy', 5)
            .attr('r', 5)
            .style('stroke-width', 0)
            .style('fill', interpolateColor(0));

        const purpleCircle = d3.select("#purple-circle-legend")
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 10 10'); 

            purpleCircle.append('circle')
            .attr('cx', 5)
            .attr('cy', 5)
            .attr('r', 5)
            .style('stroke-width', 0)
            .style('fill', interpolateColor(1));

        let maxGoals = 0;
        for (const place of dataset) {
            if (place.goals > maxGoals) {
                maxGoals = place.goals;
            }
        }

        for (const place of dataset) {
            place.gr = place.goals / g[g.length - 1];
        }

        for (const place of dataset) {
            const cx = Math.abs(place.topLeft[0] + 1 - 120);
            const cy = place.topLeft[1] + 1;

            let actualcx = cy + 10;
            let actualcy = cx + 10;

            let r;
            if (place.goals > g[g.length - 1]) {
                r = 1;
            } else {
                r = interpolateRadius(place.gr);
            }

            const cl = interpolateColor(place.relativeGoalRatio);

            place.r = r;
            place.cl = cl;

            container.append('circle')
                .attr('cx', actualcx)
                .attr('cy', actualcy)
                .attr('r', r)
                .style('stroke-width', 0)
                .style('fill', cl)
            
            const circ = container.append('circle')
                .attr('cx', actualcx)
                .attr('cy', actualcy)
                .attr('r', r)
                .style('stroke-width', 0)
                .style('fill', cl)
                .attr('filter', 'url(#blur)')

            circ.on('mouseover', circleMouseOver.bind(null, circ, place))
                .on('mouseleave', circleMouseLeave.bind(null, circ, place));
                
        }
    }

    function circleMouseOver(circ, place) {
        circ.attr('r', place.r * 2);
        document.getElementById('shots').textContent = `Lövések száma: ${place.shots}`;
        document.getElementById('goals').textContent = `Gólok száma: ${place.goals}`;
        document.getElementById('percent').textContent = `Gólok aránya: ${(place.relativeGoalRatio * 100).toFixed(2)}%` ;
    }

    function circleMouseLeave(circ, place) {
        circ.attr('r', place.r);
        document.getElementById('shots').textContent = ``;
        document.getElementById('goals').textContent = ``;
        document.getElementById('percent').textContent = ``;
    }

    function interpolateRadius(t) {
        const r1 = 0.15;
        const r2 = 0.75;

        return (r1 * (1 - t)) + (r2 * t);
    }

    function interpolateColor(t) {
        const r1 = 91, g1 = 234, b1 = 220;
        const r2 = 220, g2 = 0, b2 = 93;

        const r = (r2 - r1) * t + r1;
        const g = (g2 - g1) * t + g1;
        const b = (b2 - b1) * t + b1;

        return `rgb(${r} ${g} ${b})`;
    }

    /*
     * Forked from Ian Baldwin's football pitch block:
     * https://bl.ocks.org/balders93/98ff5f77b82eea28f47c72e1e256286d
     */
    function drawPitch(container, options) {    
        // Background Grass    
        container.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('height', 80) // 60 + 10
            .attr('width', 100) // 10 + 80 + 10
            .style('fill', options.grassColor);
    
        [[10, 10]]
            .forEach(([x, y]) => emptyRectangle({ x, y, width: 80, height: 60 }));

        // Penalty Area Rectangle
        [[28, 10]]
            .forEach(([x, y]) => emptyRectangle({ x, y, width: 44, height: 18 }));
    
        // Six Yard Rectangle
        [[40, 10]]
            .forEach(([x, y]) => emptyRectangle({ x, y, width: 20, height: 6 }));
        
        // Goalmouth
        [[46, 7]]
            .forEach(([x, y]) => emptyRectangle({ x, y, width: 8, height: 3 }));
    
        // Penalty Spot
        [[50, 22]]
            .forEach(([cx, cy]) => filledCircle({ cx, cy, r: 0.5 }));
      
        // Penalty Arc
        const rightPenaltyArc = d3.arc()
            .innerRadius(9)
            .outerRadius(9.2)
            .startAngle(-0.64)
            .endAngle(-2.5);
    
        container.append('path')
            .attr('d', rightPenaltyArc)
            .attr('fill', options.lineColor)
            .attr('transform', 'rotate(-90 0 0) translate(-22.5,50)');

        const centerCircle = d3.arc()
            .innerRadius(9)
            .outerRadius(9.2)
            .startAngle(0)
            .endAngle(3.14);
    
        container.append('path')
            .attr('d', centerCircle)
            .attr('fill', options.lineColor)
            .attr('transform', 'rotate(-90 0 0) translate(-70,50)');
            

        function emptyRectangle({ x, y, width, height }) {
            container.append('rect')
                .attr('x', x)
                .attr('y', y)
                .attr('width', width)
                .attr('height', height)
                .style('stroke-width', options.lineWidth)
                .style('stroke', options.lineColor)
                .style('fill', 'none')
        }
    
        function filledCircle({ cx, cy, r }) {
            container.append('circle')
                .attr('cx', cx)
                .attr('cy', cy)
                .attr('r', r)
                .style('fill', options.lineColor)
        }
    };
})();
