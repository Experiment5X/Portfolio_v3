$(document).ready(() => {
    const size = Math.min(window.innerHeight, window.innerWidth) * 0.4;
    const width = size;
    const height = size;

    // setup the chart svg
    const svg = d3.select('.icon-bubble')
        .append('svg')
        .attr('height', height)
        .attr('width', width)
        .append('g')
        .attr('transform', 'translate(0, 0)');

    const calcRadiusScale = () => d3.scaleSqrt().domain([20, 100]).range([size / 35 * 1.25, size / 35 * 3]);

    const simulation = d3.forceSimulation()
        .force('x', d3.forceX(width / 2).strength(0.05))
        .force('y', d3.forceY(height / 2).strength(0.05))
        .force('collide', d3.forceCollide(d => calcRadiusScale()(Math.sqrt(2) * d.score)));

    // load the data and draw the data points
    d3.csv('/script/data.csv').then(dataPoints => {
        const updateData = (data) => {
            const circles = svg.selectAll('.language')
                .data(data)
                .enter().append('image')
                .attr('href', d => `/images/tech-icons/${d.image}`)
                .attr('class', 'language')
                .attr('width', d => 2 * calcRadiusScale()(d.score) * Math.sqrt(1 / 2))
                .attr('height', d => 2 * calcRadiusScale()(d.score) * Math.sqrt(1 / 2))
                .on('click', (d) => languageClicked(d))

            // update the circle positions when the simulation changes their positions
            simulation.nodes(dataPoints).on('tick', () => {
                circles.attr('transform', d => `translate(${d.x}, ${d.y})`)
            });
        };

        const languageClicked = (d) => {
            const updatedDataPoints = dataPoints.map(dp => {
                if (dp.doubled) {
                    return {
                        ...dp,
                        doubled: undefined,
                        score: String(Number(dp.score) / 2)
                    }
                } else {
                    return dp
                }
            }).map(dp => {
                if (dp.image === d.image) {
                    return {
                        ...dp,
                        doubled: true,
                        score: String(dp.score * 2)
                    }
                } else {
                    return dp
                }
            });

            console.log(updatedDataPoints);
            updateData(updatedDataPoints);
            console.log('Clicked', d);
        }

        updateData(dataPoints);
    });

});