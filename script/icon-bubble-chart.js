$(document).ready(() => {
    const width = 300;
    const height = 300;

    // setup the chart svg
    const svg = d3.select('.icon-bubble')
        .append('svg')
        .attr('height', height)
        .attr('width', width)
        .append('g')
        .attr('transform', 'translate(0, 0)');

    const simulation = d3.forceSimulation()
        .force('x', d3.forceX(width / 2).strength(0.05))
        .force('y', d3.forceY(height / 2).strength(0.05))
        .force('collide', d3.forceCollide(d => radiusScale(Math.sqrt(2) * d.score)))

    
    const radiusScale = d3.scaleSqrt().domain([20, 100]).range([10, 25])

    const onBubbleClick = (d) => {
        d.score *= 2;
        console.log('on click', d);
        simulation.force('hover-force', d3.forceCenter(d.x, d.y));
    };

    const onBubbleHover = (d) => {
        simulation.force('hover-force', d3.forceCenter(d.x, d.y));
        console.log('on hover');
    };

    // load the data and draw the data points
    d3.csv('/script/data.csv').then(dataPoints => {
        const circles = svg.selectAll('language')
            .data(dataPoints)
            .enter().append('image')
            .attr('href', d => `/images/tech-icons/${d.image}`)
            .attr('class', 'language')
            .attr('width', d => 2 * radiusScale(d.score) * Math.sqrt(1 / 2))
            .attr('height', d => 2 * radiusScale(d.score) * Math.sqrt(1 / 2))
            .on('click', (d) => {
                console.log('clicked ', d.image);
                const transformedData = dataPoints.map(dp => {
                    // deselect all the other ones
                    if (dp.doubled) {
                        return {
                            ...dp,
                            doubled: undefined,
                            score: dp.score / 2,
                        }
                    } else {
                        return dp
                    }
                }).map(dp => {
                    // check if image clicked on
                    if (dp.image === d.image) {
                        return {
                            ...dp,
                            doubled: true,
                            score: dp.score * 2,
                        }
                    }
                    else {
                        return dp
                    }
                } )
                simulation.force('x').initialize(transformedData);
                simulation.force('y').initialize(transformedData);
                simulation.force('collide').initialize(transformedData);
            })
            .on('hover', onBubbleHover);

        setTimeout(() => {
            const randStrength = Math.random() * 0.05;
            const middleScaleFactor = 0.5 + Math.random() * (0.2 - 0.1);

            //simulation.force('x').initialize(dataPoints)
            //simulation.force('y').initialize(dataPoints)
        }, 100);

        // update the circle positions when the simulation changes their positions
        simulation.nodes(dataPoints).on('tick', () => {
            circles.attr('transform', d => `translate(${d.x}, ${d.y})`)
        })
    });

});