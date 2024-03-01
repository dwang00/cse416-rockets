import logo from './rocketslogo.png';
import './App.css';
import { Bar, Scatter} from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
import Chart from 'chart.js/auto'
import GetData from "./get_data";
import React, { useState, useEffect } from 'react';


const generateRandomNumber = () => faker.number.int({ min: 1, max: 35 });
Chart.register(BoxPlotController, BoxAndWiskers);
const createArray = (length, callback) => Array.from({ length }, callback);

const generateDataset = (length, minX, maxX, minY, maxY) => {
    return createArray(length, () => ({
        x: faker.number.int({ min: minX, max: maxX }),
        y: faker.number.int({ min: minY, max: maxY }),
    }));
};

//ALABAMA STUFF ********************************************************************
const barDataAlabama = {
    labels: ['Caucasian', 'African American'],
    datasets: [
        {
            label: 'Ethnicity of Alabama House Representatives',
            data: createArray(2, () => generateRandomNumber()),
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
};

const scatterDataAlabama = {
    datasets: [
        {
            label: 'Katie Britt',
            data: generateDataset(1700),
            backgroundColor: 'rgba(255, 99, 132, 1)',
        },
        {
            label: 'Will Boyd',
            data: generateDataset(500),
            backgroundColor: 'rgba(75, 192, 192, 1)',
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
};

//DELAWARE STUFF ***********************************************************
const barDataDelaware = {
    labels: ['Caucasian', 'African American', 'Asian'],
    datasets: [
        {
            label: 'Ethnicity of Delaware House Representatives',
            data: createArray(3, () => generateRandomNumber()),
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
};


const scatterDataDelaware = {
    datasets: [
        {
            label: 'Gerald Hocker',
            data: generateDataset(150),
            backgroundColor: 'rgba(255, 99, 132, 1)',
        },
        {
            label: 'David Sokola',
            data: generateDataset(250),
            backgroundColor: 'rgba(75, 192, 192, 1)',
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
};
function App() {

    function BoxPlotAlabama() {
        useEffect(() => {

            function randomFloats(count, min, max) {
                const delta = max - min;
                return Array.from({ length: count }).map(() => Math.random() * delta + min);
            }
            
            const boxplotData = {
                labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16',
                    '17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35'],
                datasets: [
                    {
                        x: 8,
                        y: 16,
                        z: 2,
                        label: 'Alabama Districts',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        borderColor: 'red',
                        borderWidth: 1,
                        outlierColor: '#999999',
                        padding: 10,
                        itemRadius: 0,
                        data: [
                            randomFloats(100, 0.05, .1),
                            randomFloats(100, 0.06, .12),
                            randomFloats(100, .06, .14),
                            randomFloats(100, .07, .16),
                            randomFloats(40, .07, .18),
                            randomFloats(100, .07, .2),
                            randomFloats(100, .09, .22),
                            randomFloats(100, .14, .24),
                            randomFloats(100, .15, .26),
                            randomFloats(100, .14, .28),
                            randomFloats(100, .16, .30),
                            randomFloats(40, .18, .32),
                            randomFloats(100, .22, .34),
                            randomFloats(100, .25, .38),
                            randomFloats(100, .34, .40),
                            randomFloats(100, .30, .42),
                            randomFloats(100, .35, .44),
                            randomFloats(100, .40, .46),
                            randomFloats(40, .42, .48),
                            randomFloats(100, .45, .49),
                            randomFloats(100, .45, .50),
                            randomFloats(100, .45, .52),
                            randomFloats(100, .48, .53),
                            randomFloats(100, .49, .54),
                            randomFloats(100, .5, .55),
                            randomFloats(40, .42, .58),
                            randomFloats(100, .48, .60),
                            randomFloats(100, .55, .60),
                            randomFloats(100, .55, .62),
                            randomFloats(100, .58, .64),
                            randomFloats(100, .58, .68),
                            randomFloats(100, .62, .68),
                            randomFloats(40, .64, .70),
                            randomFloats(100, .68, .74),
                            randomFloats(40, .7, .76),
                        ],
                    },
                ],
            };

            const ctx = document.getElementById('canvas1').getContext('2d');
            Chart.getChart(ctx)?.destroy();
            window.myBar = new Chart(ctx, {
                type: 'boxplot',
                data: boxplotData,
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Indexed districts",
                            },
                            ticks: {
                              stepSize: 1
                            }
                        },
                        y: {
                            grace: '5%',
                            title: {
                                display: true,
                                text: "% Minority",
                            }
                        },
                    },
                    responsive: true,
                },
            });
        }, []);

        return <canvas id="canvas1" />;
    }
    function BoxPlotDelaware() {
        useEffect(() => {


            function randomFloats(count, min, max) {
                const delta = max - min;
                return Array.from({ length: count }).map(() => Math.random() * delta + min);
            }

            const boxplotData = {
                labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16',
                    '17','18','19','20','21'],
                datasets: [
                    {
                        x: 8,
                        y: 16,
                        z: 2,
                        label: 'Delaware Districts',
                        backgroundColor: 'rgba(3,138,255,0.5)',
                        borderColor: 'blue',
                        borderWidth: 1,
                        outlierColor: '#999999',
                        padding: 10,
                        itemRadius: 0,
                        data: [
                            randomFloats(100, 0.05, .1),
                            randomFloats(40, .07, .18),
                            randomFloats(100, .07, .2),
                            randomFloats(100, .09, .22),
                            randomFloats(100, .14, .24),
                            randomFloats(100, .15, .26),
                            randomFloats(100, .14, .28),
                            randomFloats(100, .16, .30),
                            randomFloats(40, .18, .32),
                            randomFloats(100, .30, .42),
                            randomFloats(100, .35, .44),
                            randomFloats(100, .40, .46),
                            randomFloats(40, .42, .48),
                            randomFloats(100, .45, .49),
                            randomFloats(100, .49, .54),
                            randomFloats(100, .5, .55),
                            randomFloats(40, .42, .58),
                            randomFloats(100, .55, .60),
                            randomFloats(100, .55, .62),
                            randomFloats(100, .58, .64),
                            randomFloats(100, .58, .68),
                            randomFloats(40, .64, .70),
                        ],
                    },
                ],
            };

            const ctx = document.getElementById('canvas2').getContext('2d');
            Chart.getChart(ctx)?.destroy();
            window.myBar = new Chart(ctx, {
                type: 'boxplot',
                data: boxplotData,
                options: {
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Indexed districts",
                            },
                            ticks: {
                                stepSize: 1
                            }
                        },
                        y: {
                            grace: '5%',
                            title: {
                                display: true,
                                text: "% Minority",
                            }
                        },
                    },
                    responsive: true,
                },
            });
        }, []);

        return <canvas id="canvas2" />;
    }
    const [race,setRace] = useState("white");
    const raceChange = (event) => {
        setRace(event.target.value);
    }
    return (
        <div className="App">

            <img src={logo} className="App-logo" alt="logo"/>
            <div className="title">You are currently looking at the&nbsp;
                <label>
                    <select style={{fontSize: "40px"}} value={race} onChange={raceChange}>
                        <option style={{fontSize: "20px"}} value="white">white</option>
                        <option style={{fontSize: "20px"}} value="black">black</option>
                    </select>
                </label>
                &nbsp;population.
            </div>

            <div className="State">
                <div className="center" style={{position: 'absolute', left: "12%", top: '715px'}}>ALABAMA</div>
            </div>
            <div className="State">
                <div className="center" style={{position: 'absolute', left: "72%", top: '715px'}}>DELAWARE</div>
            </div>
            <GetData mode={"density"} race={race}/>
            <div style={{
                color: 'black',
                borderRight: 'solid',
                height: '321px',
                width: '20%',
                left: '15%',
                transform: 'translateX(200px)',
                top: '350px',
                position: 'absolute'
            }}></div>

            <div style={{position: "absolute", top: "800px", width: '700px', height: '400px'}}>
                <div className="graph"></div>
                <Bar options={barOptionsAlabama} data={barDataAlabama}/>
                <div style={{marginBottom: "20px"}}></div>
                <Scatter options={scatterOptionsAlabama} data={scatterDataAlabama}/>
                <div style={{marginBottom: "20px"}}></div>
                <BoxPlotAlabama/>
            </div>


            <div style={{position: "absolute", top: "800px", left: "50%", width: '700px', height: '400px'}}>
                <Bar options={barOptionsDelaware} data={barDataDelaware}/>
                <div style={{marginBottom: "20px"}}></div>
                <Scatter options={scatterOptionsDelaware} data={scatterDataDelaware}/>
                <div style={{marginBottom: "20px"}}></div>
                <BoxPlotDelaware/>
            </div>

        </div>
    );

}

export default App;