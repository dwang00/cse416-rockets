import React from 'react';
// import { useFetch } from 'react-fetch';
import 'leaflet/dist/leaflet.css';
import { MapContainer, GeoJSON } from 'react-leaflet';

// pass in parameters mode/race.
function MyComponent(props) {

    const center_locations = {"al": [32.7, -86.66],
        "de": [39.1,-75.539787]}

    const map_locations = {"al":'15%', "de":'55%'}

    const default_zoom = {"al":6.9, "de":8.5}

    // Define the colors for the tab20 colormap
    const tab20 = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c',
        '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5',
        '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f',
        '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']

    const purplesColors = [
        '#fcfbfd', '#fbfafd', '#fbfafc', '#faf9fc', '#faf9fc', '#f9f8fb', '#f9f8fb',
        '#f8f7fb', '#f8f6fa', '#f7f6fa', '#f7f5fa', '#f6f5f9', '#f6f4f9', '#f5f4f9',
        '#f5f3f8', '#f4f3f8', '#f4f2f8', '#f3f1f8', '#f3f1f7', '#f2f0f7', '#f2f0f7',
        '#f1eff6', '#f1eff6', '#f0eef6', '#efedf5', '#efedf5', '#eeecf5', '#edebf4',
        '#ecebf4', '#eceaf3', '#ebe9f3', '#eae8f3', '#e9e8f2', '#e8e7f2', '#e7e6f1',
        '#e6e5f1', '#e6e5f1', '#e5e4f0', '#e4e3f0', '#e3e2ef', '#e2e1ef', '#e1e1ef',
        '#e1e0ee', '#e0dfee', '#dfdeed', '#dedeed', '#dddded', '#dcdcec', '#dbdbec',
        '#dbdbeb', '#dadaeb', '#d8d9ea', '#d7d7ea', '#d6d6e9', '#d5d5e8', '#d4d4e8',
        '#d2d3e7', '#d1d2e7', '#d0d0e6', '#cfcfe5', '#cecee5', '#cccde4', '#cbcce4',
        '#cacbe3', '#c9c9e2', '#c8c8e2', '#c6c7e1', '#c5c6e1', '#c4c5e0', '#c3c4df',
        '#c2c2df', '#c0c1de', '#bfc0de', '#bebfdd', '#bdbedc', '#bcbcdc', '#babbdb',
        '#b9bada', '#b8b8d9', '#b7b7d8', '#b6b5d8', '#b4b4d7', '#b3b3d6', '#b2b1d5',
        '#b1b0d4', '#afaed4', '#aeadd3', '#adacd2', '#acaad1', '#aba9d0', '#a9a7d0',
        '#a8a6cf', '#a7a5ce', '#a6a3cd', '#a5a2cc', '#a3a0cc', '#a29fcb', '#a19eca',
        '#a09cc9', '#9f9bc8', '#9d99c8', '#9c98c7', '#9b97c7', '#9a96c6', '#9995c5',
        '#9794c5', '#9692c4', '#9591c4', '#9490c3', '#938fc3', '#918ec2', '#908dc2',
        '#8f8bc1', '#8e8ac0', '#8d89c0', '#8b88bf', '#8a87bf', '#8986be', '#8884be',
        '#8683bd', '#8582bc', '#8481bc', '#8380bb', '#827fbb', '#807dba', '#7f7cb9',
        '#7f7ab8', '#7e78b8', '#7d77b7', '#7c75b6', '#7b73b5', '#7a71b4', '#7970b3',
        '#786eb2', '#776cb1', '#776ab0', '#7668af', '#7567ae', '#7465ad', '#7363ac',
        '#7261ac', '#7160ab', '#705eaa', '#705ca9', '#6f5aa8', '#6e59a7', '#6d57a6',
        '#6c55a5', '#6b53a4', '#6a51a3', '#6950a2', '#684ea2', '#684ca1', '#674ba0',
        '#66499f', '#65479e', '#64469e', '#63449d', '#62429c', '#61419b', '#603f9a',
        '#603d9a', '#5f3b99', '#5e3a98', '#5d3897', '#5c3696', '#5b3596', '#5a3395',
        '#593194', '#593093', '#582e92', '#572c92', '#562b91', '#552990', '#54278f',
        '#53268e', '#52248e', '#52228d', '#51218c', '#501f8b', '#4f1e8b', '#4e1c8a',
        '#4d1b89', '#4d1989', '#4c1888', '#4b1687', '#4a1486', '#491386', '#481185',
        '#471084', '#470e84', '#460d83', '#450b82', '#440981', '#430881', '#420680',
        '#42057f', '#41037e', '#40027e', '#3f007d'
    ]

    function getColor(feature){
        if (props.mode === 'default'){
            return tab20[feature.id%20]
        }

        if (props.race === 'white'){
            return purplesColors[Math.floor(feature.properties.white_density * purplesColors.length)]
        }
        else if(props.race === 'black'){
            return purplesColors[Math.floor(feature.properties.black_density * purplesColors.length)]
        }else{
            return purplesColors[Math.floor(feature.properties.area_density * purplesColors.length)]
        }
    }

    // max zoom can be set to a larger value. In this case, some value is necessary for dragging
    return (
        <div>
            <MapContainer center={center_locations[props.state]}
                          zoom={default_zoom[props.state]}
                          dragging={true}
                          style={{
                              position:'absolute',
                              height: '500px',
                              width: '400px',
                              backgroundColor: 'white',
                              left:map_locations[props.state],
                              top:'200px'}}

                          minZoom={default_zoom[props.state]}
                          maxZoom={13}
                          zoomControl={false}
                          zoomSnap={.1}
                          attributionControl={false}>
                {(props.my_json)[props.state] &&
                    <GeoJSON
                        data={JSON.parse((props.my_json)[props.state])}
                        style={feature => ({
                            // Customize styling for GeoJSON features
                            color: 'black',
                            weight: 0.5,
                            fillColor: getColor(feature),
                            fillOpacity: 1
                        })}
                    >


                    </GeoJSON>}
            </MapContainer>
            {props.state==='al' && props.mode === "density" && <div style={{
                position:'relative',
                width: '50px',
                height:'50px',
                top: '400px',
                left:'8%',
                backgroundColor: purplesColors[Math.floor(purplesColors.length*.5)]}}>
                <span>50% color</span> {/* Text content */}
            </div>}
        </div>
    );
}

export default MyComponent;