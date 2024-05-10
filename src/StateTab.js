import React from "react";
import Slideshow from './Slideshow.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'leaflet/dist/leaflet.css';
import Heatmap from "./Heatmap.js"
import StateAssemblyTable from "./StateAssemblyTable.js";
import StateDataSummary from "./StateDataSummary.js";

function StateTab({components, navbarHeight, geoJsons, state, setSelectedRowsData, selectedRowsData}) {
    const height = window.innerHeight - navbarHeight;

    const fullName = {"al" : "ALABAMA", "de" : "DELAWARE"};
    const handleSelectedRows = (selectedRowData) => {
        setSelectedRowsData(selectedRowData);
    };
    return (
        <div className="w-100 d-flex" style={{height: `${height}px`}}>
            <div className="w-50 d-flex justify-content-left">
                {geoJsons && <Heatmap race='white' state={state} my_json={geoJsons[state]} mode='density' selectedRows = {selectedRowsData}/>}
            </div>
            <div className="w-50 justify-content-right vstack">
                <div className="h-50 d-flex overflow-auto">
                    <StateAssemblyTable state={fullName[state]} onSelectRows={handleSelectedRows} selectedRowsData={selectedRowsData} setSelectedRowsData={setSelectedRowsData}/>
                    {/* <StateDataSummary state={fullName[state]}/> */}
                </div>
                <div className="h-50 d-flex">
                    <Slideshow components={components}/>
                </div>
            </div>
        </div>
    )
};

export default StateTab;