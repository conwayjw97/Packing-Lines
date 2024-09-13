import sketch from './sketches/sketch';
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { ReactP5Wrapper } from "react-p5-wrapper";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [size, setSize] = useState();
  const [speed, setSpeed] = useState();
  const [nVectors, setNVectors] = useState();
  const [lineWidth, setLineWidth] = useState();
  const [colour1, setColour1] = useState();
  const [colour2, setColour2] = useState();
  const [startAlgo, setStartAlgo] = useState();
  const [loop, setLoop] = useState();

  const initSearchParam = (param, initValue, setState) => {
    if(!searchParams.get(param)){
      setSearchParams(params => {
        params.set(param, initValue);
        return params;
      })
    }
    setState(searchParams.get(param));
  }

  useEffect(() => {
    initSearchParam("size", 100, setSize);
    initSearchParam("speed", 50, setSpeed);
    initSearchParam("vectors", 50, setNVectors);
    initSearchParam("lineWidth", 3, setLineWidth);
    initSearchParam("colour1", "ff0000", setColour1);
    initSearchParam("colour2", "7d0000", setColour2);
    initSearchParam("startAlgo", "rand", setStartAlgo);
    initSearchParam("loop", "false", setLoop);
  });

  return (
    <div className="App">
      <ReactP5Wrapper 
        sketch={sketch} 
        size={size} 
        speed={speed} 
        nVectors={nVectors} 
        lineWidth={lineWidth} 
        colour1={colour1}
        colour2={colour2}
        startAlgo={startAlgo}
        loop={loop}
      />
    </div>
  );
}

export default App;
