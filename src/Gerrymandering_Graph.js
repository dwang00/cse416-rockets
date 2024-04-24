import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';

function Gerrymandering_Graph({ state, race, chartId }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/boxPlotByState?state=${state}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
        if(!data.length)
            return;

        const boxplotData = data.map(item => ({
            x: item.districtNum.toString(),
            y: [item.min, item.lower, item.med, item.upper, item.max]
        }));

        const scatterData = data.map(item => ({
            x: item.districtNum.toString(),
            y: item.enacted
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
                height: "100%"
            },
            title: {
                text: `${state} Districts`,
                align: 'left',
                style: {
                    color: "#f00840"
                }
            },
            xaxis: {
                type: 'category',
                title: {
                    text: 'Indexed districts',
                    style: {
                        color: "#f00840"
                    }
                },
                labels: {
                    style: {
                        colors: "#f00840"
                    }
                }
            },
            yaxis: {
                title: {
                    text: `% ${race}`,
                    style: {
                        color: "#f00840"
                    }
                },
                labels: {
                    formatter: function (value) {
                        if(value !== undefined)
                        return value.toFixed(2);
                    },
                    style: {
                        colors: "#f00840"
                    }
                }
            },
            legend: {
                labels: {
                    colors: "#f00840"
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
        if(!chartElement)
            return;

        const chart = new ApexCharts(chartElement, options);
        chart.render();
    }, [data, chartId]);

    return <div id={chartId} />;
}

export default Gerrymandering_Graph;
