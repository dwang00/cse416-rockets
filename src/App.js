import logo from './rocketslogo.png';
import './App.css';
import GetData from "./get_data";
import React, { useState, useEffect } from 'react';


function App() {
    const [race,setRace] = useState("white");
    const raceChange = (event) => {
        setRace(event.target.value);
    }

  return (
    <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>

            <div className="title">You are currently looking at the
                <label>
                    <select style={{fontSize: "40px"}} value={race} onChange={raceChange}>
                        <option style={{fontSize: "20px"}} value="white">white</option>
                        <option style={{fontSize: "20px"}} value="black">black</option>
                    </select>
                </label>
                population
            </div>

            <img src={logo} className="App-logo" alt="logo"/>
        </header>
        <div className="StatesContainer">

        <div className="State">
                <div className="center">ALABAMA</div>

                <div className="graph">
                    <GetData mode={"density"} race={race}/>
                </div>

            </div>

            <div className="State">
                <div className="center">DELAWARE</div>
            </div>
        </div>
    </div>
  );
}

export default App;
