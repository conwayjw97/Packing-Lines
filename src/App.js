import sketch from './sketches/sketch';
import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";

function App() {
  return (
    <div className="App">
      <ReactP5Wrapper sketch={sketch}></ReactP5Wrapper>
    </div>
  );
}

export default App;
