import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import { range } from 'mathjs';
import CubicSpline from 'cubic-spline';

function Gingles_Graph(props) {

    const [scatterDataDem, setScatterDataDem] = useState(null);
    const [scatterDataRep, setScatterDataRep] = useState(null);
    const [demCoefficients, setDemCoefficients] = useState(null);
    const [repCoefficients, setRepCoefficients] = useState(null);

    const [scatterData, setScatterData] = useState({
        datasets: []
    });
    useEffect(() => {
        function fetchGinglesData(state, race, demCan, repCan) {
            if(state === 'DELAWARE') {
                fetch('http://localhost:8080/ginglesByState?state=DELAWARE')
                    .then(response => response.json())
                    .then(data => {
                        if(race==='caucasian') {
                            setScatterDataDem(data[2].dataPoints);
                            setScatterDataRep(data[3].dataPoints);
                            setDemCoefficients(data[2].function);
                            setRepCoefficients(data[3].function);
                        }
                        else if(race === 'african american') {
                            setScatterDataDem(data[0].dataPoints);
                            setScatterDataRep(data[1].dataPoints);
                            setDemCoefficients(data[0].function);
                            setRepCoefficients(data[1].function);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    })
            }
            if(state === 'ALABAMA') {
                ///do not have anything in database yet for this
            }
        }
        fetchGinglesData(props.state, props.race, props.demCan, props.repCan)
    }, [props.state, props.race, props.demCan, props.repCan])
    useEffect(() => {
        if(scatterDataDem && scatterDataRep && demCoefficients && repCoefficients) {
            const scatterDataCopy = { ...scatterData}
            const demMinX = findMinMax(scatterDataDem).min
            const demMaxX = findMinMax(scatterDataDem).max

            const repMinX = findMinMax(scatterDataRep).min
            const repMaxX = findMinMax(scatterDataRep).max
            const step = 0.05;

            const xValuesDem = range(demMinX, demMaxX, step).toArray();
            const xValuesRep = range(repMinX, repMaxX, step).toArray();
            const demFunction = generatePolynomialFunction(demCoefficients)
            const repFunction = generatePolynomialFunction(repCoefficients)

            const yValuesDem = xValuesDem.map(x => demFunction(x))
            const yValuesRep = xValuesRep.map(x => repFunction(x))
            const splineDem = new CubicSpline(xValuesDem, yValuesDem)
            const splineRep = new CubicSpline(xValuesRep, yValuesRep)

            const interpolatedXDem = range(demMinX, demMaxX, .01).toArray();
            const interpolatedYDem = interpolatedXDem.map(x => splineDem.at(x))
            const interpolatedXRep = range(repMinX, repMaxX, .01).toArray();
            const interpolatedYRep = interpolatedXRep.map(x => splineRep.at(x))

            const curveDem = {
                label: `nonlinear regression for ${props.race} democrat voting`,
                data: interpolatedXDem.map((x, index) => ({x, y: interpolatedYDem[index]})),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                showLine: true
            }
            const curveRep = {
                label: `nonlinear regression for ${props.race} republican voting`,
                data: interpolatedXRep.map((x, index) => ({x, y: interpolatedYRep[index]})),
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
                showLine: true
            }
            const scatterDem = {
                label: props.demCan,
                data: scatterDataDem,
                backgroundColor: 'rgba(75, 192, 192, .5)',
            }
            const scatterRep = {
                label: props.repCan,
                data: scatterDataRep,
                backgroundColor: 'rgba(255, 99, 132, .5)',
            }
            scatterDataCopy.datasets.push(scatterDem);
            scatterDataCopy.datasets.push(scatterRep);
            scatterDataCopy.datasets.push(curveDem);
            scatterDataCopy.datasets.push(curveRep);
            setScatterData(scatterDataCopy);

        }
    }, [scatterDataDem, scatterDataRep, demCoefficients, repCoefficients])
    const scatterOptions = {
        maintainAspectRatio: false,
        animation: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: `Percent ${props.race}`,
                    color: "#f00840"
                },
                ticks: {
                    color: "#f00840"
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Vote Share',
                    color: "#f00840"
                },
                ticks: {
                    stepSize: 20,
                    color: "#f00840"
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: `${props.demCan} v ${props.repCan}`,
                font: {
                    size: 20
                },
                color: "#f00840"
            },
            legend: {
                labels: {
                    color: "#f00840"
                }
            }
        }
    };
    if (!scatterData || !demCoefficients || !repCoefficients) {
        return <div>Loading...</div>;
    }
    return (
      <Scatter options={scatterOptions} data = {scatterData} style={{ display: "inline-block" }} />
    );
}
function generatePolynomialFunction(coefficients) {
    return function(x) {
        let result = 0;
        for (let i = 0; i < coefficients.length; i++) {
            result += coefficients[i] * Math.pow(x, i);
        }
        return result;
    };
}
function findMinMax(scatterData) {
    let min = Infinity
    let max = -Infinity
    scatterData.forEach(point => {
        if(point.x < min) {
            min = point.x
        }
        if(point.x > max) {
            max = point.x
        }
    })
    return {min, max}
}
export default Gingles_Graph;