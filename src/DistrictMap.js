import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { MapContainer, TileLayer, GeoJSON, Pane } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import StateDataSummary from "./StateDataSummary.js";

function DistrictMap({navbarHeight, geoJson, currState, setCurrState, fullName}) {
    const height = window.innerHeight - navbarHeight;

    const center_locations = {
        "al": [32.654, -86.66],
        "de": [39.15,-75.439787]
    };

    const default_zoom = {"al":6.5, "de":8.5};
    
    const handleClick = (state) => () => {
        setCurrState(state);
    };
    
    const tab20 = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c',
        '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5',
        '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f',
        '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];

    return (
        <div className="w-100 d-flex justify-content-center" style={{height: `${height}px`}}>
            {currState && 
                <MapContainer center={center_locations[currState]} 
                    zoom={default_zoom[currState]} 
                    zoomSnap={0.5} 
                    minZoom={default_zoom[currState]} 
                    // maxZoom={7} zoomDelta={0.5}
                    style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: '#e6e6e6',
                    }}
                >

                {/* <Pane pane="tooltipPane" style={{zIndex: 1000}}>
                    <StateDataSummary state={fullName}/>
                </Pane> */}

                {geoJson && <GeoJSON
                    data={JSON.parse((geoJson)[currState])}
                    style={feature => ({
                        color: tab20[feature.id%20],
                        weight: 1.5,
                        fillOpacity: 0.4,
                        opacity: 1
                    })}
                    onEachFeature={(feature, layer) => {
                        layer.on({
                            click: handleClick(currState)
                        })
                    }}
                    pane="overlayPane"
                />}

                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    // url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                    pane="tilePane"
                />

            </MapContainer>}
        </div>
    )
};

export default DistrictMap;