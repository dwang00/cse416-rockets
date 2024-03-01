import logo from './rocketslogo.png';
import './App.css';
import { Bar, Scatter} from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
import Chart from 'chart.js/auto'
import GetData from "./get_data";
import React, { useState, useEffect } from 'react';
import Gerrymandering_Alabama from './Gerrymandering_Alabama';
import Gerrymandering_Delaware from "./Gerrymandering_Delaware";

const generateRandomNumber_large = () => faker.number.int({ min: 50, max: 75 });
const generateRandomNumber_med = () => faker.number.int({ min: 15, max: 35 });
const generateRandomNumber_small = () => faker.number.int({ min: 1, max: 10 });
Chart.register(BoxPlotController, BoxAndWiskers);
//const createArray = (length, callback) => Array.from({ length }, callback);

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
const barDataAlabama = {
    labels: ['Caucasian', 'African American'],
    datasets: [
        {
            label: 'Ethnicity of Alabama House Representatives',
            data: [generateRandomNumber_large(),generateRandomNumber_med()],
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
};

//DELAWARE STUFF ***********************************************************
const barDataDelaware = {
    labels: ['Caucasian', 'African American', 'Asian'],
    datasets: [
        {
            label: 'Ethnicity of Delaware House Representatives',
            data: [generateRandomNumber_large(),generateRandomNumber_med(),generateRandomNumber_small()],
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
};
function App() {


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
                <Gerrymandering_Alabama/>
            </div>


            <div style={{position: "absolute", top: "800px", left: "50%", width: '700px', height: '400px'}}>
                <Bar options={barOptionsDelaware} data={barDataDelaware}/>
                <div style={{marginBottom: "20px"}}></div>
                <Scatter options={scatterOptionsDelaware} data={scatterDataDelaware}/>
                <div style={{marginBottom: "20px"}}></div>
                <Gerrymandering_Delaware/>
            </div>

        </div>
    );

}
//
export default App;