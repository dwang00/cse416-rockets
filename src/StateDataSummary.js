import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import {flatten} from "mathjs";

const customStyles = {
    pagination: {
        style: {
            backgroundColor: '#333',
            color: 'black',
            padding: '10px',
            // borderRadius: '5px',
        },
    },
    table: {
        style: {
            backgroundColor: '#333',
            color: '#fff',
            padding: '3px',
            // borderRadius: '3px',
            height: "100%",
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
    rows: {
        style: {
            fontSize: "12px",
            width: "100%",
            height: "10px"
        }
    },
    denseStyle: {
        minHeight: "20px",
        maxHeight: "20px"
    }
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


function StateDataSummary({ state }) {
    const [tableData, setTableData] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:8080/get_summaries/summaryByState?state=${state}`)
            .then((response) => response.json())
            .then((data) => {
                setTableData(data);
                console.log(data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    if (!tableData) {
        return <div>Loading...</div>;
    }
    const flattenObject = (obj, prefix = '') => {
        return Object.keys(obj).reduce((acc, key) => {
            const prefixedKey = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                return { ...acc, ...flattenObject(obj[key], prefixedKey) };
            } else {
                const value = obj[key];
                // Convert the value to its corresponding type
                const convertedValue = typeof value === 'number' ? Number(value) : String(value);
                return { ...acc, [prefixedKey]: convertedValue };
            }
        }, {});
    };

    function transformData(data) {
        if (typeof data !== 'object' || Array.isArray(data)) {
            console.error("Data is not an object.");
            return [];
        }

        const transformedData = [];

        for (const key in data) {
            let attributeName = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, function (str) { return str.toUpperCase(); })
                .replace(/([A-Z][a-z])/g, '$1')
                .replace(/\./g, ' - ')
                .replace(' ', ' ');

            attributeName = attributeName.charAt(0).toUpperCase() + attributeName.slice(1);

            let formattedValue = data[key];
            if (typeof data[key] === 'number') {
                formattedValue = data[key].toLocaleString(); // Format number with commas
            }

            transformedData.push({
                attribute: attributeName,
                value: formattedValue.toString() // Convert to string
            });
        }

        return transformedData;
    }



    const newData = flattenObject(tableData[0]);

    const finalData = transformData(newData)

    const transposedData = finalData.map(item => ({
        attribute: item.attribute,
        value: item.value
    }));
    console.log(transposedData)
    console.log('fuck')
    const transposedRows = transposedData.map(item => ({
        attribute: item.attribute,
        value: item.value // Assign the value object directly
    }));
    const CustomCell = ({ value }) => {
        return (
            <div style={{ textAlign: 'right' }}>
                {value}
            </div>
        );
    };

    const uniqueKeys = Array.from(new Set(transposedRows.flatMap(row => Object.keys(row))));
    const columns = [
        {
            name: 'Attribute',
            selector: 'attribute',
            sortable: true,
            wrap: true,
            style: {
                textAlign: 'left'
            }
        },
        ...uniqueKeys.map(key => ({
            name: key,
            selector: key,
            sortable: true,
            wrap: true,
            width: '25%',
            right: true,
            style: {
                textAlign: 'right',
            }
        }))
    ].filter(column => column.selector !== 'attribute'); // Remove the second occurrence of 'attribute'

    columns.splice(0, 0, {  // Add 'attribute' column at index 1
        name: 'attribute',
        selector: 'attribute',
        sortable: true,
        wrap: true,
        width: '75%',
        style: {
            textAlign: "left"
        }
    });
    // Construct data
    const data = transposedRows.map((row, index) => {
        const rowData = { id: index };
        uniqueKeys.forEach(key => {
            if (row[key] !== undefined) {
                rowData[key] = Array.isArray(row[key]) ? row[key].join('') : row[key];
            }
        });
        return rowData;
    });

    //removing id row and state row
    const slicedData = data.slice(2);
    return (
        <div className="" style={{ maxHeight:'100%', maxWidth: '100%', margin: '0 auto',}}>
            <DataTable
                columns={columns}
                data={slicedData}
                customStyles={customStyles}
                selectableRows={false}
                noHeader = {true}
                dense
            />
        </div>
    );
}

export default StateDataSummary;
