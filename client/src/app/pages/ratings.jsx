import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import ApplyPagination from '../component/applyPagination';

function Rating() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [users, setUsers] = useState([ ]);
    const [searchByUsername, setSearchByUsername] = useState("");
    const [searchByName, setSearchByName] = useState(""); // may or may not be required
    const [searchBySchool, setSearchBySchool] = useState("");
    const [searchByCountry, setSearchByCountry] = useState("");

    // delete this utility function
    const createData = (
        _id,
        currentGlobalRanking,
        currentRating,
        username,
        name,
        school,
        country
      )  => ({
            _id,
            currentRating,
            currentGlobalRanking,
            username,
            name,
            school,
            country
        })

    const changePage = (e, page) => {
        setPage(page);
    }

    const changeLimit = (limit) => {
        setLimit(limit);
        console.log(limit);
    }
    
    const changeSearchByUsername = (username) => {
        setSearchByUsername(searchByUsername);
    }

    // may or may not be required
    const changeSearchByName = (name) => {
        setSearchByName(name);
    }
    
    const changeSearchBySchool = (e) => {
        setSearchBySchool(e.target.value);
    }
    
    const changeSearchByCountry = (e) => {
        setSearchByCountry(e.target.value);
    }

    const createSearchQueryString = () => {
        const  query = "";

        // build the search query

        return query;
    }

    const getUsers = ( ) => {
        // fetch call to get user data page wise
        /*
          @parameters
          - page
          - limit
          - searchByUsername
          - searchByName
          - searchBySchool
        */

        setUsers([
            createData(1, 1, 2700, '0abhay0', "Kunwar Abhay Rai", "IIT Patna", "India"),
            createData(2, 2, 2600, 'anurag', "Anurag Shukla", "MMM", "India"),
            createData(3, 3, 2500, 'manish', "Manish Kumar Rai", "MMM", "India"),
            createData(4, 4, 2400, 'kaushal', "Kaushal Raj", "IIT Patna", "India"),
            createData(5, 5, 2300, 'ashubeast', "Ashutosh Kumar", "IIT Patna", "India")]
        );
    }

    useEffect(( ) => {
        getUsers();
    }, [page, limit, searchByUsername, searchByName, searchBySchool]);

    return (
        <Box py={6}>
            <Grid container spacing={2} mb={8} px={4}>
                <Grid item xs={12} sm={6} lg={3}>
                    {/* May or may not be required */}
                    <TextField id="search-by-name" onChange={(e) => searchByName(e)} label="Search Name" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6} lg={3}>
                    {/* SEARCH USER */}
                    <TextField id="search-by-username" onChange={(e) =>searchByUsername(e)} label="Search Username" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Stack
                        direction={{ xs: 'column', lg: 'row' }}
                        spacing={{ xs: 2, sm: 4, lg: 6 }}
                        justifyContent="center"
                        alignItems="center"
                        >
                            {/* SORT BY SCHOOL */}
                            <Box width={{width : "100%"}}>
                                <FormControl fullWidth>
                                    <InputLabel id="search-by-school">School</InputLabel>
                                    <Select
                                        labelId="search-by-school"
                                        value={searchBySchool}
                                        onChange={changeSearchBySchool}
                                    >
                                        <MenuItem value={""}>Select Institution</MenuItem>
                                        <MenuItem value={"IIT Patna"}>Indian Institute of Technology Patna</MenuItem>
                                        <MenuItem value={"Madan Mohan Malviya University"}>Madan Mohan Malviya University</MenuItem>
                                        <MenuItem value={"Deen Dayal Upadhyay University"}>Deen Dayal Upadhyay University</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            
                            {/* SORT BY COUNTRY */}
                            <Box width={{width : "100%"}}>
                                <FormControl fullWidth>
                                    <InputLabel id="search-by-country">country</InputLabel>
                                    <Select
                                        labelId="search-by-country"
                                        value={searchByCountry}
                                        onChange={changeSearchByCountry}
                                    >
                                        <MenuItem value={""}>Select Country</MenuItem>
                                        <MenuItem value={"India"}>India</MenuItem>
                                        <MenuItem value={"USA"}>USA</MenuItem>
                                        <MenuItem value={"Canada"}>Canada</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                    </Stack>
                </Grid>
            </Grid>
                        
            <Box mb={8} px={4}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"> Global Rank </TableCell>
                                <TableCell align="left"> Rating </TableCell>
                                <TableCell align="left"> Username </TableCell>
                                <TableCell align="left"> Name </TableCell>
                                <TableCell align="left"> School </TableCell>
                                <TableCell align="left"> Country </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow
                                    key={user._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">
                                        {user.currentGlobalRanking}
                                    </TableCell>
                                    <TableCell align="left">{user.currentRating}</TableCell>
                                    <TableCell align="left">{user.username}</TableCell>
                                    <TableCell align="left">{user.name}</TableCell>
                                    <TableCell align="left">{user.school}</TableCell>
                                    <TableCell align="left">{user.country}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <ApplyPagination changeLimit={changeLimit} changePage={changePage} />
        </Box>
    )
}

export default Rating;