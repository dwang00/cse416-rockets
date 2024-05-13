import React from "react";
import GetData from "./get_data";
import Slideshow from './Slideshow.js';
import 'bootstrap/dist/css/bootstrap.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/js/bootstrap.js';
import StateAssemblyTable from "./StateAssemblyTable.js";
import StateDataSummary from "./StateDataSummary.js";
import HeatMap from "./Heatmap.js";
import EcoInf from "./EcoInf";
import Gerrymandering_Graph from "./Gerrymandering_Graph";
import Gingles_Graph from "./Gingles_Graph";
import OpportunityDistrictBarChart from "./OpportunityDistrictBarChart";
import OpportunityDistrictTable from "./OpportunityDistrictTable";
function StateTab({components, navbarHeight, geoJsons, precinct, currState, currTab, setCurrTab}) {
    const height = window.innerHeight - navbarHeight;
    return (
        <div className="w-100 d-flex" style={{height: `${height}px`, }}>
        {currTab == "districts" &&
            <div className="h-100 w-100 flex-column d-flex">
                <div className="w-100 h-100" style={{borderStyle: 'solid'}}>
                <div className="w-100 h-100 d-flex justify-content-center">
                    <div style={{height:"5%", padding:"5px"}}>
                            <select value={selectedGerrymanderingRace}
                                    onChange={(e) => handleGerrymanderingRaceChange(e.target.value)}>
                                <option value="white">Caucasian</option>
                                <option value="black">African American</option>
                            </select>
                            <select value={selectedGerrymanderingEnsemble}
                                    onChange={(e) => handleGerrymanderingEnsembleChange(e.target.value)}>
                                <option value={250}>Ensemble - 250 plans</option>
                                <option value={5000}>Ensemble - 5,000 plans</option>
                            </select>
                            <select value={selectedGerrymanderingPoints} onChange={(e) => handleGerrymanderingPointsChange(e.target.value)}>
                                {selectedGerrymanderingRace === "white" ? (
                                    <>
                                        <option value="initial_partition_White">Enacted
                                        </option>
                                        <option value="max_White_for_White_@0.37">Partition with Most White Opportunity
                                            Districts at 0.37 threshold
                                        </option>
                                        <option value="min_White_for_White_@0.37">Partition with Least White Opportunity
                                            Districts at 0.37 threshold
                                        </option>
                                        <option value="max_White_for_White_@0.5">Partition with Most White Opportunity
                                            Districts at 0.5 threshold
                                        </option>
                                        <option value="min_White_for_White_@0.5">Partition with Least White Opportunity
                                            Districts at 0.5 threshold
                                        </option>
                                        <option value="max_White_for_White_@0.44">Partition with Most White Opportunity
                                            Districts at 0.44 threshold
                                        </option>
                                        <option value="min_White_for_White_@0.44">Partition with Least White Opportunity
                                            Districts at 0.44 threshold
                                        </option>
                                        <option value="max_Black_for_White_@0.37">Partition with Most Black Opportunity
                                            Districts at 0.37 threshold
                                        </option>
                                        <option value="min_Black_for_White_@0.37">Partition with Least Black Opportunity
                                            Districts at 0.37 threshold
                                        </option>
                                        <option value="max_Black_for_White_@0.5">Partition with Most Black Opportunity
                                            Districts at 0.5 threshold
                                        </option>
                                        <option value="min_Black_for_White_@0.5">Partition with Least Black Opportunity
                                            Districts at 0.5 threshold
                                        </option>
                                        <option value="max_Black_for_White_@0.44">Partition with Most Black Opportunity
                                            Districts at 0.44 threshold
                                        </option>
                                        <option value="min_Black_for_White_@0.44">Partition with Least Black Opportunity
                                            Districts at 0.44 threshold
                                        </option>
                                    </>
                                ) : (
                                    <>
                                        <option value="initial_partition_Black">Enacted
                                        </option>
                                        <option value="max_White_for_Black_@0.37">Partition with Most White Opportunity
                                            Districts at 0.37 threshold
                                        </option>
                                        <option value="min_White_for_Black_@0.37">Partition with Least White Opportunity
                                            Districts at 0.37 threshold
                                        </option>
                                        <option value="max_White_for_Black_@0.5">Partition with Most White Opportunity
                                            Districts at 0.5 threshold
                                        </option>
                                        <option value="min_White_for_Black_@0.5">Partition with Least White Opportunity
                                            Districts at 0.5 threshold
                                        </option>
                                        <option value="max_White_for_Black_@0.44">Partition with Most White Opportunity
                                            Districts at 0.44 threshold
                                        </option>
                                        <option value="min_White_for_Black_@0.44">Partition with Least White Opportunity
                                            Districts at 0.44 threshold
                                        </option>
                                        <option value="max_Black_for_Black_@0.37">Partition with Most Black Opportunity
                                            Districts at 0.37 threshold
                                        </option>
                                        <option value="min_Black_for_Black_@0.37">Partition with Least Black Opportunity
                                            Districts at 0.37 threshold
                                        </option>
                                        <option value="max_Black_for_Black_@0.5">Partition with Most Black Opportunity
                                            Districts at 0.5 threshold
                                        </option>
                                        <option value="min_Black_for_Black_@0.5">Partition with Least Black Opportunity
                                            Districts at 0.5 threshold
                                        </option>
                                        <option value="max_Black_for_Black_@0.44">Partition with Most Black Opportunity
                                            Districts at 0.44 threshold
                                        </option>
                                        <option value="min_Black_for_Black_@0.44">Partition with Least Black Opportunity
                                            Districts at 0.44 threshold
                                        </option>
                                    </>
                                )}
                            </select>
                        <Gerrymandering_Graph state={fullName[currState]} chartId={`chart${fullName[currState]}1`}
                                                  typeOfBox={selectedGerrymanderingRace}
                                                  typeOfPoint={selectedGerrymanderingPoints}
                                                  ensemble={selectedGerrymanderingEnsemble}

                                                  style={{display: "inline-block"}}/>
                </div>
                </div>
                </div>
                <div className="d-flex flex-row h-100" > 
                    <div className="w-50" style={{height: "95%", borderTop:"solid", }}>   
                    {React.createElement(components[0].type, {...components[0].props})}
                    </div>
                <div className="w-50 h-100 fw-bold" style={{borderStyle: 'solid', borderBottom:"0px", fontSize:"21px"}}>
                    Opportunity Districts per Plan
                    <div className="h-75">
                        {/* <select value={selectedOppBarRace}
                                onChange={(e) => handleOppBarRaceChange(e.target.value)}>
                            <option value="white">Caucasian</option>
                            <option value="black">African American</option>
                        </select> */}
                        <select value={selectedOppBarEnsemble}
                                onChange={(e) => handleOppBarEnsembleChange(e.target.value)}>
                            <option value={250}>Small Ensemble - 250 Plans</option>
                            <option value={5000}>Large Ensembles - 5,000 Plans</option>
                        </select>
                        <select value={selectedOppBarThreshold}
                                onChange={(e) => handleOppBarThresholdChange(e.target.value)}>
                            <option value="t37">District Plan at .37 Threshold
                            </option>
                            <option value="t5">District Plan at .5 Threshold
                            </option>
                            <option value="t44"> District Plan at .44 Threshold

                            </option>
                        </select>
                        <OpportunityDistrictBarChart state={fullName[currState]} race={"black"}
                                                    threshold={selectedOppBarThreshold}
                                                    ensemble={selectedOppBarEnsemble}/>
                    </div>
                </div>
                </div>
            </div>}
            {/* <div className="w-100 justify-content-left"> */}
                {currTab == "summary" && <div className= "h-100 justify-content-left position-relative overflow-hidden" style={{width: "40%", borderStyle: 'solid'}}>
                    {geoJsons && <HeatMap race='white' map={map} isDensity={isDensity} setIsDensity={setIsDensity} setMap={setMap} state={currState} my_json={geoJsons[currState]} mode='default' currDistrict={currDistrict} setCurrDistrict={setCurrDistrict}/>}
                </div>}
                {currTab == "analysis" && (
                    <div className="fw-bold w-100 h-100 d-flex flex-column" style={{borderStyle: 'solid', height:"3%", fontSize: "21px"}}>
                        Election Results
                        <div style={{height:"4%"}}>
                            <select value={selectedGinglesRace}
                                    onChange={(e) => handleGinglesRaceChange(e.target.value)}>
                                <option value="Caucasian">Caucasian</option>
                                <option value="African American">African American</option>

                            </select>
                            <select value = {selectedGinglesOption} onChange = {(e) => handleGinglesOptionChange(e.target.value)}>

                                <option value="scatter">Gingles 2/3 Analysis</option>
                                <option value = "table">Precinct by Precinct view</option>
                                <option value = "curve">Vote Share vs Seat Share</option>
                            </select>
                        </div>
                        <Gingles_Graph state={fullName[currState]} race={selectedGinglesRace}
                                       view={selectedGinglesOption}/>
                    </div>
                )}
            {(currTab == "analysis" ||currTab=="summary") && <div className="justify-content-right d-flex flex-column w-100 h-100" >
                {currTab == "analysis" && (<div className="w-100 h-100" style={{borderStyle:"solid"}}>
                    <div className= "fw-bold" style={{height:"5%", fontSize: "21px"}}>Ecological Inference</div>
                    <div style={{height: "5%"}}>
                    <select value={selectedEcoInfOption} onChange={(e) => handleEcoInfOptionChange(e.target.value)}>
                        <option value="Presidential">Presidential</option>
                        {fullName[currState] === "ALABAMA" ? (
                            <option value="Governor">Governor</option>
                        ) : (
                            <option value="RepInCongress">Representative in Congress</option>
                        )}
                    </select>
                    </div>
                    <div className="w-100" style={{height:"90%"}}>
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
                {/* TODO Fix Height & text formatting */}
                {currTab == "summary" &&
                    <div className="d-flex flex-row h-50 overflow-hidden" >
                        <div className="justify-content-left h-100" style={{width: "60%", cursor:"pointer"}} data-toggle="tooltip" data-placement="top" 
                        title="Click for election information" onClick={() => setCurrTab("analysis")}>
                            <StateDataSummary state={fullName[currState]}/>
                        </div>
                        <div className="w-100 h-100" style={{borderStyle: "solid"}}>
                            {React.createElement(components[0].type, {...components[0].props})}
                        </div>
                    </div>
                }
            </div>}
        </div>
    )
};

export default StateTab;