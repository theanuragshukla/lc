import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Box from '@mui/material/Box';
import Ratings from "./pages/ratings";
import { color } from "@mui/system";


function App() {
  return (
    <Box className="App"> 
      <BrowserRouter>
        <Routes>
          <Route path = "/ratings" element = {<Ratings />}/>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
