import React from 'react';
import DataTable from 'react-data-table-component';

function StateAssemblyTableDelaware() {
    const data = [
        {
            districtNumber: 1,
            representative: 'John Doe',
            party: 'Republican',
            ethnicity: 'Caucasian',
            voteMargin: 55.5,
        },
        {
            districtNumber: 2,
            representative: 'Jane Smith',
            party: 'Democrat',
            ethnicity: 'African American',
            voteMargin: 62.3,
        },
    ];
    const columns = [
        {
            name: 'District Number',
            selector: (row) => row.districtNumber,
        },
        {
            name: 'Representative',
            selector: (row) => row.representative,
        },
        {
            name: 'Party',
            selector: (row) => row.party,
        },
        {
            name: 'Ethnicity',
            selector: (row) => row.ethnicity,
        },
        {
            name: 'Vote Margin (%)',
            selector: (row) => row.voteMargin,
        },
    ];

    return (
        <div>
            <DataTable
                title="State Assembly Districts For Delaware"
                columns={columns}
                data={data}
                pagination
                selectableRows
            />
        </div>
    );
}

export default StateAssemblyTableDelaware;
