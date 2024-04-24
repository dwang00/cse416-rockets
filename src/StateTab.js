import React from "react";
import GetData from "./get_data";
import Slideshow from './Slideshow.js';
import 'bootstrap/dist/css/bootstrap.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


function StateTab({components, navbarHeight, geoJson}) {
    const height = window.innerHeight - navbarHeight;
    return (
        <div className="w-100 d-flex justify-content-center" style={{height: `${height}px`}}>
            {/* <Slideshow components={components} /> */}
            <MapContainer center={[34.793555, -83.440726]} zoom={5.5} zoomSnap={0.5} minZoom={4.5} maxZoom={7} zoomDelta={0.5}
                maxBounds={[
                    [50.88407, -129.23004],
                    [22.51666, -62.44975]
                ]}
                style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: '#e6e6e6',
                    }}>
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                />
            </MapContainer>
        </div>
    )
};

export default StateTab;