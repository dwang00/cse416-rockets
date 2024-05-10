import React, {useState} from "react";
import Slideshow from './Slideshow.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/js/bootstrap.js';
import StateAssemblyTable from "./StateAssemblyTable.js";
import StateDataSummary from "./StateDataSummary.js";
import DistrictMap from "./DistrictMap.js";
import HeatMap from "./Heatmap.js";

function StateTab({components, navbarHeight, geoJsons, currState, currTab}) {
    const height = window.innerHeight - navbarHeight;

    const fullName = {"al" : "ALABAMA", "de" : "DELAWARE"};
    const [selectedRowsData, setSelectedRowsData] = useState([]);
    console.log(currTab);

    return (
        <div className="w-100 d-flex " style={{height: `${height}px`, }}>
            <div className="w-50">
                {currTab == "summary" && <div className="w-100 h-100 justify-content-left position-relative" style={{borderStyle: 'solid'}}>
                    {geoJsons && <HeatMap race='white' state={currState} my_json={geoJsons[currState]} mode='default' selectedRows = {selectedRowsData}/>}
                </div>}
                {currTab == "analysis" && <div className="w-100 h-100" style={{borderStyle: 'solid'}}>scatter and gingles</div>}
                {currTab == "districts" && <div className="w-100 h-100" style={{borderStyle: 'solid'}}>opportunity district map</div>}
                {currTab == "plans" && <div className="w-100 h-100">generated plans w/ dropdown to select plan and button to toggle comparison</div>}
            </div>
            <div className="w-50 justify-content-right vstack">
                {currTab == "analysis" && <div className="w-100 h-100">ecological inference</div>}
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
                                <StateAssemblyTable state={fullName[currState]} setSelectedRowsData={setSelectedRowsData} selectedRowsData={selectedRowsData}/>
                            </div>
                            <div className="carousel-item" style={{height: "100%"}}>
                                {React.createElement(components[0].type, { ...components[0].props })}
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#houseIndicators" role="button" data-bs-slide="prev" style={{left: "-6%"}}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#houseIndicators" role="button" data-bs-slide="next" style={{right: "-6%"}}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </a>
                    </div>}
                </div>
                <div className="h-50 d-flex">
                    {currTab == "districts" && <div className="w-100 h-100" style={{borderStyle: 'solid'}}>opportunity district bar chart</div>}
                    {/* <Slideshow components={components}/> */}
                    {/* <StateDataSummary state={fullName[currState]}/> */}
                    {/* TODO */}
                    {currTab == "summary" && <div className="position-relative" style={{width:"35%", height:"100%"}}>
                        <StateDataSummary state={fullName[currState]}/>
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