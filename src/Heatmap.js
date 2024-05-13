import React, {useState, useEffect} from 'react';
// import { useFetch } from 'react-fetch';
import 'leaflet/dist/leaflet.css';
import { MapContainer, GeoJSON, TileLayer, SVGOverlay, LayerGroup } from 'react-leaflet';
import 'bootstrap/dist/css/bootstrap.css';
import StateDataSummary from './StateDataSummary';

function HeatMap(props) {
    const [selectedRows, setSelectedRows] = useState([]);

    const fullName = {"al" : "ALABAMA", "de" : "DELAWARE"};
    // console.log("IM IN HEATMAP.JS 1")
    // console.log(selectedRows)
    // console.log("IM IN HEATMAP.JS 2")
    // useEffect(() => {
    //     const uniqueSelectedRowsData = props.selectedRows.filter((row, index, self) =>
    //             index === self.findIndex(r => (
    //                 r.district === row.district && r.state === row.state
    //             ))
    //     );

    //     // Modify the state property for each row
    //     const modifiedRows = uniqueSelectedRowsData.map(row => {
    //         if (row.state === "ALABAMA") {
    //             return { ...row, state: "al" };
    //         } else if (row.state === "DELAWARE") {
    //             return { ...row, state: "de" };
    //         }
    //         return row;
    //     });

    //     setSelectedRows(modifiedRows);
    // }, [props.selectedRows]);

    const center_locations = {
        "al": [32.655, -86.66],
        "de": [39.15,-75.439787]
    }
    const default_zoom = {"al":6.5, "de":8.5}

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

    const [highlightedDistrictId, setHighlightedDistrictId] = useState(null);
    function getFeatureIdByDistrict(district, state) {
        // Assuming the GeoJSON features have a property called 'ID' representing the district number
        const geojson = JSON.parse(props.my_json);
        const feature = geojson.features.find(feature => {
            return parseInt(feature.properties.DISTRICT) === district;
        });
        return feature ? feature.id : null;
    }
    // function highlightSelectedDistrict() {
    //     const selectedRowsData = selectedRows;
    //     const selectedState = props.state;

    //     if (!selectedRowsData || selectedRows.length === 0) {
    //         setHighlightedDistrictId(null);
    //         return;
    //     }

    //     const highlightedIds = [];
    //     console.log(selectedRowsData)
    //     selectedRowsData.forEach(row => {
    //         if (row.state === selectedState) {
    //             const featureId = getFeatureIdByDistrict(row.district, selectedState);
    //             if (featureId) {
    //                 highlightedIds.push(featureId);
    //             }
    //         }
    //     });

    //     console.log("Highlighted Districts:", highlightedIds);

    //     // Set the highlighted districts
    //     setHighlightedDistrictId(prevHighlightedDistrictId => {
    //         return highlightedIds.length > 0 ? highlightedIds : null;
    //     });
    // }

    // useEffect(() => {
    //     highlightSelectedDistrict();
    // }, [selectedRows, props.state]);
    const [race, setRace] = useState("white");

    const colors = ['#fcfbfd', '#f2f0f7', '#e2e1ef', '#cecee5', '#b6b5d8', '#9d99c8', '#8582bc', '#7261ac', '#603f9a', '#4f1e8b'];

    function getColor(feature){
        if (!props.isDensity){
            return "blue"; //tab20[feature.id%20]
        }

        if (race === 'white'){
            // console.log(Math.floor(feature.properties.white_density *  10));
            // return purplesColors[Math.floor(feature.properties.white_density * purplesColors.length / 10) * 10]
            return colors[Math.floor(feature.properties.white_density *  10)];
        }
        else if(race === 'black'){
            // return purplesColors[Math.floor(feature.properties.black_density * purplesColors.length / 10) * 10]
            return colors[Math.floor(feature.properties.black_density *  10)];
        }else{
            return purplesColors[Math.floor(feature.properties.area_density * purplesColors.length)]
        }
    };

    const toggleMode = () => {
        props.setIsDensity(!props.isDensity);
        setRace("white");
    };

    const toggleRace = (event) => {
        setRace(event.target.value);
    };

    const handleClick = (id) => {
        // console.log(id);
        props.setCurrDistrict(id);
    };

    // useEffect(() => {
    //     if (props.layers) {
    //         // props.currLayer.bringToFront();
    //         console.log(props.layers);
    //     }
    // }, [props.layers]);

    return (
        <div className="position-relative w-100 h-100" >
            <div className="position-absolute bottom-0 end-0" 
                style={{position: "absolute", zIndex: "1000", 
                backgroundColor: "#fff",
                paddingLeft: "5px",
                paddingRight: "5px",
                paddingTop: "5px",
                borderStyle: "solid",
                borderColor: "#000",
                fontSize: "12px"
                }}>
                {/* {isDensity && 
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="both" onClick={toggleRace}/>
                    <label class="form-check-label" for="exampleRadios3">
                        Population
                    </label>
                </div>} */}
                {props.isDensity && 
                <div class="form-check" style={{textAlign: "left"}}>
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="white" defaultChecked onClick={toggleRace}/>
                    <label class="form-check-label" for="exampleRadios1">
                        Caucasian
                    </label>
                </div>}
                {props.isDensity &&
                <div class="form-check" style={{textAlign: "left"}}>
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="black" onClick={toggleRace}/>
                    <label class="form-check-label" for="exampleRadios2">
                        African American
                    </label>
                </div>}
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={toggleMode}/>
                    <label class="form-check-label" for="flexSwitchCheckDefault">Population density mode</label>
                </div>
            </div>
            {props.isDensity &&
            <div className="position-absolute bottom-0 justify-content-center" 
                style={{zIndex:"1000", padding: "3px", height: "150px", width: "100px"}}>
                <div className="d-flex flex-row" style={{fontSize: "12px"}}>
                    <div className="d-flex flex-column w-25" style={{borderStyle:"solid", border:"1px"}}>
                        <div style={{height:"10%", backgroundColor:"#4f1e8b"}}></div>
                        <div style={{height:"10%", backgroundColor:"#603f9a"}}></div>
                        <div style={{height:"10%", backgroundColor:"#7261ac"}}></div>
                        <div style={{height:"10%", backgroundColor:"#8582bc"}}></div>
                        <div style={{height:"10%", backgroundColor:"#9d99c8"}}></div>
                        <div style={{height:"10%", backgroundColor:"#b6b5d8"}}></div>
                        <div style={{height:"10%", backgroundColor:"#cecee5"}}></div>
                        <div style={{height:"10%", backgroundColor:"#e2e1ef"}}></div>
                        <div style={{height:"10%", backgroundColor:"#f2f0f7"}}></div>
                        <div style={{height:"10%", backgroundColor:"#fcfbfd"}}></div>
                    </div>
                    <div className="d-flex flex-column text-left w-75">
                        <div>90-100%</div>
                        <div>80-90%</div>
                        <div>70-80%</div>
                        <div>60-70%</div>
                        <div>50-60%</div>
                        <div>40-50%</div>
                        <div>30-40%</div>
                        <div>20-30%</div>
                        <div>10-20%</div>
                        <div>0-10%</div>
                    </div>
                    {/* <div className="legend" style={{height: "130px", width: "10px"}}></div>
                    <div className="d-flex flex-column" style={{height: "150px", width: "30px", fontSize: "12px", paddingRight: "3px"}}>
                        <div style={{textAlign: "right"}}>100%</div>
                        <div style={{marginTop: "40px", textAlign: "right"}}>50%</div>
                        <div style={{marginTop: "44px", textAlign: "right"}}>0%</div>
                    </div> */}
                </div>
            </div>}
            <MapContainer center={center_locations[props.state]}
                zoom={default_zoom[props.state]}
                dragging={true}
                minZoom={default_zoom[props.state]}
                maxZoom={13}
                zoomControl={true}
                zoomSnap={.1}
                attributionControl={false}
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#e6e6e6',
                }}
                ref={props.setMap}
                className='align-self-center'>
                
                {/* <div className="position-absolute top-0 end-0" style={{height:"25%", width:"30%", zIndex: "700"}}>
                    <StateDataSummary state={fullName[props.state]} />
                </div> */}

                {props.my_json &&
                    <GeoJSON
                        data={JSON.parse(props.my_json)}
                        style={feature => ({
                            // color: highlightedDistrictId && highlightedDistrictId.includes(feature.id) ? 'red' : 'black',
                            // color: "#f00840",
                            // weight: highlightedDistrictId && highlightedDistrictId.includes(feature.id) ? 3 : .5, // Conditional border thickness
                            fillColor: getColor(feature),
                            fillOpacity: props.isDensity ? 1 : 0.3,
                            color: props.currDistrict === feature.properties["DISTRICT_N"] ? "#f00840" : "#000",
                            weight: props.currDistrict === feature.properties["DISTRICT_N"] ? 3 : .5
                        })}
                        onEachFeature={(feature, layer) => {
                            layer.on({
                                click: () => {handleClick(feature.properties["DISTRICT_N"]); console.log(feature); layer.bringToFront();}
                            });
                        }}
                    />}

                <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

            </MapContainer>
        </div>
    );
}
export default HeatMap;