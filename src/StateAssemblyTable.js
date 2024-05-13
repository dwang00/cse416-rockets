import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import "./App.css";

function StateAssemblyTable({state, map, setMap, currDistrict, setCurrDistrict }) {

    const [tableData, setTableData] = useState(null);
    //const [selectedRows, setSelectedRows] = useState([]);

    useEffect( () => {
        fetch(`http://localhost:8080/get_members/membersByState?state=${state}`)
            .then(response => response.json())
            .then(data => {
                setTableData(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [state]);
    if (!tableData) {
        return <div>Loading...</div>;
    }

    const data = tableData
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    const columns = [
        {
            name: 'Image',
            selector: 'img',
            id: 'img',
            cell: row => (
                <div
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        transition: 'width 0.3s, height 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.width = '100px';
                        e.target.style.height = '100px';
                        e.target.parentElement.style.width = '100px';
                        e.target.parentElement.style.height = '100px';

                    }}
                    onMouseLeave={(e) => {
                        e.target.style.width = '50px';
                        e.target.style.height = '50px';

                        e.target.parentElement.style.width = '50px';
                        e.target.parentElement.style.height = '50px';
                    }}
                    onClick={() => handleClick(row.district)}
                >
                    <img
                        src={row.img}
                        alt="Profile"
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                        }}
                    />
                </div>
            ),
            headCells: {
                style: {
                    fontWeight: 'bold',
                },
            },

        },
        {
            name: 'Name',
            selector: 'name',
            id: 'name',
            sortable: true,
        },
        {
            name: 'District',
            selector: 'district',
            id: 'district',
            sortable: true,
            right: true,
            width: "89px",
            cell: row => <div style={{ textAlign: "center" }}>{row.district}</div>
        },
        {
            name: 'Party',
            selector: 'party',
            id: 'party',
            sortable: true,
            width: "140px",
            cell: row => capitalizeFirstLetter(row.party), // Capitalize the first letter and convert the rest to lowercase
        },
        {
            name: 'Race (s)',
            selector: 'races',
            id: 'races',
            sortable: true,
            width: "150px",
            cell: row => capitalizeFirstLetter(row.races[0]), // Capitalize the first letter and convert the rest to lowercase

        },
        {
            name: 'Vote Margin (%)',
            selector: 'margin',
            id: 'margin',
            sortable: true,
            right: true,
            width: "140px"
        },
    ];

    const customStyles = {
        head: {
            style: {
                fontWeight: 'bold'
            }
        },
        rows: {
            style: {
                minHeight: 'auto', // Adjust row height
            },
        },
        pagination: {
            style: {
                backgroundColor: '#ffffff',
                color: 'black',
                padding: '10px',
                borderRadius: '5px',
            },
        },
        table: {
            style: {
                backgroundColor: '#ffffff',
                color: 'black',
                padding: '20px',
                borderRadius: '5px',
                fontWeight: 'bold'

            },
        },
        header: {
            style: {
                minHeight: '10%',
                maxHeight: '10%',
                backgroundColor: 'ffffff',

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
    };


    // const handleRowClicked = (row) => {
    //     setSelectedRowsData(prevSelectedRowsData => {
    //         const selectedIndex = prevSelectedRowsData.findIndex(selectedRow => selectedRow === row);
    //         let newSelectedRows = [];

    //         if (selectedIndex === -1) {
    //             // Row is not yet selected, add it to selectedRows
    //             newSelectedRows = [...prevSelectedRowsData, row];
    //         } else {
    //             // Row is already selected, remove it from selectedRows
    //             newSelectedRows = [...prevSelectedRowsData.slice(0, selectedIndex), ...prevSelectedRowsData.slice(selectedIndex + 1)];
    //         }
    //         return newSelectedRows;
    //     });
    // };

    const handleClick = (row) => {
        console.log(row);
        setCurrDistrict(row);
        map.eachLayer((layer) => {
            if (layer.feature && layer.feature.properties["DISTRICT_N"] === row) {
                layer.bringToFront();
            }
        });
    };
    const ai = {
        "ALABAMA": {"white": 63, "asian": 6, "middle eastern": 2, "indian": 1, "black": 25, "latino hispanic": 8, "Difference": 42,},
        "DELAWARE": {"black": 10, "white": 24,  "latino hispanic": 4, "indian": 1, "middle eastern": 2, "Difference": 12}
    }
    const renderPredictedRaces = () => {
        if (ai[state]) {
            const predictedRaces = Object.entries(ai[state]).map(([race, count]) => (
                <div key={race} style={{ marginRight: '10px' }}> {race}: {count}</div>
            ));
            return (
                <div style = {{display: 'flex'}}>
                    <strong>AI Predicted Races: </strong> {predictedRaces}
                </div>
            );
        }
        return null; // Return null if no predicted races for the current state
    };

    return (
        <div className = "w-100">
            <DataTable
                columns={columns}
                data={data}
                // pagination
                customStyles = {customStyles}
                title={"State Representatives"}
                onRowClicked={(row, event) => handleClick(row.district)}
                pointerOnHover
            />
            {renderPredictedRaces()}

        </div>
    );
}

export default StateAssemblyTable;
