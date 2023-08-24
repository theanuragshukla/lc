import React, {useEffect, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

function ApplyPagination({changeLimit, changePage}) {
    const [limit, setLimit] = useState(25);
 
    return (
        <Stack direction="column" spacing={4} alignItems="center">
            <FormControl sx={{width : "120px"}}>
                <InputLabel id="limit">rows per page</InputLabel>
                <Select
                    labelId="limit"
                    id="limit"
                    value={limit}
                    label="limit"
                    onChange={(e) => {
                        changeLimit(e.target.value);
                        setLimit(limit);
                    }}
                >
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </FormControl>
                
            <Pagination count={1000} shape="rounded" color="secondary" siblingCount={2} boundaryCount={3}  onChange={changePage}/>
        </Stack>
    );
  }
  
  export default ApplyPagination;
  