import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import DataTable from './Components/DataTable/DataTable';

function App() {
    const [adminData, setAdminData] = useState([]);

    const fetchData = () => {
        axios
            .get(
                `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
            )
            .then((response) => {
                setAdminData(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='App'>
            <DataTable adminData={adminData} setAdminData={setAdminData} />
        </div>
    );
}

export default App;
