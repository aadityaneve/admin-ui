import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 140 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
        field: 'role',
        headerName: 'Role',
        // type: 'number',
        width: 130,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 130,
    },
    /* {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    }, */
];

export default function DataTable({ adminData, setAdminData }) {
    const [selectedIds, setSelectedIds] = useState({});

    const handleRowSelection = ({ id }) => {
        if (!selectedIds.hasOwnProperty(id)) {
            let obj = { ...selectedIds };
            obj[id] = 1;
            setSelectedIds(obj);
        }
    };

    const handleDelete = () => {
        let filteredData = adminData.filter((element) => {
            return selectedIds.hasOwnProperty(element.id) ? null : element;
        });
        setAdminData(filteredData);
    };

    return (
        <div style={{ height: '90vh', width: '100%' }}>
            <DataGrid
                rows={adminData}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                onCellClick={(row) => handleRowSelection(row)}
            />
            <Button variant='contained' color='error' onClick={handleDelete}>
                Delete Selected
            </Button>
        </div>
    );
}
