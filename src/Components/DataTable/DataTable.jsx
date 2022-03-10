import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled, alpha } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

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
];

export default function DataTable({ adminData, setAdminData }) {
    const [selectedIds, setSelectedIds] = useState({});
    const [searchedItems, setSearchedItems] = useState([]);

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

    let interval;
    const debounce = (e, callback, delay) => {
        if (interval) {
            clearInterval(interval);
        }

        interval = setTimeout(() => {
            callback(e);
        }, delay);
    };

    const handleSearch = (e) => {
        let filteredData = adminData.filter((element) => {
            return element.email.includes(e.target.value) ||
                element.id.includes(e.target.value) ||
                element.name.includes(e.target.value) ||
                element.role.includes(e.target.value)
                ? element
                : null;
        });
        setSearchedItems(filteredData);
        // console.log('searchedItems:', searchedItems);
    };

    return (
        <div style={{ height: '85vh', width: '100%' }}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    onInput={(e) => debounce(e, handleSearch, 1000)}
                    placeholder='Search by name, email or role'
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <DataGrid
                rows={searchedItems.length ? searchedItems : adminData}
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
