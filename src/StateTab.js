import React, {useState} from "react";
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
    console.log(currTab);
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
    const handleGerrymanderingPointsChange = (option) => {
      setSelectedGerrymanderingPoints(option)
    };
    const handleGerrymanderingPointsChange2 = (option) => {
        setSelectedGerrymanderingPoints2(option)
    };
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
    const handleGerrymanderingEnsembleChange2 = (option) => {
        setSelectedGerrymanderingEnsemble2(option)
    };
    const handleEcoInfOptionChange = (option) => {
        setSelectedEcoInfOption(option);
    };
    const [currDistrict, setCurrDistrict] = useState(null);
    const [map, setMap] = useState(null);

    return (
        <div className="w-100 d-flex " style={{height: `${height}px`, }}>
            <div className="w-50">
                {currTab == "summary" && <div className="w-100 h-100 justify-content-left position-relative" style={{borderStyle: 'solid'}}>
                    {geoJsons && <HeatMap race='white' map={map} setMap={setMap} state={currState} my_json={geoJsons[currState]} mode='default' currDistrict={currDistrict} setCurrDistrict={setCurrDistrict}/>}
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
            </div>
            <div className="w-50 justify-content-right vstack">
                {currTab == "analysis" && (<div className="w-100 h-100">
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
                </div>)}
                <div className="w-100 h-50 d-flex">
                    {/* <StateAssemblyTable state={fullName[currState]} setSelectedRowsData={setSelectedRowsData} selectedRowsData={selectedRowsData}/> */}
                    {/* <StateDataSummary state={fullName[state]}/> */}
                    {currTab == "districts" && <div className="w-100 h-100" style={{borderStyle: 'solid'}}>opportunity district table</div>}
                    {currTab == "summary" && <div id="houseIndicators" className="carousel slide align-self-center" data-bs-interval="false" style={{height: "100%", width: "100%"}}>
                        <ol className="carousel-indicators" style={{bottom: "-5%"}}>
                            <button data-bs-target="#houseIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button data-bs-target="#houseIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        </ol>
                        <div className="carousel-inner" style={{height: "100%", backgroundColor: '#e6e6e6', borderStyle: 'solid',}}>
                            <div className="carousel-item active overflow-auto" style={{height: "100%"}}>
                                <StateAssemblyTable state={fullName[currState]} map={map} setMap={setMap} currDistrict={currDistrict} setCurrDistrict={setCurrDistrict}/>
                            </div>
                            <div className="carousel-item" style={{height: "100%"}}>
                                {React.createElement(components[0].type, { ...components[0].props })}
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#houseIndicators" role="button" data-bs-slide="prev" style={{left: "-6%"}}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </a>
                        {/* <a className="carousel-control-next" href="#houseIndicators" role="button" data-bs-slide="next" style={{right: "-6%"}}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </a> */}
                    </div>}
                </div>
                <div className="h-50 d-flex">
                    {currTab == "districts" && <div className="w-100 h-100" style={{borderStyle: 'solid'}}>opportunity district bar chart</div>}
                    {/* <Slideshow components={components}/> */}
                    {/* <StateDataSummary state={fullName[currState]}/> */}
                    {/* TODO */}
                    {currTab == "summary" && <div className="position-relative" style={{width:"35%", height:"100%"}}>
                        {/* <StateDataSummary state={fullName[currState]}/> */}
                        <span>State/District race & political party charts go here</span>
                    </div>
                    }
                    {/* TODO Fix Height & text formatting */}
                </div>
            </div>
        </div>
    )
};

export default StateTab;