const fs = require("fs");
const alBarData = 0;
const deBarData = 0;

const barDataAlabama = {
    barDataAlabama : 
    {   
        labels: ["Caucasian", "African American"],
        datasets: [
            {
                label: "Ethnicity of Alabama House Representatives",
                data: alBarData,
                backgroundColor: ["blue", "green"],
                borderWidth: 1,
            },
        ],
    }
};

const barOptionsAlabama = {
    barOptionsAlabama : 
    {
    maintainAspectRatio: false,
    scales: {
        x: {
            indexAxis: "Ethnicity",
            labels: ["Caucasian", "African American"],
            ticks: {
                color: "#f00840"
            }
        },
        y: {
            indexAxis: "Number of Representatives",
            beginAtZero: true,
            ticks: {
                color: "#f00840"
            }
        },
    },
    plugins: {
        title: {
        display: true,
        text: "Ethnicity of Alabama House Representatives",
        font: {
            size: 20
        },
        color: "#f00840"
        },
        plugins: {
            title: {
            display: true,
            text: "Ethnicity of Alabama House Representatives",
            font: {
                size: 20
            },
            },
            legend: {
                display: false
            }
        }
    }
    }
};

// //DELAWARE STUFF ***********************************************************
const barDataDelaware = {
    barDataDelaware : 
    {
        labels: ["Caucasian", "African American", "Asian"],
        datasets: [
            {
                label: "Ethnicity of Delaware House Representatives",
                data: deBarData,
                backgroundColor: ["blue", "green", "red"],
                borderWidth: 1,
            },
        ],
    }
};


const barOptionsDelaware = {
    barOptionsDelaware : 
    {
        maintainAspectRatio: false,
        scales: {
            x: {
                indexAxis: "Ethnicity",
                labels: ["Caucasian", "African American", "Asian"],
                ticks: {
                    color: "#f00840"
                }
            },
            y: {
                indexAxis: "Number of Representatives",
                beginAtZero: true,
                ticks: {
                    color: "#f00840"
                }
            },
        },
        plugins: {
            title: {
                display: true,
                text: "Ethnicity of Delaware House Representatives",
                font: {
                    size: 20
                },
                color: "#f00840"
            },
            legend: {
                display: false
            }
        }
        }
};

const columns = {
    columns : 
    [{
        name: "Image",
        selector: "img",
        id: "img",
        cell: "row => <img src={row.img} alt=\"Profile\" style={{ width: \"50px\", height: \"50px\", borderRadius: \"50%\" }} />",
        style: {
            background: "white",
        },
    },
    {
        name: "Name",
        selector: "name",
        id: "name",
        sortable: true,
        style: {
            background: "white",
        },
    },
    {
        name: "District",
        selector: "district",
        id: "district",
        sortable: true,
        style: {
            background: "white",
        },
    },
    {
        name: "Party",
        selector: "party",
        id: "party",
        sortable: true,
        style: {
            background: "white",
        },
    },
    {
        name: "Race (s)",
        selector: "races",
        id: "races",
        sortable: true,
        style: {
            background: "white",
        },
    },
    {
        name: "Vote Margin",
        selector: "margin",
        id: "margin",
        sortable: true,
        style: {
            background: "white",
        },
    }]
};

const customStylesAssembly = {
    customStylesAssembly : 
    {
    pagination: {
        style: {
            backgroundColor: '#fff', // Change the background color of the pagination controls
            color: 'black', // Change the text color of the pagination controls
            padding: '10px', // Add padding to the pagination controls
            borderRadius: '5px', // Add border radius to the pagination control
        },
    },
    table: {
        style: {
            backgroundColor: '#fff',
            color: 'black',
            padding: '20px',
            borderRadius: '5px',
        },
    },
    header: {
        style: {
            minHeight: '56px',
        },
    },
    headRow: {
        style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
        },
    },
    headCells: {
        style: {
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
            },
        },
    },
    cells: {
        style: {
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
            },
        },
    },
}};

