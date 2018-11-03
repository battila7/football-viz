var makePitch = (function pitchIIFE() {
    const regions = {
        ownHalf: {
            x: 50,
            y: 50,
            width: 525,
            height: 680,
            direction: 'right-left'
        },
        farEnemyHalf: {
            x: 575,
            y: 50,
            width: 262.5,
            height: 680,
            direction: 'top-bottom'
        },
        rightFlank: {
            x: 837.5,
            y: 50,
            width: 262.5,
            height: 138.5,
            direction: 'right-left'
        },
        mid: {
            x: 837.5,
            y: 188.5,
            width: 97.5,
            height: 403,
            direction: 'top-bottom'
        },
        leftFlank: {
            x: 837.5,
            y: 591.5,
            width: 262.5,
            height: 138.5,
            direction: 'right-left'
        },
        rightFlank16: {
            x: 935,
            y: 188.5,
            width: 165,
            height: 110,
            direction: 'right-left'
        },
        mid16: {
            x: 935,
            y: 298.5,
            width: 110,
            height: 183,
            direction: 'top-bottom'
        },
        leftFlank16: {
            x: 935,
            y: 481.5,
            width: 165,
            height: 110,
            direction: 'right-left'
        },
        box: {
            x: 1045,
            y: 298.5,
            width: 55,
            height: 183,
            direction: 'top-bottom'
        }
    };

    const outcomeFillColors = {
        goal: '#00aa75',
        saved: '#ffe632',
        off: '#f05360'   
    };

    const outcomeStrokeColors = {
        goal: '#00563B',
        saved: '#FEDF00',
        off: '#ED2939'
    };

    return function makePitch(styleOptions, dataset) {
        const container = d3.select(styleOptions.selector)
            .append('svg')
            .attr('width', styleOptions.width)
            .attr('height', styleOptions.height)
            .attr('viewBox', '0 0 1150 780');

        drawPitch(container, styleOptions);

        drawData(container, styleOptions, dataset);
    };

    function drawData(container, options, dataset) {
        function fillRegionTopBottom(region, data) {
            let yOffset = 0;

            for (const outcome of ['goal', 'saved', 'off']) {
                const height = region.height * data[outcome]; 

                container.append('rect')
                    .attr('x', region.x)
                    .attr('y', region.y + yOffset)
                    .attr('width', region.width)
                    .attr('height', height)
                    .style('stroke', outcomeStrokeColors[outcome])
                    .style('stroke-width', 2)
                    .style('stroke-opacity', '0.6')
                    .style('fill', outcomeFillColors[outcome])
                    .style('fill-opacity', '0.6');

                yOffset += height;
            }
        }

        function fillRegionRightLeft(region, data) {
            let xOffset = 0;

            for (const outcome of ['goal', 'saved', 'off']) {
                const width = region.width * data[outcome]; 

                container.append('rect')
                    .attr('x', region.x + xOffset)
                    .attr('y', region.y)
                    .attr('width', width)
                    .attr('height', region.height)
                    .style('stroke', outcomeStrokeColors[outcome])
                    .style('stroke-width', 2)
                    .style('stroke-opacity', '0.6')
                    .style('fill', outcomeFillColors[outcome])
                    .style('fill-opacity', '0.6');

                xOffset += width;
            }
        }
        for (const key of Object.keys(dataset)) {
            if (regions[key].direction == 'top-bottom') {
                fillRegionTopBottom(regions[key], dataset[key]);
            } else {
                fillRegionRightLeft(regions[key], dataset[key]);
            }
        }
    }

    function drawPitch(container, options) {
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
    };
})();
