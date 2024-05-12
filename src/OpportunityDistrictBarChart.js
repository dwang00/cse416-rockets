import {useEffect, useState} from "react";
import { Bar } from 'react-chartjs-2';

function OpportunityDistrictBarChart({ state, race, ensemble, threshold}) {

    const [oppDistrictsData, setOppDistrictsData] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:8080/oppDistBinsByState?state=${state}`)
            .then(response => response.json)
            .then(data => {
                setOppDistrictsData(data)
            })
            .catch(error => {
                console.error("Error fetching data:", error)
            })
    }, [])
    const oppDataDe = {
        labels: Array.from({ length: 41 }, (_, i) => i + 1), // Assuming you have 40 data points
        datasets: [
            {
                label: race,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: oppDistrictsData
            }
        ]
    };
    const optionsOppDe = {
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'District'
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: '# of partitions where we found the opportunity district'
                },
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };
}
