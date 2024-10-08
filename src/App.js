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
  const [colours, setColours] = useState();
  const [start, setStart] = useState();
  const [fill, setFill] = useState();
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
    initSearchParam("vectors", 100, setNVectors);
    initSearchParam("lineWidth", 3, setLineWidth);
    initSearchParam("colours", "ffffff-ff0000-7d0000", setColours);
    initSearchParam("start", "rand", setStart);
    initSearchParam("fill", "true", setFill);
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
        colours={colours}
        start={start}
        fill={fill}
        loop={loop}
      />
    </div>
  );
}

export default App;
