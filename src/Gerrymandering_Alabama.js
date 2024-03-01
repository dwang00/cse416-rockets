import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

function Gerrymandering_Alabama() {

    useEffect(() => {
        window.dispatchEvent(new Event('resize'));

        function randomFloats(count, min, max) {
            const delta = max - min;
            return Array.from({ length: count }, () => Math.random() * delta + min);
        }

        const quantile = (arr, q) => {
            const sorted = arr.slice().sort((a, b) => a - b);
            const pos = (sorted.length - 1) * q;
            const base = Math.floor(pos);
            const rest = pos - base;
            if (sorted[base + 1] !== undefined) {
                return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
            } else {
                return sorted[base];
            }
        };

        const boxplotData = [
            {
                x: '1',
                y: randomFloats(100, 0.05, 0.1),
            },
            ...Array.from({ length: 34 }, (_, index) => ({
                x: `${index + 2}`,
                y: randomFloats(100, 0.05 + index * 0.015, 0.1 + index * 0.02),
            })),
        ].map((data) => ({
            x: data.x,
            y: [
                Math.min(...data.y),
                quantile(data.y, 0.25),
                quantile(data.y, 0.5),
                quantile(data.y, 0.75),
                Math.max(...data.y),
            ],
        }));
        const scatterData = boxplotData.map((data, index) => ({
            x: data.x,
            y: index < 25 ? data.y[0] +(Math.random() * 0.05 - 0.05): data.y[4] + (Math.random() * 0.05 + 0.02),
        }));

        const options = {
            series: [
                {
                    name: 'ReCom Ensemble',
                    type: 'boxPlot',
                    data: boxplotData,
                    color: '#e0163d', // Set the color to red
                },
                {
                    name: 'Enacted',
                    type: 'scatter',
                    data: scatterData,
                    color: '#128fc4',
                },
            ],
            chart: {
                type: 'boxPlot',
                height: 350,
            },
            title: {
                text: 'Alabama Districts',
                align: 'left',
            },
            xaxis: {
                type: 'category',
                title: {
                    text: 'Indexed districts',
                },
            },
            yaxis: {
                title: {
                    text: '% Minority',
                },
                labels: {
                    formatter: function (value) {
                        return value.toFixed(2);
                    },
                },
            },
            plotOptions: {
                boxPlot: {
                    colors: {
                        upper: '#d9153b',
                        lower: '#e0163d',
                    },
                },
            },
        };

        const chartElement = document.querySelector("#chartAlabama");


        if (chartElement) {
            const chart = new ApexCharts(chartElement, options);
            chart.render();
        }
    }, []);

    return <div id="chartAlabama" />;
}

export default Gerrymandering_Alabama;
