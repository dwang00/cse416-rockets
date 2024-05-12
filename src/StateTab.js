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
import OpportunityDistrictBarChart from "./OpportunityDistrictBarChart";
function StateTab({components, navbarHeight, geoJsons, currState, currTab}) {
    const height = window.innerHeight - navbarHeight;

    const fullName = {"al" : "ALABAMA", "de" : "DELAWARE"};
    const [selectedRowsData, setSelectedRowsData] = useState([]);
    //console.log("IM IN STATE TAB 1")
    //console.log(selectedRowsData);
    //console.log("IM IN STATE TAB 2")

    const [selectedGinglesRace, setSelectedGinglesRace] = useState("caucasian");
    const [selectedGinglesTable, setSelectedGinglesTable] = useState("")

    const [selectedGerrymanderingRace, setSelectedGerrymanderingRace] = useState("black");
    const [selectedGerrymanderingEnsemble, setSelectedGerrymanderingEnsemble] = useState("250")
    const [selectedGerrymanderingPoints, setSelectedGerrymanderingPoints] = useState("initial_partition_Black")

    const [selectedGerrymanderingPoints2, setSelectedGerrymanderingPoints2] = useState("initial_partition_Democratic")
    const [selectedGerrymanderingEnsemble2, setSelectedGerrymanderingEnsemble2] = useState("250")
    const [selectedGerrymanderingParty, setSelectedGerrymanderingParty] = useState("democratic")

    const [selectedEcoInfOption, setSelectedEcoInfOption] = useState("Presidential");

    const [selectedOppBarRace, setSelectedOppBarRace] = useState("Black")
    const [selectedOppBarEnsemble, setSelectedOppBarEnsemble] = useState("250")
    const [selectedOppBarThreshold, setSelectedOppBarThreshold] = useState("t37")

    const handleGerrymanderingPointsChange = (option) => {
      setSelectedGerrymanderingPoints(option)
    };
    const handleGerrymanderingPointsChange2 = (option) => {
        setSelectedGerrymanderingPoints2(option)
    };
    const handleGinglesOptionChange = (option) => {
        console.log(option);
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
    const handleGerrymanderingEnsembleChange2 = (option) => {
        setSelectedGerrymanderingEnsemble2(option)
    };
    const handleEcoInfOptionChange = (option) => {
        setSelectedEcoInfOption(option);
    };
    const handleOppBarRaceChange = (option) => {
        setSelectedOppBarRace(option);
    }
    const handleOppBarEnsembleChange = (option) => {
        setSelectedOppBarEnsemble(option);
    }
    const handleOppBarThresholdChange = (option) => {
        setSelectedOppBarThreshold(option);
    }
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
                {currTab == "summary" && <div className= "h-100 justify-content-left position-relative overflow-hidden" style={{width: "60%", borderStyle: 'solid'}}>
                    {geoJsons && <HeatMap race='white' map={map} isDensity={isDensity} setIsDensity={setIsDensity} setMap={setMap} state={currState} my_json={geoJsons[currState]} mode='default' currDistrict={currDistrict} setCurrDistrict={setCurrDistrict}/>}
                </div>}
                {currTab == "analysis" && (
                    <div className="w-100 h-100" style={{borderStyle: 'solid'}}>
                        scatter and gingles
                        <select value={selectedGinglesRace}
                                onChange={(e) => handleGinglesOptionChange(e.target.value)}>
                            <option value="caucasian">Caucasian</option>
                            <option value="african american">African American</option>

                        </select>
                        <button onClick={() => setSelectedGinglesTable(prevState => !prevState)}>
                            {selectedGinglesTable ? "Hide Table" : "Show Table"}
                        </button>
                        {selectedGinglesRace === "caucasian" && <Gingles_Graph state={fullName[currState]} race={selectedGinglesRace}
                                       table={selectedGinglesTable}/>}
                        {selectedGinglesRace === "african american" && <Gingles_Graph state={fullName[currState]} race={selectedGinglesRace}
                                        table={selectedGinglesTable}/>}
                    </div>
                )}
                {currTab == "districts" &&
                    <div className="w-100 h-100" style={{borderStyle: 'solid'}}>opportunity district map</div>}
                {currTab == "plans" && (<div className="w-100 h-100">
                    generated plans w/ dropdown to select plan and button to toggle comparison
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <div style={{marginRight: "20px", flex: 1}}>
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
                            <select value={selectedGerrymanderingPoints} onChange={(e) => handleGerrymanderingPointsChange(e.target.value)}>
                                {selectedGerrymanderingRace === "white" ? (
                                    <>
                                        <option value="max_White_for_White_@0.37">partition with most white opportunity districts at 0.37 threshold</option>
                                        <option value="min_White_for_White_@0.37">partition with least white opportunity districts at 0.37 threshold</option>
                                        <option value="max_White_for_White_@0.5">partition with most white opportunity districts at 0.5 threshold</option>
                                        <option value="min_White_for_White_@0.5">partition with least white opportunity districts at 0.5 threshold</option>
                                        <option value="max_White_for_White_@0.6">partition with most white opportunity districts at 0.6 threshold</option>
                                        <option value="min_White_for_White_@0.6">partition with least white opportunity districts at 0.6 threshold</option>
                                        <option value="max_Black_for_White_@0.37">partition with most black opportunity districts at 0.37 threshold</option>
                                        <option value="min_Black_for_White_@0.37">partition with least black opportunity districts at 0.37 threshold</option>
                                        <option value="max_Black_for_White_@0.5">partition with most black opportunity districts at 0.5 threshold</option>
                                        <option value="min_Black_for_White_@0.5">partition with least black opportunity districts at 0.5 threshold</option>
                                        <option value="max_Black_for_White_@0.6">partition with most black opportunity  districts at 0.6 threshold</option>
                                        <option value="min_Black_for_White_@0.6">partition with least black opportunity districts at 0.6 threshold</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="max_White_for_Black_@0.37">partition with most white opportunity districts at 0.37 threshold</option>
                                        <option value="min_White_for_Black_@0.37">partition with least white opportunity districts at 0.37 threshold</option>
                                        <option value="max_White_for_Black_@0.5">partition with most white opportunity districts at 0.5 threshold</option>
                                        <option value="min_White_for_Black_@0.5">partition with least white opportunity districts at 0.5 threshold</option>
                                        <option value="max_White_for_Black_@0.6">partition with most white opportunity districts at 0.6 threshold</option>
                                        <option value="min_White_for_Black_@0.6">partition with least white opportunity districts at 0.6 threshold</option>
                                        <option value="max_Black_for_Black_@0.37">partition with most black opportunity districts at 0.37 threshold</option>
                                        <option value="min_Black_for_Black_@0.37">partition with least black opportunity districts at 0.37 threshold</option>
                                        <option value="max_Black_for_Black_@0.5">partition with most black opportunity districts at 0.5 threshold</option>
                                        <option value="min_Black_for_Black_@0.5">partition with least black opportunity districts at 0.5 threshold</option>
                                        <option value="max_Black_for_Black_@0.6">partition with most black opportunity districts at 0.6 threshold</option>
                                        <option value="min_Black_for_Black_@0.6">partition with least black opportunity districts at 0.6 threshold</option>
                                    </>
                                )}
                            </select>
                            <Gerrymandering_Graph state={fullName[currState]} chartId={`chart${fullName[currState]}1`}
                                                  typeOfBox={selectedGerrymanderingRace}
                                                  typeOfPoint={selectedGerrymanderingPoints}
                                                  ensemble={selectedGerrymanderingEnsemble}
                                                  style={{display: "inline-block"}}/>,
                        </div>


                        <div style={{flex: 1}}>
                            <select value={selectedGerrymanderingParty}
                                    onChange={(e) => handleGerrymanderingPartyChange(e.target.value)}>
                                <option value="democratic">Democrat</option>
                                <option value="republican">Republican</option>
                            </select>
                            <select value={selectedGerrymanderingEnsemble2}
                                    onChange={(e) => handleGerrymanderingEnsembleChange2(e.target.value)}>
                                <option value={250}>Small Ensemble</option>
                                <option value={5000}>Large Ensembles</option>
                            </select>
                            <select value={selectedGerrymanderingPoints2}
                                    onChange={(e) => handleGerrymanderingPointsChange2(e.target.value)}>
                                {selectedGerrymanderingParty === "democratic" ? (
                                    <>
                                        <option value="max_White_for_Democratic_@0.37">partition with most white opportunity districts at 0.37 threshold</option>
                                        <option value="min_White_for_Democratic_@0.37">partition with least white opportunity districts at 0.37 threshold</option>
                                        <option value="max_White_for_Democratic_@0.5">partition with most white opportunity districts at 0.5 threshold</option>
                                        <option value="min_White_for_Democratic_@0.5">partition with least white opportunity districts at 0.5 threshold</option>
                                        <option value="max_White_for_Democratic_@0.6">partition with most white opportunity districts at 0.6 threshold</option>
                                        <option value="min_White_for_Democratic_@0.6">partition with least white opportunity districts at 0.6 threshold</option>
                                        <option value="max_Black_for_Democratic_@0.37">partition with most black opportunity districts at 0.37 threshold</option>
                                        <option value="min_Black_for_Democratic_@0.37">partition with least black opportunity districts at 0.37 threshold</option>
                                        <option value="max_Black_for_Democratic_@0.5">partition with most black opportunity districts at 0.5 threshold</option>
                                        <option value="min_Black_for_Democratic_@0.5">partition with least black opportunity districts at 0.5 threshold</option>
                                        <option value="max_Black_for_Democratic_@0.6">partition with most black opportunity  districts at 0.6 threshold</option>
                                        <option value="min_Black_for_Democratic_@0.6">partition with least black opportunity districts at 0.6 threshold</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="max_White_for_Republican_@0.37">partition with most white opportunity districts at 0.37 threshold</option>
                                        <option value="min_White_for_Republican_@0.37">partition with least white opportunity districts at 0.37 threshold</option>
                                        <option value="max_White_for_Republican_@0.5">partition with most white opportunity districts at 0.5 threshold</option>
                                        <option value="min_White_for_Republican_@0.5">partition with least white opportunity districts at 0.5 threshold</option>
                                        <option value="max_White_for_Republican_@0.6">partition with most white opportunity districts at 0.6 threshold</option>
                                        <option value="min_White_for_Republican_@0.6">partition with least white opportunity districts at 0.6 threshold</option>
                                        <option value="max_Black_for_Republican_@0.37">partition with most black opportunity districts at 0.37 threshold</option>
                                        <option value="min_Black_for_Republican_@0.37">partition with least black opportunity districts at 0.37 threshold</option>
                                        <option value="max_Black_for_Republican_@0.5">partition with most black opportunity districts at 0.5 threshold</option>
                                        <option value="min_Black_for_Republican_@0.5">partition with least black opportunity districts at 0.5 threshold</option>
                                        <option value="max_Black_for_Republican_@0.6">partition with most black opportunity districts at 0.6 threshold</option>
                                        <option value="min_Black_for_Republican_@0.6">partition with least black opportunity districts at 0.6 threshold</option>
                                    </>
                                )}
                            </select>
                            <Gerrymandering_Graph state={fullName[currState]} chartId={`chart${fullName[currState]}2`}
                                                  typeOfBox={selectedGerrymanderingParty}
                                                  typeOfPoint={selectedGerrymanderingPoints2}
                                                  ensemble={selectedGerrymanderingEnsemble2}
                                                  style={{display: "inline-block"}}/>,
                        </div>
                    </div>
                </div>)}
            {/* </div> */}
            <div className="justify-content-right d-flex flex-column w-100 h-100" >
                {currTab == "analysis" && (<div className="w-100 h-100" style={{borderStyle:"solid"}}>
                    ecological inference
                    <select value={selectedEcoInfOption} onChange={(e) => handleEcoInfOptionChange(e.target.value)}>
                        <option value="Presidential">Presidential</option>
                        {fullName[currState] === "ALABAMA" ? (
                            <option value="Governor">Governor</option>
                        ) : (
                            <option value="RepInCongress">Representative in Congress</option>
                        )}
                    </select>
                    <div className="w-100" style={{height:"96%"}}>
                        <EcoInf state={fullName[currState]}
                                election= {selectedEcoInfOption}
                                width={window.innerWidth * 0.8}
                                height={window.innerHeight * 0.8}/>
                    </div>
                </div>)}
                
                {currTab == "summary" && 
                    <div className="d-flex overflow-auto h-50" style={{borderStyle:"solid", }}>
                            <StateAssemblyTable state={fullName[currState]} map={map} setMap={setMap} currDistrict={currDistrict} setCurrDistrict={setCurrDistrict}/>          
                    </div>
                }
                {currTab == "districts" && <div className="w-100 h-100" style={{borderStyle: 'solid'}}>opportunity district table</div>}
                {currTab == "districts" && (<div className="w-100 h-100" style={{borderStyle: 'solid'}}>
                    opportunity district bar chart
                    <div>
                        <OpportunityDistrictBarChart state = {fullName[currState]} race = {selectedOppBarRace} threshold={selectedOppBarThreshold} ensemble={selectedOppBarEnsemble}/>
                    </div>
                </div>)}
                {/* TODO Fix Height & text formatting */}
                {currTab == "summary" && 
                <div className="d-flex flex-row h-50 overflow-hidden">
                    <div className="justify-content-left h-100" style={{width: isDensity ? "60%" : "100%"}}>
                        <StateDataSummary state={fullName[currState]} />
                    </div>
                    {isDensity && 
                        <div className="w-100 h-100" style={{borderStyle: "solid"}}>
                            {React.createElement(components[0].type, { ...components[0].props })}
                        </div>
                    }
                </div>
                }
            </div>
        </div>
    )
};

export default StateTab;