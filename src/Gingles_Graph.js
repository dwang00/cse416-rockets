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
    const [scatterCurveData, setScatterCurveData] = useState( {
        datasets: []
    })
    const [tableData, setTableData] = useState(null)
    const [voteData, setVoteData] = useState(null)
    const [seatData, setSeatData] = useState(null)
    console.log(props.race)
    useEffect(() => {
        function fetchGinglesData(state, race) {

                fetch(`http://localhost:8080/ginglesByState?state=${state}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        if(state === "DELAWARE" ) {
                            console.log("WHY WHY WHY")
                            setDemCan("Lisa Blunt Rochester (Democratic)")
                            setRepCan("Lee Murphy (Republican) ")
                            if(race==='Caucasian') {
                                setScatterDataDem(data[2].dataPoints);
                                setScatterDataRep(data[3].dataPoints);
                                setDemCoefficients(data[2].function);
                                setRepCoefficients(data[3].function);
                            }
                            else if(race === 'African American') {
                                setScatterDataDem(data[0].dataPoints);
                                setScatterDataRep(data[1].dataPoints);
                                setDemCoefficients(data[0].function);
                                setRepCoefficients(data[1].function);
                            }
                        }
                        else if(state === "ALABAMA") {
                            console.log("YOOOOOOOOOOOOOOOOOOOOOOO")
                            console.log(data)
                            setDemCan("Yolanda Rochelle Flowers (Democratic)")
                            setRepCan("Kay Ivey (Republican)")
                            if(race === 'Caucasian') {
                                setScatterDataDem(data[2].dataPoints);
                                setScatterDataRep(data[3].dataPoints);
                                setDemCoefficients(data[2].function);
                                setRepCoefficients(data[3].function);
                            }
                            else if (race === "African American") {
                                setScatterDataDem(data[0].dataPoints);
                                setScatterDataRep(data[1].dataPoints);
                                setDemCoefficients(data[0].function);
                                setRepCoefficients(data[1].function);
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
                    const modifiedData = data.map((item, index) => ({
                        ...item,
                        precinct: `${index + 1}`, // Assign a precinct name based on the index
                    }));
                    if(state === "DELAWARE" || state === "ALABAMA") {
                        setTableData(modifiedData);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                })

        }
        if(props.view === "table") {
            fetchTabularGingles(props.state)
        }
        function fetchCurve(state, race) {
            fetch(`http://localhost:8080/shareByState?state=${state}`)
                .then(response => response.json())
                .then(data => {
                    console.log("yOOOOOOOOOOOOOOO")
                    console.log('DO I GET HERE')
                    console.log(data[0].africanamerican.seats)
                    if(race === "African American") {
                        setSeatData(data[0].africanamerican.seats)
                        console.log(data[0].africanamerican.seats)
                        setVoteData(data[0].africanamerican.votes)
                        console.log(data[0].africanamerican.votes)
                    }
                    else if(race === "Caucasian") {
                        setSeatData(data[0].caucasian.seats)
                        console.log(data[0].caucasian.seats)
                        setVoteData(data[0].caucasian.votes)
                        console.log(data[0].caucasian.votes)
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                })

        }
        if(props.view === "curve") {
            fetchCurve(props.state, props.race)
        }
    }, [props.state, props.race, props.view])
    // console.log(scatterDataDem);
    // console.log(scatterDataRep)
    useEffect(()=> {
        if(seatData && voteData) {
            const curveDataCopy = {datasets: []}

            const scatterSeat = {
                label: "Seat Share (%)",
                data: scatterDataDem,
                borderColor: 'rgba(75, 192, 192, 1)',
                //pointStyle: 'line', // Set the point style to 'line' to make the points invisible
                //pointRadius: 0, // Set the point radius to 0 to make the points invisible
                //fill: false,
                //showLine: true
            }
            const scatterVote = {
                label: "Vote Share (%)",
                data: scatterDataRep,
                borderColor: 'rgba(255, 99, 132, 1)',
                //pointStyle: 'line', // Set the point style to 'line' to make the points invisible
                //pointRadius: 0, // Set the point radius to 0 to make the points invisible
                //fill: false,
                //showLine: true
            }
            curveDataCopy.datasets.push(scatterSeat)
            curveDataCopy.datasets.push(scatterVote)
            setScatterCurveData(curveDataCopy)
        }
    }, [seatData, voteData])
    const curveOptions = {
        maintainAspectRatio: false,
        animation: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: `Vote Share (%)`,
                    color: "#000000"
                },
                ticks: {
                    color: "#000000"
                }
            },
            y: {
                beginAtZero: true,
                min:0,
                title: {
                    display: true,
                    text: 'Seat Share (%)',
                    color: "#000000"
                },
                ticks: {
                    stepSize: .1,
                    color: "#000000"
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: `${props.race} Vote Share v Seat Share`,
                font: {
                    size: 20
                },
                color: "#000000"
            },
            legend: {
                labels: {
                    color: "#000000"
                }
            }
        }
    };

    useEffect(() => {
        if(scatterDataDem && scatterDataRep && demCoefficients && repCoefficients) {
            const scatterDataCopy = { datasets: []}
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
                backgroundColor: 'rgba(75, 192, 192, .3)',
            }
            const scatterRep = {
                label: repCan,
                data: scatterDataRep,
                backgroundColor: 'rgba(255, 99, 132, .3)',
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
                    color: "#000000"
                },
                ticks: {
                    color: "#000000"
                }
            },
            y: {
                beginAtZero: true,
                min:0,
                title: {
                    display: true,
                    text: 'Vote Share (%)',
                    color: "#000000"
                },
                ticks: {
                    stepSize: .1,
                    color: "#000000"
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
                color: "#000000"
            },
            legend: {
                labels: {
                    color: "#000000"
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
            name: 'Precinct',
            selector: 'precinct', // Change 'precinct' to the appropriate property name from your data
            id: 'precinct',
            sortable: true,
            right: true,
            width: "95px",
            cell: row => row.precinct || "Unknown", // If 'precinct' data doesn't exist, display "Unknown"

        },
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

        <div className="w-100" style={{height: "95%", borderStyle:"solid"}}>
            {props.view === "table" ? (
                tableData && (
                    <DataTable
                        columns={columns}
                        data={tableData}
                        pagination
                        customStyles={customStyles}
                        title={"Precinct by Precinct"}
                        dense
                    />
                )
            ) : props.view === "scatter" ? (
                <Scatter options={scatterOptions} data={scatterData} style={{ display: "inline-block" }} />
            ) : (
                <Scatter options={curveOptions} data={scatterCurveData} style={{ display: "inline-block" }} />
            )}
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