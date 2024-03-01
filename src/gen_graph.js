import React, { useState, useEffect } from 'react';
// import { useFetch } from 'react-fetch';
import 'leaflet/dist/leaflet.css';
// import { MapContainer, GeoJSON } from 'react-leaflet';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'

// pass in parameters mode/race.

function MyComponent(props) {
    const json_file = JSON.parse((props.my_json)['sums'])
    let alabamaWhiteRatio = (json_file.al_ttl_white)/(json_file.al_ttl_pop)
    let alabamaBlackRatio  = (json_file.al_ttl_black)/(json_file.al_ttl_pop)
    let delawareWhiteRatio  = (json_file.de_ttl_white)/(json_file.de_ttl_pop)
    let delawareBlackRatio  = (json_file.de_ttl_black)/(json_file.de_ttl_pop)
    const barDataAggregate = {
        labels: ['Caucasian', 'African American'],
        datasets: [
            {
                label: "White",
                data: [alabamaWhiteRatio, delawareWhiteRatio],
                backgroundColor: ['blue'],
                borderWidth: 1,
            },
            {
                label: "Black",
                data: [alabamaBlackRatio, delawareBlackRatio],
                backgroundColor: ['green'],
                borderWidth: 1,
            },
        ],
    };

    const barOptionsAggregate = {
        maintainAspectRatio: false,
        scales: {
            x: {
                indexAxis: 'State',
                labels: ['Alabama', 'Delaware'],
                stacked: true
            },
            y: {
                indexAxis: 'Population',
                beginAtZero: true,
                stacked: true
            },
        },
    };
    return (<div style={{
        position:'absolute',
        height: '500px',
        width: '400px',
        backgroundColor: 'white',
        top:'2200px',
        left: '100px'}}>
        <Bar options = {barOptionsAggregate} data = {barDataAggregate}/>
    </div>)
}
//
export default MyComponent;