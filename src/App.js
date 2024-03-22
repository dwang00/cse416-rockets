import logo from './rocketslogo.png';
import line from './line.png'
import './App.css';
import { Bar, Scatter} from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
import Chart from 'chart.js/auto'
import * as d3 from 'd3';
import GetData from "./get_data";
import React, { useState, useEffect } from 'react';
import Gerrymandering_Alabama from './Gerrymandering_Alabama';
import Gerrymandering_Delaware from "./Gerrymandering_Delaware";
import Slideshow from './Slideshow.js';
import GraphDesc from './graph_descriptions.js';
import EiDelaware from './EiDelaware'


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
            },
            y: {
                indexAxis: 'Number of Representatives',
                beginAtZero: true,
            },
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
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Vote Share',
                },
                ticks: {
                    stepSize: 20,
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: "2022 Boyd v Britt",
                font: {
                    size: 20
                }
            },
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
            },
            y: {
                indexAxis: 'Number of Representatives',
                beginAtZero: true,
            },
        },
        plugins: {
            title: {
                display: true,
                text: "Ethnicity of Delaware House Representatives",
                font: {
                    size: 20
                }
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
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Vote Share',
                },
                ticks: {
                    stepSize: 20,
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: "Sokola v Hocker",
                font: {
                    size: 20
                }
            },
        }
    };



    const [race,setRace] = useState("white");
    // const raceChange = (event) => {
    //     setRace(event.target.value);
    // }
    
    const raceChange = (value) => {
        setRace(value);
    }

    // const handleButtonClick = (newValue) => {
    //     setRace(newValue);
    //     console.log(race);
    // };

    const alComponents = [
        <Bar options={barOptionsAlabama} data={barDataAlabama} style={{display:"inline-block"}}/>,
        <Scatter options={scatterOptionsAlabama} data={scatterDataAlabama} style={{display:"inline-block"}}/>,
        <Gerrymandering_Alabama chartId = "chartAlabama1" style={{display:"inline-block"}}/>
    ];

    const deComponents = [
        <Bar options={barOptionsDelaware} data={barDataDelaware} style={{display:"inline-block"}}/>,
        <Scatter options={scatterOptionsDelaware} data={scatterDataDelaware} style={{display:"inline-block"}}/>,
        <Gerrymandering_Delaware chartId="chartDelaware1" style={{display:"inline-block"}}/>
    ]

    return (
        <div className="App">

            <div className = "header">
                <img src={logo} className="App-logo" alt="logo"/>
                <span className = "header_title">Rockets - Data Analysis </span>
            </div>
            {/* <img src={line} style={{position:"absolute", left:'25%', top:'700px', width:'800px'}} className="a-line-line" alt="logo"/> */}
            {/* <div className="title">You are currently looking at the&nbsp;
                <label>
                    <select style={{fontSize: "40px"}} value={race} onChange={raceChange}>
                        <option style={{fontSize: "20px"}} value="white">white</option>
                        <option style={{fontSize: "20px"}} value="black">black</option>
                    </select>
                </label>
                &nbsp;population.
            </div> */}

            
            {/* <div className="State">
                <div className="center" style={{position: 'absolute', left: "12%", top: '715px'}}>ALABAMA</div>
            </div>
            <div className="State">
                <div className="center" style={{position: 'absolute', left: "72%", top: '715px'}}>DELAWARE</div>
            </div> */}
            <GetData mode={"density"} race={race}/>
            <div className="toggle_container">
                <div onClick = {() => raceChange("white")} className='toggle_button'
                    style={{color: race === "white" ? "#f00840" : "#ffffff"}}>White</div>
                &nbsp;
                <div onClick = {() => raceChange("black")} className='toggle_button'
                    style={{color: race === "black" ? "#f00840" : "#ffffff"}}>Black</div>
            </div>
            <span className = "map_instructions">Drag to move the map around</span>
            <span className = "map_instructions">Use the scroll wheel to zoom</span>
            {/* <div style={{
                color: 'black',
                borderRight: 'solid',
                height: '321px',
                width: '20%',
                left: '15%',
                transform: 'translateX(200px)',
                top: '350px',
                position: 'absolute'
            }}></div> */}
            <div style={{position: "absolute", top: "1440px", left: "42%", fontSize:'30px'}}>
                Key takeaways
            </div>

            <div style={{position: "absolute", top: "1485px", left: "42%"}}>
                Some placeholder text
            </div>

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
                width={600}
                height={200}
            />

            <div style={{position: "absolute", top: "1540px", left: "38%", fontSize:'30px'}}>
                Enacted Partition Analysis
            </div>

            <div style={{position: "absolute", top: "2150px", width: '700px', height: '400px'}}>
                <div className="graph"></div>

                <Bar options={barOptionsAlabama} data={barDataAlabama}/>
                <div style={{marginBottom: "190px", textAlign:"center"}}></div>
                <Scatter options={scatterOptionsAlabama} data={scatterDataAlabama}/>
                <div style={{marginBottom: "120px"}}></div>
                <Gerrymandering_Alabama chartId = "ChartAlabama2"/>
                <div style={{marginBottom: "20px"}}></div>
            </div>
            <div style={{position: "absolute", top: "3670px", width: '700px', height: '400px'}}>
                <Slideshow components = {alComponents} />
            </div>
            <GraphDesc/>

            <div style={{position: "absolute", top: "2150px", left: "50%", width: '700px', height: '400px'}}>

                <Bar options={barOptionsDelaware} data={barDataDelaware}/>
                <div style={{marginBottom: "190px"}}></div>
                <Scatter options={scatterOptionsDelaware} data={scatterDataDelaware}/>
                <div style={{marginBottom: "120px"}}></div>
                <Gerrymandering_Delaware chartId="chartDelaware2"/>
                <div style={{marginBottom: "20px"}}></div>

            </div>
            <div style={{position: "absolute", top: "3670px", left: "50%", width: '700px', height: '400px'}}>
                <Slideshow components = {deComponents} />
            </div>
        </div>
  );
}
//
export default App;