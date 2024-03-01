import React, { useState, useEffect } from 'react';
// import { useFetch } from 'react-fetch';
import 'leaflet/dist/leaflet.css';
// import { MapContainer, GeoJSON } from 'react-leaflet';
import GenState from "./gen_state";
import GenGraph from "./gen_graph";
// pass in parameters mode/race.
function MyComponent(props) {
    const [geojsonData, setGeojsonData] = useState({'al':null, 'de':null, 'sums':null});

    useEffect(() => {

        fetch('http://localhost:3021/get_geojson') // Replace with your Flask endpoint
            .then(response => response.json())
            .then(data => setGeojsonData(data))
            .catch(error => console.error(error));
    }, []);

    return (<div>
        <GenState {...props} my_json={geojsonData} state={'de'}/>
        <GenState {...props} my_json={geojsonData} state={'al'}/>
        {geojsonData['sums'] && <GenGraph {...props} my_json={geojsonData} />}
    </div>)
}
export default MyComponent;