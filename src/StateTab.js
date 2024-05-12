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

    const [selectedGerrymanderingOption, setSelectedGerrymanderingOption] = useState("caucasian");
    const [selectedEcoInfOption, setSelectedEcoInfOption] = useState("Presidential");

    const handleGinglesOptionChange = (option) => {
        setSelectedGinglesRace(option);
    };
    const handleGerrymanderingOptionChange = (option) => {
        setSelectedGerrymanderingOption(option);
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
                    <div>
                        <Gerrymandering_Graph state = {fullName[currState]} race = "caucasian" chartId="chartDelaware1" typeOfBox = "white" typeOfPoint = "initial_partition_White" style={{display:"inline-block"}}/>,
                    </div>
                </div>)}
            </div>
            <div className="w-50 justify-content-right vstack">
                {currTab == "analysis" && (<div className="w-100 h-100">
                    ecological inference
                    <select value={selectedEcoInfOption} onChange={(e) => handleEcoInfOptionChange(e.target.value)}>
                        <option value="Presidential">Presidential</option>
                        <option value="RepInCongress">Representative in Congress</option>
                        {/* Add more options if needed */}
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