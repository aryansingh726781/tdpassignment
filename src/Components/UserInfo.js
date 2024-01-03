import React, { useState, useEffect } from 'react';



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const UserInfo = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pastSearches, setPastSearches] = useState([]);

  useEffect(() => {
    // Load users from the API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));

    // Load past searches from localStorage
    const storedSearches = JSON.parse(localStorage.getItem('pastSearches')) || [];
    setPastSearches(storedSearches);
  }, []);

  useEffect(() => {
    // Save past searches to localStorage
    localStorage.setItem('pastSearches', JSON.stringify(pastSearches));
  }, [pastSearches]);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setPastSearches((prevSearches) => [...prevSearches, searchTerm]);
      setSearchTerm('');
    }
  };

  const handleSortByName = () => {
    setUsers((prevUsers) =>
      [...prevUsers].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  return (
    <div>
      <h1>User List</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <button onClick={handleSortByName}>Sort by Name</button>
      </div>
      <div>
        <h2>Past Searches:</h2>
        <ul>
          {pastSearches.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>User List:</h2>
        {/* <ul> */}
        
            {/* // <li key={user.id}>
            //   <strong>{user.name}</strong> - {user.email} {user.username}
       
            //   <div></div>
              
            // </li> */}
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">UserName</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Address</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                 
                    <TableCell align="right">{user.username}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.address.street}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


          
        {/* </ul> */}
      </div>
    </div>
  );
};
 
export default UserInfo ;
