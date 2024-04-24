import React, { useState, useEffect } from 'react';
// import { useFetch } from 'react-fetch';
import 'leaflet/dist/leaflet.css';
// import { MapContainer, GeoJSON } from 'react-leaflet';
import GenState from "./gen_state";
import GenGraph from "./gen_graph";
import 'bootstrap/dist/css/bootstrap.css';


// pass in parameters mode/race.
export async function get_data() {

    // const [geojsonData, setGeojsonData] = useState({'al':null, 'de':null, 'sums':null});
    // const [geojsonAl, setGeoJsonAl] = useState();
    // const [geojsonDe, setGeoJsonDe] = useState();
    // const [geojsonSums, setGeoJsonSums] = useState();

    // const [geojsonData, setGeojsonData] = useState();

    try {
        const responseAl = await fetch('http://localhost:8080/get_geojson/al_geojson');
        if (!responseAl.ok) {
            throw new Error("Failed to fetch Al GeoJson");
        }
        const geoJsonAl = await responseAl.json();
    }
    catch (error) {
        console.error(error)
    }

    useEffect(() => {
        fetch('http://localhost:8080/get_geojson/al_geojson')
            .then(response => response.json())
            .then(data => {
                console.log('Received al data from Spring:', data);
                setGeoJsonAl(data)
            })
            .catch(error => console.error(error));
    }, []);
    useEffect(() => {
        fetch('http://localhost:8080/get_geojson/de_geojson')
            .then(response => response.json())
            .then(data => {
                console.log('Received de data from Spring:', data);
                setGeoJsonDe(data)
            })
            .catch(error => console.error(error));
    }, []);
    useEffect(() => {
        fetch('http://localhost:8080/get_geojson/sums_geojson')
            .then(response => response.json())
            .then(data => {
                console.log('Received sums data from Spring:',data);
                setGeoJsonSums(data)
            })
            .catch(error => console.error(error));
    }, []);

    // return (<div className = "maps">
    //     <GenState {...props} my_json={geojsonAl} state={'al'}/>
    //     <GenState {...props} my_json={geojsonDe} state={'de'}/>
    //     {geojsonSums['sums'] && <GenGraph {...props} my_json={geojsonSums} />}

    // </div>)
    return (
        {"de" : geojsonDe, "al" : geojsonAl}
    )
    // <>
    //     {geojsonAl && props.state=='al' && <GenState {...props} my_json={geojsonAl} state={props.state}/>}
    //     {geojsonDe && props.state=='de' && <GenState {...props} my_json={geojsonDe} state={props.state}/>}
    //     {/* {geojsonData['sums'] && <GenGraph {...props} my_json={geojsonData} />} */}
    // </>
}

// export default MyComponent;