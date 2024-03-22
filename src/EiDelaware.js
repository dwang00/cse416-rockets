import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const EiDelaware = ({ data, width, height }) => {
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
            .domain([0, d3.max(data.flatMap(d => d.values), d => d.value)])
            .range([innerHeight, 0]);


        // Create x-axis
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

        // Add y-axis label
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
            // Create an area generator
            const area = d3.area()
                .curve(d3.curveBasis) // Applies a smooth curve through the points
                .x(d => xScale(d.x)) // x-coordinate mapping
                .y0(innerHeight) // Bottom line of the area (constant value for the baseline)
                .y1(d => yScale(d.value)); // Top line of the area (variable value)

            // Append the area to the SVG
            svg.append("path")
                .datum(dataset.values) // Bind data to the path
                .attr("fill", dataset.color) // Use the color specified in the dataset
                .attr("opacity", "0.38")
                .attr("d", area); // Use the area generator to create the "d" attribute
        });
        /*
        // Create area generator
        const kde = kernelDensityEstimator(kernelEpanechnikov(7), xScale.ticks(60));

        const density1 = kde(
            data.filter(d => d.type === "variable 1").map(d => d.value));
        const density2 = kde(
            data.filter(d => d.type === "variable 2").map(d => d.value));

        console.log('Kernel Density Results (Variable 2):', density2);
        // Draw density plot for variable 1
        svg.append("path")
            .datum(density1)
            .attr("fill", "#69b3a2")
            .attr("opacity", "0.6")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(d => xScale(d[0]))
                .y(d => yScale(d[1]))
            );

        // Draw density plot for variable 2
        svg.append("path")
            .datum(density2)
            .attr("fill", "#404080")
            .attr("opacity", "0.6")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .attr("d", d3.line()
                .curve(d3.curveBasis)
                .x(d => xScale(d[0]))
                .y(d => yScale(d[1]))
            );

         */
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
// Function to compute density
function kernelDensityEstimator(kernel, X) {
    return function(V) {
        return X.map(x => [x, d3.mean(V, v => kernel(x - v))]);
    };
}

// Epanechnikov kernel function
function kernelEpanechnikov(k) {
    return function(v) {
        return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
}
export default EiDelaware;
