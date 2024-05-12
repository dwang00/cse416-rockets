import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const EcoInf = ({ state, election }) => {
    const svgRef1 = useRef(null);
    const svgRef2 = useRef(null);
    const svgRef3 = useRef(null);
    const [combinedData, setCombinedData] = useState([]);
    const [can, setCan] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:8080/get_ecoInf/byStateAndElection?state=${state}&election=${election}`)
            .then(response => response.json())
            .then(data => {
                let newData;
                let candidate1;
                let candidate2;
                let candidate3;

                if (election === "Presidential") {
                    candidate1 = data[0].candidate
                    candidate2 = data[3].candidate
                    candidate3 = data[6].candidate

                    newData = [
                        data[0].data,
                        data[1].data,
                        data[2].data,
                        data[3].data,
                        data[4].data,
                        data[5].data,
                        data[6].data,
                        data[7].data,
                        data[8].data
                    ];
                } else if (election === "RepInCongress") {
                    candidate1 = data[9].candidate
                    candidate2 = data[12].candidate
                    candidate3 = data[15].candidate
                    newData = [
                        data[9].data,
                        data[10].data,
                        data[11].data,
                        data[12].data,
                        data[13].data,
                        data[14].data,
                        data[15].data,
                        data[16].data,
                        data[17].data
                    ];
                }
                setCombinedData(newData);
                setCan([candidate1, candidate2, candidate3])
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setCombinedData([]); // Clear data to prevent rendering errors
            });
    }, [state, election]);

    useEffect(() => {
        if (!combinedData || combinedData.length === 0) return;
        const plotsData = [];
        plotsData.push(combinedData.slice(0, 3))
        plotsData.push(combinedData.slice(3, 6))
        plotsData.push(combinedData.slice(6, 9))

        plotsData.forEach((data, index) => {
            const svg = d3.select([svgRef1.current, svgRef2.current, svgRef3.current][index]);
            const width = +svg.attr('width');
            const height = +svg.attr('height') -10;
            const margin = {top: 20, right: 30, bottom: 30, left: 40};

            const x = d3.scaleLinear()
                .domain([0, 1])
                .range([margin.left, width - margin.right]);

            const y = d3.scaleLinear()
                .domain([0, 40])
                .range([height - margin.bottom, margin.top]);

            svg.append('g')
                .attr('class', 'axis axis--x')
                .attr('transform', `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x).ticks(10).tickFormat(d3.format('.1f')));

            svg.append('g')
                .attr('class', 'axis axis--y')
                .attr('transform', `translate(${margin.left},0)`)
                .call(d3.axisLeft(y).ticks(10));
            svg.append('text')
                .attr('x', (width + margin.left + margin.right) / 2)
                .attr('y', height)
                .attr('text-anchor', 'middle')
                .text(`Support for ${can[index]}`)
                .attr('fill', '#000')

            renderPlot(svg, data[0], 'green')
            renderPlot(svg, data[1], 'orange')
            renderPlot(svg, data[2], 'blue')

            const legend = svg.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            const legendItems = ['caucasian', 'african american', 'other'];

            legend.selectAll('rect')
                .data(['green', 'orange', 'blue'])
                .enter()
                .append('rect')
                .attr('x', 0)
                .attr('y', (d, i) => i * 20)
                .attr('width', 10)
                .attr('height', 10)
                .attr('fill', d => d);

            legend.selectAll('text')
                .data(legendItems)
                .enter()
                .append('text')
                .attr('x', 20)
                .attr('y', (d, i) => i * 20 + 9)
                .text(d => d)
                .attr('fill', '#000')
                .style('font-size', '12px');
            function renderPlot(svg, data, color) {
                const n = data.length;
                const bins = d3.histogram().domain(x.domain()).thresholds(.01)(data);
                const density = kernelDensityEstimator(kernelEpanechnikov(.1), x.ticks(40))(data);

                svg.insert('g', '*')
                    .attr('fill', '#FFF')
                    .selectAll('rect')
                    .data(bins)
                    .enter().append('rect')
                    .attr('x', d => x(d.x0) + 1)
                    .attr('y', d => y(d.length / n))
                    .attr('width', d => x(d.x1) - x(d.x0) - 1)
                    .attr('height', d => y(0) - y(d.length / n))
                    .style('opacity', 0.4)

                svg.append('path')
                    .datum(density)
                    .attr('fill', 'none')
                    .attr('stroke', color)
                    .attr('stroke-width', 1.5)
                    .attr('stroke-linejoin', 'round')
                    .attr('d', d3.line()
                        .curve(d3.curveBasis)
                        .x(d => x(d[0]))
                        .y(d => y(d[1])));
            }
        });

    }, [combinedData]);

    function kernelDensityEstimator(kernel, X) {
        return function (V) {
            return X.map(x => [x, d3.mean(V, v => kernel(x - v))]);
        };
    }

    function kernelEpanechnikov(k) {
        return function (v) {
            const result = Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
            return result;
        };
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '0px' }}>
                <svg ref={svgRef1} width={620} height={230}></svg>
            </div>
            <div style={{ marginBottom: '0px' }}>
                <svg ref={svgRef2} width={620} height={230}></svg>
            </div>
            <div>
                <svg ref={svgRef3} width={620} height={230}></svg>
            </div>
        </div>
    );

};

export default EcoInf;
