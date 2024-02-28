import React, { useState, useEffect } from 'react';
// import { useFetch } from 'react-fetch';
import 'leaflet/dist/leaflet.css';
import { MapContainer, GeoJSON } from 'react-leaflet';

function MyComponent() {
    const [geojsonData, setGeojsonData] = useState({'al':null, 'de':null});
    const [isHovering, setIsHovering] = useState(false); // State to track hovering

    const handleMouseOver = () => setIsHovering(true);
    const handleMouseOut = () => setIsHovering(false);

    useEffect(() => {
        fetch('http://localhost:3021/get_geojson') // Replace with your Flask endpoint
            .then(response => response.json())
            .then(data => setGeojsonData(data))
            .catch(error => console.error(error));
    }, []);

    // Define the colors for the tab20 colormap
    const tab20 = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c',
                           '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5',
                           '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f',
                           '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']

    /*const pastel1 = ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6',
                              '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2']*/

    /*const tab20b = ['#393b79', '#5254a3', '#6b6ecf', '#9c9ede', '#637939',
        '#8ca252', '#b5cf6b', '#cedb9c', '#8c6d31', '#bd9e39', '#e7ba52',
        '#e7cb94', '#843c39', '#ad494a', '#d6616b', '#e7969c', '#7b4173',
        '#a55194', '#ce6dbd', '#de9ed6']*/

    const purplesColors = [
        '#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0',
        '#e7298a', '#ce1256', '#980043', '#67001f'
    ]

    // max zoom can be set to a larger value. In this case, some value is necessary for dragging
    return (
        <div>
            <MapContainer center={[32.7, -86.66]}
                          zoom={7}
                          dragging={false}
                          style={{ height: '600px', width: '500px', backgroundColor: 'white' }}
                          minZoom={7}
                          maxZoom={13}
                          zoomControl={false}>
                {geojsonData['al'] &&
                    <GeoJSON
                        data={JSON.parse(geojsonData['al'])}
                        style={feature => ({
                            // Customize styling for GeoJSON features
                            color: 'black',
                            weight: 0.5,
                            fillColor: tab20[feature.id%20],
                            fillOpacity: 1
                        })}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    >

                        {isHovering && (
                            <div isOpen={isHovering} className="dialogue-box">
                                <p>Hovering over feature: TESTING</p>
                            </div>
                        )}
                    </GeoJSON>}
            </MapContainer>
        </div>
    );
}

export default MyComponent;