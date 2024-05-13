import {useEffect, useState} from "react";
import { Bar } from 'react-chartjs-2';

function OpportunityDistrictBarChart({ state, race, ensemble, threshold}) {
    console.log("i get here")
    const [oppDistrictsData, setOppDistrictsData] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:8080/oppDistBinsByState?state=${state}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(ensemble==="250") {
                    setOppDistrictsData(data[0][threshold][race])
                }
                else {
                    setOppDistrictsData(data[1][threshold][race])
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error)
            })
    }, [state, race, ensemble, threshold]);
    console.log("opp dists", race);
    console.log(oppDistrictsData);
    const oppData = {
        labels: Array.from({ length: 41 }, (_, i) => i + 1), // Assuming you have 40 data points
        datasets: [
            {
                label: "African American",
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: oppDistrictsData
            }
        ]
    };
    const optionsOppData = {
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Number of Opportunity Districts"
                }
            },
            y: {
                title: {
                    display: true,
                    text: "Number of District Plans"
                },
                ticks: {
                    beginAtZero: true
                }
            }
        }
    };
    console.log("ok")
    return (
        <div style={{height: "100%"}}>
            <Bar data={oppData} options={optionsOppData} style = {{height: "100%"}}/>
        </div>
    );

}
export default OpportunityDistrictBarChart;