const customStylesSummary = {
    customStylesSummary : 
    {
    pagination: {
        style: {
            backgroundColor: '#333',
            color: 'black',
            padding: '10px',
            borderRadius: '5px',
        },
    },
    table: {
        style: {
            backgroundColor: '#333',
            color: '#fff',
            padding: '20px',
            borderRadius: '5px',
        },
    },
    header: {
        style: {
            minHeight: '56px',
        },
    },
    headRow: {
        style: {
            display: 'none'
        },
    },
    headCells: {
        style: {
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
            },
        },
    },
    cells: {
        style: {
            '&:not(:last-of-type)': {
                borderRightStyle: 'solid',
                borderRightWidth: '1px',
            },
        },
    },
}};


const attributeLabels = {
    attributeLabelsSummary : {
    id: 'ID',
    state: 'State',
    statePopulation: 'State Population',
    voterDistribution: 'Voter Distribution',
    caucasianPop: 'Caucasian Population',
    africanAmericanPop: 'African American Population',
    stateRepsPartyDistribution: 'State Representatives By Party',
    stateRepsRaceDistribution: 'State Representatives By Race'
}
};

const heatmap = {
    heatmap : {
    
    center_locations : {
        "al": [32.655, -86.66],
        "de": [39.15,-75.439787]
    },
    default_zoom : {"al":6.8, "de":8.5}

    }
}

const stateSelect = {
    stateSelect : {
        center : [34.793555, -83.440726],
        zoom:5.5, zoomSnap:0.5, minZoom:4.5, maxZoom:7, zoomDelta:0.5,
        maxBounds : [
            [50.88407, -129.23004],
            [22.51666, -62.44975]
        ],
        style:{
            height: '100%',
            width: '100%',
            backgroundColor: '#e6e6e6',
        }
    }
}

const barDataAlJSON = JSON.stringify(barDataAlabama);
const barOptionsAlJSON = JSON.stringify(barOptionsAlabama);
const barDataDeJSON = JSON.stringify(barDataDelaware);
const barOptionsDeJSON = JSON.stringify(barOptionsDelaware);
const columnsJSON = JSON.stringify(columns);
const customStylesAssemblyJSON = JSON.stringify(customStylesAssembly);
const customStylesSummaryJSON = JSON.stringify(customStylesSummary);
const attributeLabelsJSON = JSON.stringify(attributeLabels);
const heatmapJSON = JSON.stringify(heatmap);
const stateSelectJSON = JSON.stringify(stateSelect);


// const combined = Object.assign({}, barDataAlJSON, barOptionsAlJSON, barDataDeJSON, barOptionsDeJSON, columnsJSON, customStylesAssemblyJSON, customStylesSummaryJSON, attributeLabelsJSON, heatmapJSON, stateSelectJSON);


fs.writeFile("test.json", barDataAlJSON, (err) => {
    if (err) throw err;
    console.log("Data written to file");
});
fs.appendFile("test.json", barOptionsAlJSON, (err) => {
    if (err) throw err;
    console.log("Data written to file");
});
fs.appendFile("test.json", barDataDeJSON, (err) => {
    if (err) throw err;
    console.log("Data written to file");
});
fs.appendFile("test.json", barOptionsDeJSON, (err) => {
    if (err) throw err;
    console.log("Data written to file");
});
fs.appendFile("test.json", columnsJSON, (err) => {
    if (err) throw err;
    console.log("Data written to file");
});
fs.appendFile("test.json", customStylesAssemblyJSON, (err) => {
    if (err) throw err;
    console.log("Data written to file");
});
fs.appendFile("test.json", customStylesSummaryJSON, (err) => {
    if (err) throw err;
    console.log("Data written to file");
});
fs.appendFile("test.json", attributeLabelsJSON, (err) => {
    if (err) throw err;
    console.log("Data written to file");
});
fs.appendFile("test.json", heatmapJSON, (err) => {
    if (err) throw err;
    console.log("Data written to file");
});
fs.appendFile("test.json", stateSelectJSON, (err) => {
    if (err) throw err;
    console.log("Data written to file");
});
