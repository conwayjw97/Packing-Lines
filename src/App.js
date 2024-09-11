import sketch from './sketches/sketch';
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import { ReactP5Wrapper } from "react-p5-wrapper";


function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [size, setSize] = useState(50);

  useEffect(() => {
    const urlSize = searchParams.get("size");
    if(!urlSize){
      setSearchParams(params => {
        params.set("size", 50);
        return params;
      });
    }
    setSize(searchParams.get("size"));
  });

  return (
    <div className="App">
      <ReactP5Wrapper sketch={sketch} size={size}></ReactP5Wrapper>
    </div>
  );
}

export default App;
