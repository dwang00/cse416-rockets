import logo from './rocketslogo.png';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import React, { useState, useEffect } from 'react';
import { Bar, Scatter } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
import Chart from 'chart.js/auto';

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
                setAlBarData([data[0].raceCount.caucasian/105, data[0].raceCount.africanAmerican/105]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const delawarePop = [693232/1019459, 242631/1019459, 0]
    const alabamaPop = [3495919/5073903, 1359806/5073903]
    const barDataAlabama = {
        labels: ['Caucasian', 'African American'],
        datasets: [
            {
                label: 'Percent of Alabama House Representatives',
                data: alBarData,
                backgroundColor: ['blue', 'green'],
                borderWidth: 1,
            },
            {
                label: 'Percent of Total Population',
                data: alabamaPop,
                backgroundColor: ['blue', 'green'],
                borderWidth: 1
            }
        ],
    };
const barOptionsAlabama = {
    maintainAspectRatio: false,
    scales: {
        x: {
            title: {
                display: true,
                text: "Race: Representation (%, Left) and Population (%, Right)"
            },
            labels: ['Caucasian', 'African American'],
            ticks: {
                // color: "#f00840"
            }
        },
        y: {
            title: {
                display: true,
                text: "Ethnicity (%)"
            },
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
        },
        legend: {
            display: false
        }
    },
};


    //DELAWARE STUFF ***********************************************************
    const [deBarData, setDeBarData]= useState(null);
    useEffect(() => {
        fetch('http://localhost:8080/get_racedata/byState?state=DELAWARE') // Fetch data for Alabama
            .then(response => response.json())
            .then(data => {
                // Set the fetched data to the state
                setDeBarData([data[0].raceCount.caucasian/41,data[0].raceCount.africanAmerican/41,
                    data[0].raceCount.asian/41]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    const barDataDelaware = {
        labels: ['Caucasian', 'African American', 'Asian'],
        datasets: [
            {
                label: 'Percent of Delaware House Representatives',
                data: deBarData,
                backgroundColor: ['blue', 'green', 'red'],
                borderWidth: 1,
            },
            {
                label: 'Percent of Total Population',
                data: delawarePop,
                backgroundColor: ['blue', 'green', 'red'],
                borderWidth: 1
            }
        ],
    };


const barOptionsDelaware = {
    maintainAspectRatio: false,
    scales: {
        x: {
            title: {
                display: true,
                text: "Race: Representation (%, Left) and Population (%, Right)"
            },
            labels: ['Caucasian', 'African American', 'Asian'],
            ticks: {
                // color: "#f00840"
            }
        },
        y: {
            title: {
                display: true,
                text: "Ethnicity (%)"
            },
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

        <Bar options={barOptionsAlabama} data={barDataAlabama} style={{display:"inline-block",}}/>,
    ];

    const deComponents = [
        <Bar options={barOptionsDelaware} data={barDataDelaware} style={{display:"inline-block"}}/>,
        {/* must decide what election we are doing for ecological inference, like between Presidential or RepInCongress */}
    ]

    const navbarHeight = Math.floor(0.1 * window.innerHeight);
    const [geoJsons,  setGeoJsons] = useState(null);
    const [precinct, setPrecinct] = useState(null);
    useEffect( () => {
        fetch(`http://localhost:8080/precinctMapByState`)
            .then(response => response.json())
            .then(data => {
                setPrecinct(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    useEffect(() => {
        const getjsons = async () => {await get_data().then(response => setGeoJsons(response))};
        getjsons();
    }, []);

    const [currTab, setCurrTab] = useState("select");

    return (
        <div className="App">
            <Navbar currState={currState} setCurrState={setCurrState} logo={logo} navbarHeight={navbarHeight} currTab={currTab} setCurrTab={setCurrTab}/>
            {currState == 'de' && <StateTab components = {deComponents} navbarHeight={navbarHeight} geoJsons={geoJsons} precinct={precinct} currState={currState} setCurrState={setCurrState} currTab={currTab} setCurrTab={setCurrTab}/>}
            {currState == 'al' && <StateTab components = {alComponents} navbarHeight={navbarHeight} geoJsons={geoJsons} precinct={precinct} currState={currState} setCurrState={setCurrState} currTab={currTab} setCurrTab={setCurrTab}/>}
            {!currState && <SelectState navbarHeight={navbarHeight} geoJson={geoJsons} currState={currState} setCurrState={setCurrState} setCurrTab={setCurrTab}/>}

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