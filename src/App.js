import logo from './rocketslogo.png';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import React, { useState, useEffect } from 'react';
import { Bar, Scatter } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
import Chart from 'chart.js/auto';

import Gerrymandering_Alabama from './Gerrymandering_Alabama';
import Gerrymandering_Graph from "./Gerrymandering_Graph";
import EcoInf from './EcoInf'
import Gingles_Graph from "./Gingles_Graph";
import SelectState from './SelectState.js';
import StateTab from './StateTab.js';
import Navbar from './Navbar.js';

import { get_data } from './get_data.js';

Chart.register(BoxPlotController, BoxAndWiskers);

Chart.register(BoxPlotController, BoxAndWiskers);

function App() {
    const generateDataset = (length, minX, maxX, minY, maxY, slope, intercept, noise) => {
        /*return createArray(length, () => ({
            x: faker.number.int({ min: minX, max: maxX }),
            y: faker.number.int({ min: minY, max: maxY }),
        }));*/
        return Array.from({ length }, () => {
            const x = faker.number.float({min: minX, max: maxX});
            let y = slope * x + intercept + (Math.random() * 2 - 1) * noise; // Adding noise for randomness
            if(y > 1){
                y = 1;
            }else if(y < -1){
                y = -1;
            }
            const rand = faker.number.float({min: 0, max: 1})
            if(rand > .75){
                y = faker.number.float({min: minX, max: maxX});
            }
            return { x, y };
        });
    };


    const [alBarData, setAlBarData]= useState(null);
    useEffect(() => {
        fetch('http://localhost:8080/get_racedata/byState?state=ALABAMA')
            .then(response => response.json())
            .then(data => {
                setAlBarData([data[0].raceCount.caucasian, data[0].raceCount.africanAmerican]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const barDataAlabama = {
        labels: ['Caucasian', 'African American'],
        datasets: [
            {
                label: 'Ethnicity of Alabama House Representatives',
                data: alBarData,
                backgroundColor: ['blue', 'green'],
                borderWidth: 1,
            },
        ],
    };
const barOptionsAlabama = {
    maintainAspectRatio: false,
    scales: {
        x: {
            indexAxis: 'Ethnicity',
            labels: ['Caucasian', 'African American'],
            ticks: {
                // color: "#f00840"
            }
        },
        y: {
            indexAxis: 'Number of Representatives',
            beginAtZero: true,
            ticks: {
                // color: "#f00840"
            }
        },
    },
    plugins: {
        title: {
          display: true,
          text: "Ethnicity of Alabama House Representatives",
          font: {
              size: 20
          },
        //   color: "#f00840"
        },
        plugins: {
            title: {
              display: true,
              text: "Ethnicity of Alabama House Representatives",
              font: {
                  size: 20
              },
            },
            legend: {
                display: false
            }
        }
    }
};

    const scatterDataAlabama = {
        datasets: [
            {
                label: 'Will Boyd',
                //const generateDataset = (length, minX, maxX, minY, maxY, slope, intercept, noise) => {

                data: generateDataset(400,0, 1, 0, 1, .48, .19, .12),
                backgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Katie Britt',
                data: generateDataset(168,0, 1, 0, 1, -.18, .73, .15),
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };
    const scatterOptionsAlabama = {
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Percent African American',
                    // color: "#f00840"
                },
                ticks: {
                    // color: "#f00840"
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Vote Share',
                    // color: "#f00840"
                },
                ticks: {
                    stepSize: 20,
                    // color: "#f00840"
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: "2022 Boyd v Britt",
                font: {
                    size: 20
                },
                // color: "#f00840"
            },
            legend: {
                labels: {
                    // color: "#f00840"
                }
            }
        }
    };
    // opportunity districts for delaware
    const [oppDistrictsDe, setOppDistrictsDe] = useState(null);
    useEffect(() => {
        fetch()
            .then(response => response.json)
            .then(data => {
                setOppDistrictsDe(data)
            })
            .catch(error => {
                console.error("Error fetching data:", error)
            })
    }, [])
    const oppDataDe = {
        labels: Array.from({ length: 41 }, (_, i) => i + 1), // Assuming you have 40 data points
        datasets: [
            {
                label: 'White',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 18, 57, 73, 63, 32, 4, 0, 3, 35, 85, 93, 32, 1, 7, 36, 115, 77, 15, 1, 0]
            }
        ]
    };
    const optionsOppDe = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'District'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: '# of partitions where we found the opportunity district'
                },
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
    //DELAWARE STUFF ***********************************************************
    const [deBarData, setDeBarData]= useState(null);
    useEffect(() => {
        fetch('http://localhost:8080/get_racedata/byState?state=DELAWARE') // Fetch data for Alabama
            .then(response => response.json())
            .then(data => {
                // Set the fetched data to the state
                setDeBarData([data[0].raceCount.caucasian,data[0].raceCount.africanAmerican,
                    data[0].raceCount.asian]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const barDataDelaware = {
        labels: ['Caucasian', 'African American', 'Asian'],
        datasets: [
            {
                label: 'Ethnicity of Delaware House Representatives',
                data: deBarData,
                backgroundColor: ['blue', 'green', 'red'],
                borderWidth: 1,
            },
        ],
    };


const barOptionsDelaware = {
    maintainAspectRatio: false,
    scales: {
        x: {
            indexAxis: 'Ethnicity',
            labels: ['Caucasian', 'African American', 'Asian'],
            ticks: {
                // color: "#f00840"
            }
        },
        y: {
            indexAxis: 'Number of Representatives',
            beginAtZero: true,
            ticks: {
                // color: "#f00840"
            }
        },
    },
    plugins: {
        title: {
            display: true,
            text: "Ethnicity of Delaware House Representatives",
            font: {
                size: 20
            },
            // color: "#f00840"
        },
        legend: {
            display: false
        }
    }
};


    const [race, setRace] = useState("white");

    const raceChange = (value) => {
        setRace(value);
    }


    // const handleButtonClick = (newValue) => {
    //     setRace(newValue);
    //     console.log(race);
    // };

    const [currState, setCurrState] = useState(null);

    const alComponents = [

        <Bar options={barOptionsAlabama} data={barDataAlabama} style={{display:"inline-block"}}/>,
        <Scatter options={scatterOptionsAlabama} data={scatterDataAlabama} style={{display:"inline-block"}}/>,
        <Gerrymandering_Alabama chartId = "chartAlabama1" style={{display:"inline-block"}}/>,
        <EcoInf
        data={[
            {
                color: "steelblue",
                values: [
                    { x: 0.0, value: 0.05 },
                    { x: 0.1, value: 0.05 },
                    { x: 0.2, value: 0.04 },
                    { x: 0.3, value: 0.03 },
                    { x: 0.4, value: 0.04 },
                    { x: 0.44, value: 0.04 },
                    { x: 0.5, value: 0.9 },
                    { x: 0.52, value: 0.04 },
                    { x: 0.53, value: 0.04 },
                    { x: 0.6, value: 0.04 },
                    { x: 0.7, value: 0.03 },
                    { x: 0.8, value: 0.04 },
                    { x: 0.9, value: 0.07 },
                    { x: 1.0, value: 0.04 }
                ]
            },
            {
                color: "green",
                values: [
                    { x: 0.0, value: 0.05 },
                    { x: 0.1, value: 0.05 },
                    { x: 0.2, value: 0.4 },
                    { x: 0.3, value: 0.03 },
                    { x: 0.4, value: 0.04 },
                    { x: 0.44, value: 0.04 },
                    { x: 0.5, value: 0.03 },
                    { x: 0.52, value: 0.04 },
                    { x: 0.53, value: 0.04 },
                    { x: 0.6, value: 0.04 },
                    { x: 0.7, value: 0.03 },
                    { x: 0.8, value: 0.04 },
                    { x: 0.9, value: 0.07 },
                    { x: 1.0, value: 0.04 }
                ]
            },
        ]}
        width={window.innerWidth * 0.8}
        height={window.innerHeight * 0.8}
    />
    ];

    const deComponents = [
        <Bar options = {optionsOppDe} data = {oppDataDe} style = {{display: "inline-block"}}/>,
        <Bar options={barOptionsDelaware} data={barDataDelaware} style={{display:"inline-block"}}/>,
        <Gingles_Graph state = "DELAWARE" race = "caucasian" demCan = "Lisa Blunt Rochester" repCan = "Lee Murphy"/>,
        <Gerrymandering_Graph state = "DELAWARE" race = "caucasian" chartId="chartDelaware1" style={{display:"inline-block"}}/>,
        <EcoInf
            state = "DELAWARE"
            election = "Presidential"
            width={window.innerWidth * 0.8}
            height={window.innerHeight * 0.8}
        />,
        {/* must decide what election we are doing for ecological inference, like between Presidential or RepInCongress */}
    ]

    const navbarHeight = Math.floor(0.1 * window.innerHeight);
    const [geoJsons,  setGeoJsons] = useState(null);
    useEffect(() => {
        const getjsons = async () => {await get_data().then(response => setGeoJsons(response))};
        getjsons();
    }, []);

    const [currTab, setCurrTab] = useState("summary");

    return (
        <div className="App">
            <Navbar setCurrState={setCurrState} logo={logo} navbarHeight={navbarHeight} currTab={currTab} setCurrTab={setCurrTab}/>
            {currState == 'de' && <StateTab components = {deComponents} navbarHeight={navbarHeight} geoJsons={geoJsons} currState={currState} setCurrState={setCurrState} currTab={currTab}/>}
            {currState == 'al' && <StateTab components = {alComponents} navbarHeight={navbarHeight} geoJsons={geoJsons} currState={currState} setCurrState={setCurrState} currTab={currTab}/>}
            {!currState && <SelectState navbarHeight={navbarHeight} geoJson={geoJsons} currState={currState} setCurrState={setCurrState}/>}

            {/* <div style={{backgroundColor: "#686464"}}>
                <h1>State Assembly Districts For Delaware</h1>
                <StateAssemblyTable state="DELAWARE" onSelectRows={handleSelectedRows} selectedRowsData={selectedRowsData} setSelectedRowsData={setSelectedRowsData} />
            </div>
            <div style={{backgroundColor: "#686464"}}>
                <h1>State Assembly Districts For Alabama</h1>
                <StateAssemblyTable state="ALABAMA" onSelectRows={handleSelectedRows} selectedRowsData={selectedRowsData} setSelectedRowsData={setSelectedRowsData} />
            </div>
            <div style={{backgroundColor: "#686464"}}>
                <h1>State Data Summary for Delaware</h1>
                <StateDataSummary state="DELAWARE"/>
            </div>
            <div style={{backgroundColor: "#686464"}}>
                <h1>State Data Summary for Alabama</h1>
                <StateDataSummary state="ALABAMA"/>
            </div> */}
        </div>
    );
}

//
export default App;