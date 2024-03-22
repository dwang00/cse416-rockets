import React, { useState, useEffect } from 'react';
// import { useFetch } from 'react-fetch';
import 'leaflet/dist/leaflet.css';
// import { MapContainer, GeoJSON } from 'react-leaflet';
import GenState from "./gen_state";
import GenGraph from "./gen_graph";
import 'bootstrap/dist/css/bootstrap.css';


// pass in parameters mode/race.
function MyComponent(props) {
    const [geojsonData, setGeojsonData] = useState({'al':null, 'de':null, 'sums':null});

    useEffect(() => {
        fetch('http://localhost:8080/get_geojson/all')
            .then(response => response.json())
            .then(data => {
                console.log('type:',typeof(data[0]));
                console.log('Received data from Spring:', data[0]);
                setGeojsonData(data[0]);
            })
            .catch(error => console.error(error));
    }, []);

    return (<div className="row">
        <GenState {...props} my_json={geojsonData} state={'al'}/>
        <GenState {...props} my_json={geojsonData} state={'de'}/>
        {geojsonData['sums'] && <GenGraph {...props} my_json={geojsonData} />}
    </div>)
}

export default MyComponent;