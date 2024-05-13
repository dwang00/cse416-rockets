import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import "./App.css";

function StateAssemblyTable({state, map, setMap, currDistrict, setCurrDistrict }) {

    const [tableData, setTableData] = useState(null);
    const [filteredData, setFilteredData] = useState(null); // State to hold filtered data
    const [selectedFilter, setSelectedFilter] = useState(''); // State to hold selected filter

    //const [selectedRows, setSelectedRows] = useState([]);

    useEffect( () => {
        console.log("1231231231231231231231",state)
        fetch(`http://localhost:8080/get_members/membersByState?state=${state}`)
            .then(response => response.json())
            .then(data => {
                console.log("1111111111111111111111")
                console.log(data)
                setTableData(data);
                setFilteredData(data); // Initialize filteredData with the fetched data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [state]);

    useEffect(() => {
        // Filter data based on selected filter
        if (selectedFilter === '') {
            setFilteredData(tableData); // If no filter is selected, display all data
        } else {
            const filtered = tableData.filter(row => {
                if (selectedFilter === 'African American') {
                    return row.races.includes('african american');
                } else if (selectedFilter === 'Caucasian') {
                    return row.races.includes('caucasian');
                } else if (selectedFilter === 'Democratic') {
                    return row.party.toLowerCase() === 'democratic';
                } else if (selectedFilter === 'Republican') {
                    return row.party.toLowerCase() === 'republican';
                }
                return true;
            });
            setFilteredData(filtered);
        }
    }, [tableData, selectedFilter]);

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    };
    if (!tableData) {
        return <div>Loading...</div>;
    }
    const data = tableData
    const capitalizeFirstLetter = (string) => {
        let real;
        console.log(string);
        if(string === "DEMOCRAT") {
            real = "Democratic"
            return real;
        }
        if(string === "african american") {
            real = "African American"
            return real;
        }
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
                        <div className="fw-bold">Expected Race Distribution: </div> {predictedRaces}
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
        <div className="w-100">
            <div className="fw-bold" style={{fontSize:"22px"}}>{state.charAt(0) + state.slice(1).toLowerCase()} State Representatives</div>
            <select value={selectedFilter} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="African American">African American</option>
                <option value="Caucasian">Caucasian</option>
                <option value="Democratic">Democratic</option>
                <option value="Republican">Republican</option>
            </select>
            <DataTable
                columns={columns}
                data={filteredData}
                customStyles={customStyles}
                onRowClicked={(row, event) => handleClick(row.district)}
                pointerOnHover
            />
            {renderPredictedRaces()}

        </div>
    );
}

export default StateAssemblyTable;
