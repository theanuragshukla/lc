import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Box from '@mui/material/Box';
import Header from "./pages/header";
import GlobalRanking from "./pages/globalRanking";
import Standing from "./pages/standing";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  return (
    <Box className="App">
      <Header /> 
      <BrowserRouter>
        <Routes>
          <Route path = "/login" element = {<Login />}/>
          <Route path = "/signup" element = {<Signup />}/>
          <Route path = "/global-ranking" element = {<GlobalRanking />}/>
          <Route path = "/standing" element = {<Standing />}/>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
