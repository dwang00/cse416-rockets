import logo from './rocketslogo.png';
import line from './line.png';
import './App.css';
import { Bar, Scatter} from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';
import GetData from "./get_data";
import React, { useState, useEffect } from 'react';
import Gerrymandering_Alabama from './Gerrymandering_Alabama';
import Gerrymandering_Delaware from "./Gerrymandering_Delaware";
import StateTab from './StateTab.js';
import GraphDesc from './graph_descriptions.js';
import EiDelaware from './EiDelaware';
import 'bootstrap/dist/css/bootstrap.css';


Chart.register(BoxPlotController, BoxAndWiskers);
//const createArray = (length, callback) => Array.from({ length }, callback);

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


    //ALABAMA STUFF ********************************************************************
    const [alBarData, setAlBarData]= useState(null);
    useEffect(() => {
        fetch('http://localhost:8080/get_racedata/alabama') // Fetch data for Alabama
            .then(response => response.json())
            .then(data => {
                // Set the fetched data to the state
                setAlBarData([data[0].representatives.caucasian, data[0].representatives.africanAmerican]);
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
                color: "#f00840"
            }
        },
        y: {
            indexAxis: 'Number of Representatives',
            beginAtZero: true,
            ticks: {
                color: "#f00840"
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
          color: "#f00840"
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
                text: "2022 Boyd v Britt",
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

    //DELAWARE STUFF ***********************************************************
    const [deBarData, setDeBarData]= useState(null);
    useEffect(() => {
        fetch('http://localhost:8080/get_racedata/delaware') // Fetch data for Alabama
            .then(response => response.json())
            .then(data => {
                // Set the fetched data to the state
                setDeBarData([data[0].representatives.caucasian,data[0].representatives.africanAmerican,
                    data[0].representatives.asian]);
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
                color: "#f00840"
            }
        },
        y: {
            indexAxis: 'Number of Representatives',
            beginAtZero: true,
            ticks: {
                color: "#f00840"
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
            color: "#f00840"
        },
        legend: {
            display: false
        }
    }
};

    const scatterDataDelaware = {
        datasets: [
            {
                label: 'David Sokola',
                data: generateDataset(220,0, 1, 0, 1, .3, .39, .12),
                backgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Gerald Hocker',
                data: generateDataset(80,0, 1, 0, 1, -.2, .63, .18),
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };
    const scatterOptionsDelaware = {
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Percent African American',
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
                text: "Sokola v Hocker",
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

    const [race,setRace] = useState("white");
    // const raceChange = (event) => {
    //     setRace(event.target.value);
    // }
    
    const raceChange = (value) => {
        setRace(value);
    }
    const [currState, setCurrState] = useState('al');
    function setAl() {
        setCurrState('al');
    }
    function setDe() {
        setCurrState('de');
    }

    // const handleButtonClick = (newValue) => {
    //     setRace(newValue);
    //     console.log(race);
    // };

    const alComponents = [
        <Bar options={barOptionsAlabama} data={barDataAlabama} style={{display:"inline-block"}}/>,
        <Scatter options={scatterOptionsAlabama} data={scatterDataAlabama} style={{display:"inline-block"}}/>,
        <Gerrymandering_Alabama chartId = "chartAlabama1" style={{display:"inline-block"}}/>,
        // placeholder
        <EiDelaware
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
        <Bar options={barOptionsDelaware} data={barDataDelaware} style={{display:"inline-block"}}/>,
        <Scatter options={scatterOptionsDelaware} data={scatterDataDelaware} style={{display:"inline-block"}}/>,
        <Gerrymandering_Delaware chartId="chartDelaware1" style={{display:"inline-block"}}/>,
        <EiDelaware
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
    ]

    const navbarHeight = Math.floor(0.1 * window.innerHeight);

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#1e1e1e",}}>
                <a className="navbar-brand" href="/" height={navbarHeight} style={{color: "#f00840", fontWeight: "bold",}}>
                    <img src={logo} width="auto" height={navbarHeight * 0.63} className="d-inline-block" alt="logo"/>
                    <span className="align-middle">Election Analysis</span>
                </a>
                <div className="navbar-nav">
                    <a className="nav-item nav-link" href="#" onClick={() => setAl()}>Alabama</a>
                    <a className="nav-item nav-link" href="#" onClick={() => setDe()}>Delaware</a>
                    <a className="nav-item nav-link" href="#">Side-by-Side</a>
                </div>
            </nav>
            {currState == 'de' && <StateTab components = {deComponents} navbarHeight={navbarHeight}/>}
            {currState == 'al' && <StateTab components = {alComponents} navbarHeight={navbarHeight}/>}
            {/* <GetData mode={"density"} race={race}/> */}
        </div>
  );
}
//
export default App;