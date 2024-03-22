
import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { Bar } from 'react-chartjs-2';

// pass in parameters mode/race.

function MyComponent(props) {
    const json_file = JSON.parse((props.my_json)['sums'])
    let alabamaWhiteRatio = (json_file.al_ttl_white)/(json_file.al_ttl_pop)
    let alabamaBlackRatio  = (json_file.al_ttl_black)/(json_file.al_ttl_pop)
    let alabamaAsianRatio  = (json_file.al_ttl_asian)/(json_file.al_ttl_pop)
    let delawareWhiteRatio  = (json_file.de_ttl_white)/(json_file.de_ttl_pop)
    let delawareBlackRatio  = (json_file.de_ttl_black)/(json_file.de_ttl_pop)
    let delawareAsianRatio  = (json_file.de_ttl_asian)/(json_file.de_ttl_pop)

    const barDataAggregate = {
        labels: ['Caucasian', 'African American', 'Asian American'],
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
            {
                label: "Asian",
                data: [alabamaAsianRatio, delawareAsianRatio],
                backgroundColor: ['red'],
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

    let house_of_reps_data =
        {"al_white":75, "al_black":27, "al_asian":0, "de_white":30, "de_black":10, "de_asian":1  }
    let alabamaWhiteRatio2 = (json_file.al_ttl_white)/(house_of_reps_data["al_white"])
    let alabamaBlackRatio2  = (json_file.al_ttl_black)/(house_of_reps_data["al_black"])
    let alabamaAsianRatio2  = 0
    let delawareWhiteRatio2  = (json_file.de_ttl_white)/(house_of_reps_data["de_white"])
    let delawareBlackRatio2  = (json_file.de_ttl_black)/(house_of_reps_data["de_black"])
    let delawareAsianRatio2  = (json_file.de_ttl_asian)/(house_of_reps_data["de_asian"])

    const barDataAggregate2 = {
        labels: ['Caucasian', 'African American', 'Asian American'],
        datasets: [
            {
                label: "Whites per Rep",
                data: [alabamaWhiteRatio2, delawareWhiteRatio2],
                backgroundColor: ['blue'],
                borderWidth: 1,
            },
            {
                label: "Blacks per Rep",
                data: [alabamaBlackRatio2, delawareBlackRatio2],
                backgroundColor: ['green'],
                borderWidth: 1,
            },
            {
                label: "Asians per Rep",
                data: [alabamaAsianRatio2, delawareAsianRatio2],
                backgroundColor: ['red'],
                borderWidth: 1,
            },
        ],
    };
    const barOptionsAggregate2 = {
        maintainAspectRatio: false,
        scales: {
            x: {
                indexAxis: 'State',
                labels: ['Alabama', 'Delaware'],
                stacked: true
            },
            y: {
                indexAxis: 'Citizens per Representative',
                beginAtZero: true,
                stacked: true
            },
        },
    };

    let al_expected_reps_per_citizen = (json_file.al_ttl_pop)/(house_of_reps_data['al_white'] +
        house_of_reps_data['al_black']+ house_of_reps_data['al_asian'])

    let de_expected_reps_per_citizen = (json_file.de_ttl_pop)/(house_of_reps_data['de_white'] +
        house_of_reps_data['de_black']+ house_of_reps_data['de_asian'])


    return (<div>
            <div style={{
                position:'absolute',
                height: '500px',
                width: '500px',
                backgroundColor: 'white',
                top:'1750px',
                left: '32%'}}>
                <Bar options = {barOptionsAggregate} data = {barDataAggregate}/>
            </div>

            <div style={{
                position:'absolute',
                height: '500px',
                width: '400px',
                backgroundColor: 'white',
                top:'850px',
                left: '34%'}}>
                <div style={{position:'absolute',
                    fontSize:'30px',
                    top:'-90px',
                    left:'12%',
                    width:'350px'}}>
                    <p> How did our partition do?</p>
                </div>
                <Bar style={{top:'50px'}} options = {barOptionsAggregate2} data = {barDataAggregate2}/>
                <div style={{position:"absolute", left:'-68%', top:'500px', width:'1000px'}}>
                    {al_expected_reps_per_citizen*1.3 < alabamaBlackRatio2?
                        <p>Minorities in Alabama seem to have higher than average representation in this plan.</p>:
                        al_expected_reps_per_citizen*.7 > alabamaBlackRatio2?
                            <p>Minorities in Alabama seem to have lower than average representation in this plan.</p>:
                            <p>Minorities in Alabama seem to have about average representation in this plan.</p>}

                    {de_expected_reps_per_citizen*1.3 < delawareBlackRatio2?
                        <p>Minorities in Delaware seem to have higher than average representation in this plan.</p>:
                        de_expected_reps_per_citizen*.7 > delawareBlackRatio2?
                            <p>Minorities in Delaware seem to have lower than average representation in this plan.</p>:
                            <p>Minorities in Delaware seem to have about average representation in this plan.</p>
                    }

                    <p>In fact, each minority citizen in Alabama receive
                        about {(alabamaBlackRatio2/alabamaWhiteRatio2).toFixed(2)} representation
                        of a non-minority!
                        <br/>In Delaware, each minority citizen receive
                        about {(delawareBlackRatio2/delawareWhiteRatio2).toFixed(2)} representation
                        of a non-minority!</p>
                </div>
            </div>

        </div>

    );
}
//

export default MyComponent;