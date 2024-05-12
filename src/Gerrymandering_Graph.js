import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import './App.css'

function Gerrymandering_Graph({ state, chartId, typeOfBox, typeOfPoint, ensemble}) {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:8080/boxPlotByState?state=${state}`)
            .then(response => response.json())
            .then(data => {
                if(ensemble === "250") {
                    setData(data[0])
                }
                else if (ensemble === "5000") {
                    setData(data[1])
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [state]);

    useEffect(() => {
        console.log(data)
        if(!data) {
            console.log("Data is empty, cannot render graph.");
            return;
        }
        window.dispatchEvent(new Event('resize'));
        console.log("yo1")
        console.log(data)
        console.log("yo2 " + typeOfBox)
        const boxplotData = data[typeOfBox].map((item, index) => ({
            x: index+1,
            y: [item.min, item.q1, item.median, item.q3, item.max]
        }));
        console.log(data['points'][typeOfPoint])
        const scatterData = data['points'][typeOfPoint].map((item, index) => ({
            x: index+1,
            y: item
        }));
        console.log("Boxplot data:", boxplotData);
        console.log("Scatter data:", scatterData);

        const options = {
            series: [
                {
                    name: 'ReCom Ensemble',
                    type: 'boxPlot',
                    data: boxplotData,
                },
                {
                    name: typeOfPoint,
                    type: 'scatter',
                    data: scatterData,
                },
            ],
            chart: {
                type: 'boxPlot',
                height: "500"
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
                    text: `% ${typeOfBox}`,
                    style: {
                        color: "#f00840",

                        fontWeight: 'normal',
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
                scatter: {
                    markers: {
                        size: 0, // Adjust the size of the scatter plot points
                    },
                },
            },
            markers: {
                size: 3,
                fillOpacity: 0.5,
            },
            animations: {
                enabled: false
            }
        };

        const chartElement = document.querySelector(`#${chartId}`);
        console.log("chartId:", chartId);
        console.log("chartElement:", chartElement);

        if (!chartElement) {
            console.error(`Chart element with ID '${chartId}' not found.`);
            return;
        }

        const chart = new ApexCharts(chartElement, options);
        chart.render();
    }, [data, chartId, typeOfBox, typeOfPoint]);

    return <div id={chartId} />;
}

export default Gerrymandering_Graph;
