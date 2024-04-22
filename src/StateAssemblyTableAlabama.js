import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';

function StateAssemblyTableAlabama() {

    const [tableData, setTableData] = useState(null);
    useEffect( () => {
        fetch('http://localhost:8080/get_members/membersByState?state=ALABAMA')
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
                background: '#686464',
            },
        },
        {
            name: 'Name',
            selector: 'name',
            id: 'name',
            sortable: true,
            style: {
                background: '#686464',
            },
        },
        {
            name: 'District',
            selector: 'district',
            id: 'district',
            sortable: true,
            style: {
                background: '#686464',
            },
        },
        {
            name: 'Party',
            selector: 'party',
            id: 'party',
            sortable: true,
            style: {
                background: '#686464',
            },
        },
        {
            name: 'Race (s)',
            selector: 'races',
            id: 'races',
            sortable: true,
            style: {
                background: '#686464',
            },
        },
        {
            name: 'Vote Margin',
            selector: 'margin',
            id: 'margin',
            sortable: true,
            style: {
                background: '#686464',
            },
        },
    ];
    const customStyles = {
        pagination: {
            style: {
                backgroundColor: '#333', // Change the background color of the pagination controls
                color: 'black', // Change the text color of the pagination controls
                padding: '10px', // Add padding to the pagination controls
                borderRadius: '5px', // Add border radius to the pagination controls
            },
        },
        table: {
            style: {
                backgroundColor: '#333', // Change the background color of the title area
                color: '#fff', // Change the text color of the title
                padding: '20px', // Add padding to the title area
                borderRadius: '5px', // Add border radius to the title area
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

    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                pagination
                selectableRows = {false}
                customStyles={customStyles}
            />
        </div>
    );
}

export default StateAssemblyTableAlabama;
