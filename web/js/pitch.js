var makePitch = (function pitchIIFE() {
    const regions = {
        ownHalf: {
            x: 50,
            y: 50,
            width: 525,
            height: 680
        },
        farEnemyHalf: {
            x: 575,
            y: 50,
            width: 262.5,
            height: 680
        },
        rightFlank: {
            x: 837.5,
            y: 50,
            width: 262.5,
            height: 138.5
        },
        mid: {
            x: 837.5,
            y: 188.5,
            width: 97.5,
            height: 403
        },
        leftFlank: {
            x: 837.5,
            y: 591.5,
            width: 262.5,
            height: 138.5
        },
        rightFlank16: {
            x: 935,
            y: 188.5,
            width: 165,
            height: 110
        },
        mid16: {
            x: 935,
            y: 298.5,
            width: 110,
            height: 183
        },
        leftFlank16: {
            x: 935,
            y: 481.5,
            width: 165,
            height: 110
        },
        box: {
            x: 1045,
            y: 298.5,
            width: 55,
            height: 183
        }
    };

    return function makePitch(styleOptions, dataset) {
        const container = d3.select(styleOptions.selector)
            .append('svg')
            .attr('width', styleOptions.width)
            .attr('height', styleOptions.height)
            .attr('viewBox', '0 0 1150 780');

        drawPitch(container, styleOptions);

        drawData(container, dataset);
    };

    function drawData(container, dataset) {
        Object.keys(dataset)
            .forEach(key => fillRegion(regions[key], dataset[key]));

        function fillRegion(region, data) {
            const colorString = toColorString(dataToColor(data.off, data.goal, data.saved));

            container.append('rect')
                    .attr('x', region.x)
                    .attr('y', region.y)
                    .attr('width', region.width)
                    .attr('height', region.height)
                    .style('fill', colorString)
                    .style('fill-opacity', '0.75');
        }
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
            .attr('height', 780)
            .attr('width', 1150)
            .style('fill', options.grassColor);
    
        // Pitch Outline
        emptyRectangle({ x: 50, y: 50, width: 1050, height: 680 });
        
        // Halves
        [[50, 50], [575, 50]]
            .forEach(([x, y]) => emptyRectangle({ x, y, width: 525, height: 680 }));
    
        // Center Circle
        container.append('circle')
            .attr('cx', 575)
            .attr('cy', 390)
            .attr('r', 91.5)
            .style('stroke-width', options.lineWidth)
            .style('stroke', options.lineColor)
            .style('fill', 'none');
    
        // Penalty Area Rectangles
        [[50, 188.5], [935, 188.5]]
            .forEach(([x, y]) => emptyRectangle({ x, y, width: 165, height: 403 }));
    
        // Six Yard Rectangles
        [[50, 298.5], [1045, 298.5]]
            .forEach(([x, y]) => emptyRectangle({ x, y, width: 55, height: 183 }));
        
        // Goalmouths
        [[25, 353.4], [1100, 353.4]]
            .forEach(([x, y]) => emptyRectangle({ x, y, width: 25, height: 73.2 }));
    
        // Penalty Spots
        [[160, 390], [990, 390]]
            .forEach(([cx, cy]) => filledCircle({ cx, cy, r: 5 }));
    
        // Center Spot
        filledCircle({ cx: 575, cy: 390, r: 5 });
      
        // Penalty Arcs
        const rightPenaltyArc = d3.arc()
            .innerRadius(89)
            .outerRadius(94)
            .startAngle(0.64)
            .endAngle(2.5);
    
        container.append('path')
            .attr('d', rightPenaltyArc)
            .attr('fill', options.lineColor)
            .attr('transform', 'translate(160,390)');
            
        const leftPenaltyArc = d3.arc()
            .innerRadius(89)
            .outerRadius(94)
            .startAngle(-0.64)
            .endAngle(-2.5);
        
        container.append('path')
            .attr('d', leftPenaltyArc)
            .attr('fill', options.lineColor)
            .attr('transform', 'translate(990,390)');
    
        // Corner Arcs
        const cornerArc = d3.arc()
            .innerRadius(20)
            .outerRadius(25)
            .startAngle(0)
            .endAngle(Math.PI / 2);
    
        [[90, 50, 50], [180, 1100, 50], [0, 50, 730], [270, 1100, 730]]
            .forEach(([alpha, cx, cy]) => {
                container.append('path')
                    .attr('d', cornerArc)
                    .attr('fill', options.lineColor)
                    .attr('transform', `rotate(${alpha} ${cx} ${cy}) translate(${cx} ${cy})`);
            });

        // Half Legends
        container.append('text')
            .attr('x', 50)
            .attr('y', 37.5)
            .attr('text-anchor', 'start')
            .attr('fill', 'white')
            .attr('font-family', 'Open Sans')
            .style('font-size', '2rem')
            .text('Saját térfél');

        container.append('text')
            .attr('x', '1100')
            .attr('y', 37.5)
            .attr('text-anchor', 'end')
            .attr('fill', 'white')
            .attr('font-family', 'Open Sans')
            .style('font-size', '2rem')
            .text('Ellenfél térfele');

        function emptyRectangle({ x, y, width, height }) {
            container.append('rect')
                .attr('x', x)
                .attr('y', y)
                .attr('width', width)
                .attr('height', height)
                .style('stroke-width', options.lineWidth)
                .style('stroke', options.lineColor)
                .style('fill', 'none');
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
