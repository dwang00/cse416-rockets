import React, {useState, useEffect} from "react";
import Slideshow from './Slideshow.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/js/bootstrap.js';
import StateAssemblyTable from "./StateAssemblyTable.js";
import StateDataSummary from "./StateDataSummary.js";
import HeatMap from "./Heatmap.js";
import EcoInf from "./EcoInf";
import Gerrymandering_Graph from "./Gerrymandering_Graph";
import Gingles_Graph from "./Gingles_Graph";
function StateTab({components, navbarHeight, geoJsons, currState, currTab}) {
    const height = window.innerHeight - navbarHeight;

    const fullName = {"al" : "ALABAMA", "de" : "DELAWARE"};
    const [selectedRowsData, setSelectedRowsData] = useState([]);
    //console.log("IM IN STATE TAB 1")
    //console.log(selectedRowsData);
    //console.log("IM IN STATE TAB 2")

    const [selectedGinglesRace, setSelectedGinglesRace] = useState("caucasian");
    const [selectedGinglesTable, setSelectedGinglesTable] = useState("")

    const [selectedGerrymanderingRace, setSelectedGerrymanderingRace] = useState("caucasian");
    const [selectedGerrymanderingEnsemble, setSelectedGerrymanderingEnsemble] = useState("250")
    const [selectedGerrymanderingParty, setSelectedGerrymanderingParty] = useState("democratic")

    const [selectedEcoInfOption, setSelectedEcoInfOption] = useState("Presidential");

    const handleGinglesOptionChange = (option) => {
        setSelectedGinglesRace(option);
    };
    const handleGerrymanderingRaceChange = (option) => {
        setSelectedGerrymanderingRace(option);
    };
    const handleGerrymanderingPartyChange = (option) => {
        setSelectedGerrymanderingParty(option);
    };
    const handleGerrymanderingEnsembleChange = (option) => {
      setSelectedGerrymanderingEnsemble(option)
    };
    const handleEcoInfOptionChange = (option) => {
        setSelectedEcoInfOption(option);
    };
    const [currDistrict, setCurrDistrict] = useState(null);
    const [map, setMap] = useState(null);
    const [isDensity, setIsDensity] = useState(false);

    useEffect(() => {
        setCurrDistrict(null);
        setIsDensity(false);
    }, [currTab]);

    return (
        <div className="w-100 d-flex" style={{height: `${height}px`, }}>
            {/* <div className="w-100 justify-content-left"> */}
                {currTab == "summary" && <div className= "h-100 justify-content-left position-relative overflow-hidden" style={{width: "40%", borderStyle: 'solid'}}>
                    {geoJsons && <HeatMap race='white' map={map} isDensity={isDensity} setIsDensity={setIsDensity} setMap={setMap} state={currState} my_json={geoJsons[currState]} mode='default' currDistrict={currDistrict} setCurrDistrict={setCurrDistrict}/>}
                </div>}
                {currTab == "analysis" && (
                    <div className="w-100 h-100" style={{borderStyle: 'solid'}}>
                        scatter and gingles
                        <select value={selectedGinglesRace}
                                onChange={(e) => handleGinglesOptionChange(e.target.value)}>
                            <option value="caucasian">Caucasian</option>
                            <option value="african_american">African American</option>

                        </select>
                        <button onClick={() => setSelectedGinglesTable(prevState => !prevState)}>
                            {selectedGinglesTable ? "Hide Table" : "Show Table"}
                        </button>
                        <Gingles_Graph state={fullName[currState]} race={selectedGinglesRace}
                                       table={selectedGinglesTable}/>
                    </div>
                )}
                {currTab == "districts" &&
                    <div className="w-100 h-100" style={{borderStyle: 'solid'}}>opportunity district map</div>}
                {currTab == "plans" && (<div className="w-100 h-100">
                    generated plans w/ dropdown to select plan and button to toggle comparison
                    <div>
                        <select value={selectedGerrymanderingRace}
                                onChange={(e) => handleGerrymanderingRaceChange(e.target.value)}>
                            <option value="white">Caucasian</option>
                            <option value="black">African American</option>
                        </select>
                        <select value={selectedGerrymanderingEnsemble}
                                onChange={(e) => handleGerrymanderingEnsembleChange(e.target.value)}>
                            <option value={250}>Small Ensemble</option>
                            <option value={5000}>Large Ensembles</option>
                        </select>
                        <Gerrymandering_Graph state={fullName[currState]} chartId={`chart${fullName[currState]}1`}
                                              typeOfBox={selectedGerrymanderingRace}
                                              typeOfPoint="initial_partition_White"
                                              ensemble = {selectedGerrymanderingEnsemble}
                                              style={{display: "inline-block"}}/>,

                        <select value={selectedGerrymanderingParty}
                                onChange={(e) => handleGerrymanderingPartyChange(e.target.value)}>
                            <option value="democratic">Democrat</option>
                            <option value="republican">Republican</option>
                        </select>
                        <select value={selectedGerrymanderingEnsemble}
                                onChange={(e) => handleGerrymanderingEnsembleChange(e.target.value)}>
                            <option value={250}>Small Ensemble</option>
                            <option value={5000}>Large Ensembles</option>
                        </select>
                        <Gerrymandering_Graph state={fullName[currState]} chartId={`chart${fullName[currState]}1`}
                                              typeOfBox={selectedGerrymanderingParty}
                                              typeOfPoint="initial_partition_White"
                                              ensemble = {selectedGerrymanderingEnsemble}
                                              style={{display: "inline-block"}}/>,
                    </div>
                </div>)}
            {/* </div> */}
            <div className="justify-content-right vstack" style={{width: "60%"}}>
                {/* {currTab == "analysis" && (<div className="w-100 h-100">
                    ecological inference
                    <select value={selectedEcoInfOption} onChange={(e) => handleEcoInfOptionChange(e.target.value)}>
                        <option value="Presidential">Presidential</option>
                        {fullName[currState] === "ALABAMA" ? (
                            <option value="Governor">Governor</option>
                        ) : (
                            <option value="RepInCongress">Representative in Congress</option>
                        )}
                    </select>
                    <div>
                        <EcoInf state={fullName[currState]}
                                election= {selectedEcoInfOption}
                                width={window.innerWidth * 0.8}
                                height={window.innerHeight * 0.8}/>
                    </div>
                </div>)} */}
                
                {currTab == "summary" && 
                    <div className="d-flex overflow-auto h-50" style={{borderStyle:"solid", }}>
                            <StateAssemblyTable state={fullName[currState]} map={map} setMap={setMap} currDistrict={currDistrict} setCurrDistrict={setCurrDistrict}/>          
                    </div>
                }
                {currTab == "districts" && <div className="w-100 h-100" style={{borderStyle: 'solid'}}>opportunity district table</div>}
                {currTab == "districts" && <div className="w-100 h-100" style={{borderStyle: 'solid'}}>opportunity district bar chart</div>}
                {/* TODO Fix Height & text formatting */}
                <div className="d-flex flex-row h-50 overflow-hidden">
                    {currTab == "summary" &&
                        <div className="justify-content-left h-100" style={{width: isDensity ? "60%" : "100%"}}>
                            <StateDataSummary state={fullName[currState]} />
                        </div>
                    }
                    {currTab == "summary" && isDensity && 
                        <div className="w-100 h-100" style={{borderStyle: "solid"}}>
                            {React.createElement(components[0].type, { ...components[0].props })}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default StateTab;