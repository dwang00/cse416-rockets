import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

function Gerrymandering_Delaware({chartId}) {

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
            ...Array.from({ length: 21 }, (_, index) => ({
                x: `${index + 2}`,
                y: randomFloats(100, 0.05 + index * 0.024, 0.1 + index * 0.03),
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
        const scatterData = boxplotData.map((data) => ({
            x: data.x,
            y: data.y[2] + (Math.random() * .09 - Math.random() * .09 ), // Use the minimum value of the box plot
        }));

        const options = {
            series: [
                {
                    name: 'ReCom Ensemble',
                    type: 'boxPlot',
                    data: boxplotData,
                },
                {
                    name: 'Enacted',
                    type: 'scatter',
                    data: scatterData,
                },
            ],
            chart: {
                type: 'boxPlot',
                height: 350
            },
            title: {
                text: 'Delaware Districts',
                align: 'left'
            },
            xaxis: {
                type: 'category',
                title: {
                    text: 'Indexed districts'
                }
            },
            yaxis: {
                title: {
                    text: '% Minority'
                },
                labels: {
                    formatter: function (value) {
                        return value.toFixed(2);
                    },
                }
            },
            plotOptions: {
                boxPlot: {
                    colors: {
                        upper: '#159ed9',
                        lower: '#16b1e0',
                    },
                },
                markers: {
                    size: 1,
                    colors: ['#d30808'], // Adjust the size of the scatter plot points
                },
            },
        };

        const chartElement = document.querySelector(`#${chartId}`);

        if (chartElement) {
            const chart = new ApexCharts(chartElement, options);
            chart.render();
        }
    }, [chartId]);

    return <div id={chartId} />;
}

export default Gerrymandering_Delaware;
