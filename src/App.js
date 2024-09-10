import sketch from './sketches/sketch';
import React from "react";
import { Routes, Route, useSearchParams } from 'react-router-dom';
import { ReactP5Wrapper } from "react-p5-wrapper";


function App() {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const size = searchParams.get("size");
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact component={<ReactP5Wrapper sketch={sketch}></ReactP5Wrapper>} />
      </Routes>
    </div>
  );
}

export default App;
