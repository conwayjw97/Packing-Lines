import sketch from './sketches/sketch';
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { ReactP5Wrapper } from "react-p5-wrapper";


function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [size, setSize] = useState(50);
  const [speed, setSpeed] = useState(20);

  useEffect(() => {
    if(!searchParams.get("size")){
      setSearchParams(params => {
        params.set("size", 50);
        return params;
      });
    }
    setSize(searchParams.get("size"));

    if(!searchParams.get("speed")){
      setSearchParams(params => {
        params.set("speed", 20);
        return params;
      });
    }
    setSpeed(searchParams.get("speed"));
  });

  return (
    <div className="App">
      <ReactP5Wrapper sketch={sketch} size={size} speed={speed}></ReactP5Wrapper>
    </div>
  );
}

export default App;
