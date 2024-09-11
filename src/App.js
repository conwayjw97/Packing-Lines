import sketch from './sketches/sketch';
import React from "react";
import { BrowserRouter as Router, Route, Routes, useSearchParams } from 'react-router-dom';
import { ReactP5Wrapper } from "react-p5-wrapper";


function App() {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const size = searchParams.get("size");
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            <ReactP5Wrapper sketch={sketch}></ReactP5Wrapper>
          </div>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
