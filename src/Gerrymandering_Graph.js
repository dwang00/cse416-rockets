import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import './App.css'

function Gerrymandering_Graph({ state, chartId, typeOfBox, typeOfPoint, ensemble}) {
    const [data, setData] = useState(null);
    const pointLabels = {
        "initial_partition_White": 'Enacted District Plan',
        "initial_partition_Black": 'Enacted District Plan',
        "initial_partition_Democratic": 'Enacted District Plan',
        "initial_partition_Republican": 'Enacted District Plan',
        "max_White_for_White_@0.37": 'Max White for White @0.37',
        "min_White_for_White_@0.37": 'Min White for White @0.37',
        "max_White_for_White_@0.5": "",
        "min_White_for_White_@0.5": "",
        "max_White_for_White_@0.6": "",
        "min_White_for_White_@0.6": "",
        "max_Black_for_White_@0.37": "",
        "min_Black_for_White_@0.37": "",
        "max_Black_for_White_@0.5": "",
        "min_Black_for_White_@0.5": "",
        "max_Black_for_White_@0.6": "",
        "min_Black_for_White_@0.6": "",
        "max_White_for_Black_@0.37": 'Max White for Black @0.37',
        "min_White_for_Black_@0.37": 'Min White for Black @0.37',
        "max_White_for_Black_@0.5": "",
        "min_White_for_Black_@0.5": "",
        "max_White_for_Black_@0.6": "",
        "min_White_for_Black_@0.6": "",
        "max_Black_for_Black_@0.37": "",
        "min_Black_for_Black_@0.37": "",
        "max_Black_for_Black_@0.5": "",
        "min_Black_for_Black_@0.5": "",
        "max_Black_for_Black_@0.6": "",
        "min_Black_for_Black_@0.6": "",
        // Add more mappings as needed
    };

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
    }, [state, typeOfBox, typeOfPoint, ensemble]);

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
            colors: ["#FFFF00", "#008000"],
            series: [
                {
                    name: 'ReCom District Plans',
                    type: 'boxPlot',
                    data: boxplotData,
                },
                {
                    name: pointLabels[typeOfPoint],
                    type: 'scatter',
                    data: scatterData,
                },
            ],
            chart: {
                type: 'boxPlot',
                height: "320",
                width: "1700"
            },
            title: {
                text: `${state} Districts`,
                align: 'left',
                style: {
                    color: "#000000"

                }
            },
            xaxis: {
                type: 'category',
                title: {
                    text: 'Indexed districts',
                    style: {
                        color: "#000000"
                    }
                },
                labels: {
                    style: {
                        colors: "#000000"
                    }
                }
            },
            yaxis: {
                title: {
                    text: `% ${typeOfBox}`,
                    style: {
                        color: "#000000",

                        fontWeight: 'normal',
                    }
                },
                labels: {
                    formatter: function (value) {
                        if(value !== undefined)
                        return value.toFixed(2);
                    },
                    style: {
                        colors: "#000000"
                    }
                }
            },
            legend: {
                show: true,
                labels: {
                    colors: "#000000"
                },
            },
            plotOptions: {
                boxPlot: {
                    colors: {
                        upper: '#FFFF00', // Yellow color for upper box
                        lower: '#FFFF00', // Yellow color for lower box
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
                colors: '#008000', // Green color for markers
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
    }, [data, chartId, typeOfBox, typeOfPoint, ensemble]);

    return <div id={chartId} />;
}

export default Gerrymandering_Graph;
