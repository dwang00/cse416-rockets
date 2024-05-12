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

    const columns = [
        {
            name: 'Image',
            selector: 'img',
            id: 'img',
            cell: row => <img src={row.img} alt="Profile" style={{ width: '50px', height: "100%", borderRadius: '50%', backgroundColor: "white" }} data-tag="allowRowEvents"/>,
            style: {
                background: 'white',
            },
        },
        {
            name: 'Name',
            selector: 'name',
            id: 'name',
            sortable: true,
            style: {
                background: 'white',
            },
        },
        {
            name: 'District',
            selector: 'district',
            id: 'district',
            sortable: true,
            style: {
                background: 'white',
            },
        },
        {
            name: 'Party',
            selector: 'party',
            id: 'party',
            sortable: true,
            style: {
                background: 'white',
            },
        },
        {
            name: 'Race (s)',
            selector: 'races',
            id: 'races',
            sortable: true,
            style: {
                background: 'white',
            },
        },
        {
            name: 'Vote Margin',
            selector: 'margin',
            id: 'margin',
            sortable: true,
            style: {
                background: 'white',
            },
        },
    ];
    const customStyles = {
        pagination: {
            style: {
                backgroundColor: '#e6e6e6', // Change the background color of the pagination controls
                color: 'black', // Change the text color of the pagination controls
                padding: '10px', // Add padding to the pagination controls
                borderRadius: '5px', // Add border radius to the pagination control
            },
        },
        table: {
            style: {
                backgroundColor: '#e6e6e6',
                color: 'black',
                padding: '20px',
                borderRadius: '5px',
            },
        },
        header: {
            style: {
                minHeight: '10%',
                maxHeight: '10%',
                backgroundColor: 'e6e6e6',
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

    return (
        <div className = "w-100" >
            <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles = {customStyles}
                title={"State Representatives"}
                onRowClicked={(row, event) => handleClick(row.district)}
                pointerOnHover
            />
        </div>
    );
}

export default StateAssemblyTable;
