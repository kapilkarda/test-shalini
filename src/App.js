import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScheduleToday from "./Components/ScheduteToday/ScheduleToday";
import { CssBaseline } from "@material-ui/core";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScheduleToday />} />
        </Routes>
        <CssBaseline />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
