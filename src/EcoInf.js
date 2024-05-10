import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const EcoInf = ({ data, width, height }) => {
    const svgRef = useRef();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    useEffect(() => {
        if (!data) return;

        const svg = d3.select(svgRef.current);

        svg.style('fill', '#f00840')

        // Create scales
        const xScale = d3.scaleLinear()
            .domain([0, 1])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, 1])
            .range([innerHeight, 0]);

        const xAxis = d3.axisBottom(xScale)
            .tickValues([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);

        svg.select('.x-axis')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(xAxis)
            .style('stroke', '#f00840');

        const yAxis = d3.axisLeft(yScale).tickValues([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]);
        svg.select('.y-axis')
            .attr('transform', `translate(0, 0)`)
            .call(yAxis)
            .style('stroke', '#f00840');

        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width/2)
            .attr("y", height - 6)
            .text("Support for Bob");

        svg.select('.y-axis-label')
            .attr('transform', `rotate(-90) translate(${-innerHeight / 2}, ${-margin.left + 20})`)
            .text("Probability Density");

        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", 6)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Probability Density");

        data.forEach(dataset => {
            const area = d3.area()
                .curve(d3.curveBasis)
                .x(d => xScale(d.x))
                .y0(innerHeight)
                .y1(d => yScale(d.value));

            svg.append("path")
                .datum(dataset.values)
                .attr("fill", dataset.color)
                .attr("opacity", "0.38")
                .attr("d", area);
        });

    }, [data, width, height]);

    return (
        <svg ref={svgRef} width={width} height={height}>
            <g className="plot-area" transform={`translate(${margin.left}, ${margin.top})`}>
                <path className="density-area" fill="steelblue" />
                <g className="x-axis" />
                <g className = "y-axis" />
            </g>
        </svg>
    );
};
export default EcoInf;
