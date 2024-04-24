import React, { useState, useEffect } from 'react';
// import { useFetch } from 'react-fetch';
import 'leaflet/dist/leaflet.css';
// import { MapContainer, GeoJSON } from 'react-leaflet';
import GenState from "./gen_state";
import GenGraph from "./gen_graph";
import 'bootstrap/dist/css/bootstrap.css';


// pass in parameters mode/race.
function MyComponent(props) {

    // const [geojsonData, setGeojsonData] = useState({'al':null, 'de':null, 'sums':null});
    const [geojsonAl, setGeoJsonAl] = useState();
    const [geojsonDe, setGeoJsonDe] = useState();
    const [geojsonSums, setGeoJsonSums] = useState();
    const [selectedRows, setSelectedRows] = useState();
    useEffect(() => {

        const uniqueSelectedRowsData = props.selectedRows.filter((row, index, self) =>
                index === self.findIndex(r => (
                    r.district === row.district && r.state === row.state
                ))
        );
        const modifiedRows = uniqueSelectedRowsData.map(row => {
            if (row.state === "ALABAMA") {
                return { ...row, state: "al" };
            } else if (row.state === "DELAWARE") {
                return { ...row, state: "de" };
            }
            return row;
        });
        setSelectedRows(modifiedRows)
    }, [props.selectedRows]);


    // const [geojsonData, setGeojsonData] = useState();

    useEffect(() => {
        fetch('http://localhost:8080/get_geojson?region=al')
            .then(response => response.json())
            .then(data => {
                console.log('Received al data from Spring:', data);
                setGeoJsonAl(data)
            })
            .catch(error => console.error(error));
    }, []);
    useEffect(() => {
        fetch('http://localhost:8080/get_geojson?region=de')
            .then(response => response.json())
            .then(data => {
                console.log('Received de data from Spring:', data);
                setGeoJsonDe(data)
            })
            .catch(error => console.error(error));
    }, []);
    useEffect(() => {
        fetch('http://localhost:8080/get_geojson?region=sums')
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
    return (<>
        {geojsonAl && props.state=='al' && <GenState {...props} my_json={geojsonAl} state={props.state} selectedRows = {selectedRows}/>}
        {geojsonDe && props.state=='de' && <GenState {...props} my_json={geojsonDe} state={props.state} selectedRows = {selectedRows}/>}
        {/* {geojsonData['sums'] && <GenGraph {...props} my_json={geojsonData} />} */}
    </>
    )
}

export default MyComponent;