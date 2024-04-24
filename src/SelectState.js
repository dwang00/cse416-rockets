import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { MapContainer, TileLayer, GeoJSON, SVGOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function SelectState({navbarHeight, geoJson, currState, setCurrState}) {
    const height = window.innerHeight - navbarHeight;
    
    const handleClick = (state) => () => {
        setCurrState(state);
    };

    return (
        <div className="w-100 d-flex justify-content-center" style={{height: `${height}px`}}>
            {!currState && 
                <MapContainer center={[34.793555, -83.440726]} 
                    zoom={5.5} zoomSnap={0.5} minZoom={4.5} maxZoom={7} zoomDelta={0.5}
                    maxBounds={[
                        [50.88407, -129.23004],
                        [22.51666, -62.44975]
                    ]}
                    style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: '#e6e6e6',
                    }}
                >
                {/* <SVGOverlay bounds={[
                    [50.88407, -129.23004],
                    [22.51666, -62.44975]
                ]}>
                    <rect x="0" y="0" width="100%" height="100%" fill="black" opacity="30%"></rect>
                    {geoJson ? 
                        <text x="52%" y="60%" fill="#f00840" fontSize="35px">Select one of the highlighted states</text>
                        : <text x="40%" y="50%" fill="#f00840" fontSize="35px" >Loading...</text>}
                </SVGOverlay> */}

                {geoJson && <GeoJSON
                    data={JSON.parse((geoJson)["al"])}
                    style={feature => ({
                        color: '#f00840',
                        weight: 0.2
                    })}
                    onEachFeature={(feature, layer) => {
                        layer.on({
                            click: handleClick("al")
                        })
                    }}
                />}

                {geoJson && <GeoJSON
                    data={JSON.parse((geoJson)["de"])}
                    style={feature => ({
                        color: '#f00840',
                        weight: 0.2
                    })}
                    onEachFeature={(feature, layer) => {
                        layer.on({
                            click: handleClick("de")
                        })
                    }}
                />}

                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                />

            </MapContainer>}
        </div>
    )
};

export default SelectState;