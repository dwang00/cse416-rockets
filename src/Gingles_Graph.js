import React, { useState, useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import { range } from 'mathjs';
import CubicSpline from 'cubic-spline';
import DataTable from 'react-data-table-component';

function Gingles_Graph(props) {

    const [scatterDataDem, setScatterDataDem] = useState(null);
    const [scatterDataRep, setScatterDataRep] = useState(null);
    const [demCoefficients, setDemCoefficients] = useState(null);
    const [repCoefficients, setRepCoefficients] = useState(null);

    const [demCan, setDemCan] = useState(null)
    const [repCan, setRepCan] = useState(null)
    const [scatterData, setScatterData] = useState({
        datasets: []
    });
    const [tableData, setTableData] = useState(null)
    useEffect(() => {
        function fetchGinglesData(state, race) {

                fetch(`http://localhost:8080/ginglesByState?state=${state}`)
                    .then(response => response.json())
                    .then(data => {
                        if(state === "DELAWARE" ) {
                            console.log("WHY WHY WHY")
                            setDemCan("Lisa Blunt Rochester")
                            setRepCan("Lee Murphy")
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
                        }
                        else if(state === "ALABAMA") {
                            setDemCan("")
                            setRepCan("")
                            if(race === 'caucasian') {
                                setScatterDataDem(data[6].dataPoints);
                                setScatterDataRep(data[7].dataPoints);
                                setDemCoefficients(data[6].function);
                                setRepCoefficients(data[7].function);
                            }
                            else if (race === "african american") {
                                setScatterDataDem(data[4].dataPoints);
                                setScatterDataRep(data[5].dataPoints);
                                setDemCoefficients(data[4].function);
                                setRepCoefficients(data[5].function);
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    })
        }
        fetchGinglesData(props.state, props.race)
        function fetchTabularGingles(state) {
            fetch(`http://localhost:8080/precinctsByState?state=${state}`)
                .then(response => response.json())
                .then(data => {
                    console.log("yOOOOOOOOOOOOOOO")
                    console.log('DO I GET HERE')
                    console.log(data)
                    if(state === "DELAWARE" ) {
                        setTableData(data)
                    }
                    else if(state === "ALABAMA") {
                        setTableData(data)
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                })

        }
        if(props.table === true) {
            fetchTabularGingles(props.state)
        }
    }, [props.state, props.race, props.table])
    useEffect(() => {
        if(scatterDataDem && scatterDataRep && demCoefficients && repCoefficients) {
            const scatterDataCopy = { ...scatterData}
            const demMinX = findMinMax(scatterDataDem).min
            const demMaxX = findMinMax(scatterDataDem).max

            const repMinX = findMinMax(scatterDataRep).min
            const repMaxX = findMinMax(scatterDataRep).max
            const step = 0.01;

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
                pointStyle: 'line', // Set the point style to 'line' to make the points invisible
                pointRadius: 0, // Set the point radius to 0 to make the points invisible
                fill: false,
                showLine: true
            }
            const curveRep = {
                label: `nonlinear regression for ${props.race} republican voting`,
                data: interpolatedXRep.map((x, index) => ({x, y: interpolatedYRep[index]})),
                borderColor: 'rgba(255, 99, 132, 1)',
                pointStyle: 'line', // Set the point style to 'line' to make the points invisible
                pointRadius: 0, // Set the point radius to 0 to make the points invisible
                fill: false,
                showLine: true
            }
            const scatterDem = {
                label: demCan,
                data: scatterDataDem,
                backgroundColor: 'rgba(75, 192, 192, .5)',
            }
            const scatterRep = {
                label: repCan,
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
                text: `${demCan} v ${repCan}`,
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
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const columns = [
        {
            name: 'Total Population',
            selector: 'POPULATION',
            id: 'total_population',
            cell: row => numberWithCommas(row.totalPop), // Apply commas to the number
            style: {
                background: 'white',
                textAlign: 'right',
            },
        },
        {
            name: 'Minority Population',
            selector: 'ETH1_AA',
            id: 'minority_population',
            sortable: true,
            cell: row => numberWithCommas(row.minorityPop), // Apply commas to the number
            style: {
                background: 'white',
                textAlign: 'right',
            },
        },
        {
            name: 'Republican Votes',
            selector: 'PARTY_REP',
            id: 'republican_votes',
            sortable: true,
            cell: row => numberWithCommas(row.repubVotes), // Apply commas to the number
            style: {
                background: 'white',
                textAlign: 'right',
            },
        },
        {
            name: 'Democratic Votes',
            selector: 'PARTY_DEM',
            id: 'democratic_votes',
            sortable: true,
            cell: row => numberWithCommas(row.demoVotes), // Apply commas to the number
            style: {
                background: 'white',
                textAlign: 'right',
            },
        }
    ];

    const customStyles = {
        pagination: {
            style: {
                backgroundColor: '#e6e6e6', // Change the background color of the pagination controls
                color: 'black', // Change the text color of the pagination controls
                padding: '10px', // Add padding to the pagination controls
                borderRadius: '5px', // Add border radius to the pagination control
            },
        },
        table: {
            style: {
                backgroundColor: '#e6e6e6',
                color: 'black',
                padding: '20px',
                borderRadius: '5px',
            },
        },
        header: {
            style: {
                minHeight: '10%',
                maxHeight: '10%',
                backgroundColor: 'e6e6e6',
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
            },
        },
        headCells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                },
            },
        },
        cells: {
            style: {
                '&:not(:last-of-type)': {
                    borderRightStyle: 'solid',
                    borderRightWidth: '1px',
                },
            },
        },
    };
// TODO legend stroke and fill colors for regressions appears to be swapped
    return (

        <div className="w-100">
            {/*<Scatter options={scatterOptions} data={scatterData} style={{display: "inline-block"}}/>*/}
            {props.table===true && tableData && (<DataTable
                columns={columns}
                data={tableData}
                pagination
                customStyles={customStyles}
                title={"Precinct by Precinct"}
            />)}
        </div>
)
    ;
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