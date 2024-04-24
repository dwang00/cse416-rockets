import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import "./App.css";

function StateAssemblyTable({state, selectedRowsData = [], setSelectedRowsData }) {

    const [tableData, setTableData] = useState(null);
    useEffect( () => {
        fetch(`http://localhost:8080/get_members/membersByState?state=${state}`)
            .then(response => response.json())
            .then(data => {
                setTableData(data)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    if (!tableData) {
        return <div>Loading...</div>;
    }

    const data = tableData

    const columns = [
        {
            name: 'Image',
            selector: 'img',
            id: 'img',
            cell: row => <img src={row.img} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />,
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
    };

    const handleRowsClicked = (selectedRows, state) => {
        if (!selectedRows || !selectedRows.selectedRows || selectedRows.selectedRows.length === 0) {
            setSelectedRowsData([]);
            return;
        }

        const newlySelectedRowsData = selectedRows.selectedRows.map(row => ({
            district: row.district,
            state: row.state
        }));

        setSelectedRowsData(newlySelectedRowsData);
        console.log(newlySelectedRowsData)
    };

    return (
        <div className = "w-100" >
            <DataTable
                columns={columns}
                data={data}
                pagination
                customStyles = {customStyles}
                onSelectedRowsChange = {handleRowsClicked}
            />
        </div>
    );
}

export default StateAssemblyTable;
