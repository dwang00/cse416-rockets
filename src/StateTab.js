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

    const [currDistrict, setCurrDistrict] = useState(null);
    const [map, setMap] = useState(null);
    const [isDensity, setIsDensity] = useState(false);

    useEffect(() => {
        setCurrDistrict(null);
    }, [currTab]);

    return (
        <div className="w-100 d-flex " style={{height: `${height}px`, }}>
            <div className="w-50">
                {currTab == "summary" && <div className="w-100 h-100 justify-content-left position-relative" style={{borderStyle: 'solid'}}>
                    {geoJsons && <HeatMap race='white' map={map} isDensity={isDensity} setIsDensity={setIsDensity} setMap={setMap} state={currState} my_json={geoJsons[currState]} mode='default' currDistrict={currDistrict} setCurrDistrict={setCurrDistrict}/>}
                </div>}
                {currTab == "analysis" && (<div className="w-100 h-100" style={{borderStyle: 'solid'}}>
                    <Gingles_Graph state = {fullName[currState]} race = "caucasian"/>
                </div>)}
                {currTab == "districts" && <div className="w-100 h-100" style={{borderStyle: 'solid'}}>opportunity district map</div>}
                {currTab == "plans" && (<div className="w-100 h-100">
                    generated plans w/ dropdown to select plan and button to toggle comparison
                    <div>
                        <Gerrymandering_Graph state = {fullName[currState]} race = "caucasian" chartId="chartDelaware1" typeOfBox = "white" typeOfPoint = "initial_partition_White" style={{display:"inline-block"}}/>,
                    </div>
                </div>)}
            </div>
            <div className="w-50 justify-content-right vstack">
                {currTab == "analysis" && (<div className="w-100 h-100">
                    {/* <div>
                        <EcoInf state = "DELAWARE"
                                election = "Presidential"
                                width={window.innerWidth * 0.8}
                                height={window.innerHeight * 0.8}/>
                    </div> */}
                </div>)}
                
                {currTab == "summary" && 
                    <div className="w-100 d-flex overflow-auto" style={{height: isDensity ? "50%" : "100%", borderStyle:"solid"}}>
                            <StateAssemblyTable state={fullName[currState]} map={map} setMap={setMap} currDistrict={currDistrict} setCurrDistrict={setCurrDistrict}/>          
                    </div>
                }
                {currTab == "districts" && <div className="w-100 h-100" style={{borderStyle: 'solid'}}>opportunity district table</div>}
                {currTab == "districts" && <div className="w-100 h-100" style={{borderStyle: 'solid'}}>opportunity district bar chart</div>}
                {/* TODO Fix Height & text formatting */}
                {currTab == "summary" && isDensity && 
                    <div className="h-50 d-flex" style={{borderStyle:"solid"}}>
                        {React.createElement(components[0].type, { ...components[0].props })}
                    </div>}
            </div>
        </div>
    )
};

export default StateTab;