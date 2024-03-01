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

        <img src={logo} className="App-logo" alt="logo"/>

        <div className="title">This is the&nbsp;
            <label>
                <select style={{fontSize:"40px"}} value={race} onChange={raceChange}>
                    <option style={{fontSize:"20px"}} value="white"> white </option>
                    <option style={{fontSize:"20px"}} value="black"> black </option>
                </select>
            </label>
            &nbsp;population.
        </div>

        <div className="State">
            <div className="center" style={{position:'absolute', left:"12%", top:'810px'}}>ALABAMA</div>
        </div>
        <div className="State">
            <div className="center" style={{position:'absolute', left:"72%", top:'810px'}}>DELAWARE</div>
        </div>

        <GetData mode={"density"} race={race}/>

        <div style={{color:'black',
                    borderRight:'solid',
                    height:'321px',
                    left:'50%',
                    top:'350px',
                    position:'absolute'}}></div>
    </div>
  );
}

export default App;
