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

    if(!searchParams.get("vectors")){
      setSearchParams(params => {
        params.set("vectors", 50);
        return params;
      });
    }
    setNVectors(searchParams.get("vectors"));

    if(!searchParams.get("lineWidth")){
      setSearchParams(params => {
        params.set("lineWidth", 3);
        return params;
      });
    }
    setLineWidth(searchParams.get("lineWidth"));

    if(!searchParams.get("colour1")){
      setSearchParams(params => {
        params.set("colour1", "ff0000");
        return params;
      });
    }
    setColour1("#" + searchParams.get("colour1"));

    if(!searchParams.get("colour2")){
      setSearchParams(params => {
        params.set("colour2", "7d0000");
        return params;
      });
    }
    setColour2("#" + searchParams.get("colour2"));

    if(!searchParams.get("startAlgo")){
      setSearchParams(params => {
        params.set("startAlgo", "rand");
        return params;
      });
    }
    setStartAlgo(searchParams.get("startAlgo"));
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
      />
    </div>
  );
}

export default App;
