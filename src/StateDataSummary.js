import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const customStyles = {
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
};
const attributeLabels = {
    id: 'ID',
    state: 'State',
    statePopulation: 'State Population',
    voterDistribution: 'Voter Distribution',
    caucasianPop: 'Caucasian Population',
    africanAmericanPop: 'African American Population',
    stateRepsPartyDistribution: 'State Representatives By Party',
    stateRepsRaceDistribution: 'State Representatives By Race'
};

const formatValue = (value) => {
    if (typeof value === 'object') {
        return Object.entries(value).map(([key, val]) => (
            `${key.charAt(0).toUpperCase()}${key.slice(1)}: ${val}`
        )).join(", ");
    } else {

        return String(value).charAt(0).toUpperCase() + String(value).slice(1);
    }
};


function StateDataSummary({ state }) {
    const [tableData, setTableData] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:8080/get_summaries/summaryByState?state=${state}`)
            .then((response) => response.json())
            .then((data) => {
                setTableData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    if (!tableData) {
        return <div>Loading...</div>;
    }

    const transposedData = Object.keys(tableData[0]).map((key) => ({
        attribute: key,
        value: formatValue(tableData[0][key]),
    }));

    const columns = [
        {
            name: 'Attribute',
            selector: 'attribute',
            cell: row => attributeLabels[row.attribute]
        },
        {
            name: 'Value',
            selector: 'value',
            cell: row => {
                const value = row.value;
                if (typeof value === 'object') {
                    return Object.entries(value).map(([key, val]) => (
                        <div key={key}>{key}: {val}</div>
                    ));
                } else {
                    return value;
                }
            }
        }
    ];
    //removing id row and state row
    const slicedData = transposedData.slice(2);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <DataTable
                columns={columns}
                data={slicedData}
                customStyles={customStyles}
                selectableRows={false}
                noHeader = {true}
            />
        </div>
    );
}

export default StateDataSummary;
