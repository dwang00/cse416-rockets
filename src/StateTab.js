import React from "react";
import Slideshow from './Slideshow.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'leaflet/dist/leaflet.css';
import Heatmap from "./Heatmap.js"
import StateAssemblyTable from "./StateAssemblyTable.js";
import StateDataSummary from "./StateDataSummary.js";


function StateTab({components, navbarHeight, geoJsons, state}) {
    const height = window.innerHeight - navbarHeight;

    const fullName = {"al" : "ALABAMA", "de" : "DELAWARE"};
    const tables = [
        <StateAssemblyTable state={fullName[state]}/>, 
        <StateDataSummary state={fullName[state]}/>
    ]

    return (
        <div className="w-100 d-flex" style={{height: `${height}px`}}>
            <div className="w-50 d-flex justify-content-left">
                {geoJsons && <Heatmap race='white' state={state} my_json={geoJsons[state]} mode='density'/>}
            </div>
            <div>
                <div>
                    {/* <Slideshow components={tables}/> */}
                </div>
                <div>
                {/* <Slideshow components={components}/> */}
                </div>
            </div>
        </div>
    )
};

export default StateTab;