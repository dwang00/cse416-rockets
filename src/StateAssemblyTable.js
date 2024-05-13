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
            width: "12%",
            cell: row => (
                <div
                    style={{
                        position: 'relative',
                        // overflow: 'hidden',
                        width: '40px',
                        height: '50px',
                        borderRadius: '50%',
                        transition: 'width 0.3s, height 0.3s'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.width = '80px';
                        e.target.style.height = '100px';
                        e.target.parentElement.style.width = '80px';
                        e.target.parentElement.style.height = '100px';

                    }}
                    onMouseLeave={(e) => {
                        e.target.style.width = '40px';
                        e.target.style.height = '50px';

                        e.target.parentElement.style.width = '40px';
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
            width: "11%",
            cell: row => <div style={{ textAlign: "center" }}>{row.district}</div>
        },
        {
            name: 'Party',
            selector: 'party',
            id: 'party',
            sortable: true,
            width: "12%",
            cell: row => capitalizeFirstLetter(row.party), // Capitalize the first letter and convert the rest to lowercase
        },
        {
            name: 'Race (s)',
            selector: 'races',
            id: 'races',
            sortable: true,
            width: "16%",
            cell: row => capitalizeFirstLetter(row.races[0]), // Capitalize the first letter and convert the rest to lowercase

        },
        {
            name: 'Vote Margin (%)',
            selector: 'margin',
            id: 'margin',
            sortable: true,
            right: true,
            width: "16%"
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
        setCurrDistrict(row);
        map.eachLayer((layer) => {
            if (layer.feature && layer.feature.properties["DISTRICT_N"] === row) {
                layer.bringToFront();
            }
        });
    };
    const ai = {
        "ALABAMA": {"White": 63, "Asian": 6, "Middle Eastern": 2, "Indian": 1, "Black": 25, "Latino Hispanic": 8},
        "DELAWARE": {"White": 24, "Asian": 0, "Middle Eastern": 2, "Indian": 1, "Black": 10, "Latino Hispanic": 4}
    };
    const actual = {
        "ALABAMA": {"White": 78, "Asian": 0, "Middle Eastern": 0, "Indian": 0, "Black": 27, "Latino Hispanic": 0},
        "DELAWARE": {"White": 30, "Asian": 1, "Middle Eastern": 0, "Indian": 0, "Black": 10, "Latino Hispanic": 0}
    };
    const diff = {
        "ALABAMA": 42,
        "DELAWARE": 12,
    }
    const renderPredictedRaces = () => {
        if (ai[state]) {
            const predictedRaces = Object.entries(ai[state]).map(([race, count]) => (
                <div key={race}>{race}: {count}</div>
            ));
            const actualRaces = Object.entries(actual[state]).map(([race, count]) => (
                <div key={race}>{race}: {count}</div>
            ));
            return (
                <div>
                    <div className="d-flex flex-row justify-content-between" style = {{fontSize: "14px", padding: "5px"}}>
                        <div className="fw-bold">DeepFace Expected Race Distribution: </div> {predictedRaces}
                    </div>
                    <div className="d-flex flex-row justify-content-between" style = {{fontSize: "14px", padding: "5px"}}>
                        <div className="fw-bold">Actual Race Distribution: </div> {actualRaces}
                    </div>
                    <div className="d-flex flex-row justify-content-left" style = {{fontSize: "14px", padding: "5px"}}>
                        <div><span className="fw-bold">Difference: </span><span> {diff[state]}</span></div>
                    </div>
                </div>
            );
        }
        return null; // Return null if no predicted races for the current state
    };

    return (
        <div className = "w-100">
            <span className="fw-bold" style={{fontSize: "20px"}}>{state.charAt(0) + state.slice(1).toLowerCase()} State Representatives</span>
            <DataTable
                columns={columns}
                data={data}
                // pagination
                customStyles = {customStyles}
                onRowClicked={(row, event) => handleClick(row.district)}
                pointerOnHover
            />
            {renderPredictedRaces()}

        </div>
    );
}

export default StateAssemblyTable;
