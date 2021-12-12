import React, { useState, useEffect }  from 'react';
import styled from 'styled-components';
import { P5WrapperProps } from 'react-p5-wrapper';
import sketch from '../modules/sketch/unitCircle';
import dynamic from "next/dynamic";


const ReactP5Wrapper = dynamic(() => import('react-p5-wrapper')
    .then(mod => mod.ReactP5Wrapper as any), {
    ssr: false
}) as unknown as React.NamedExoticComponent<P5WrapperProps>


// CSS in JS
const UnitCircle = styled.figure`
  canvas {
    border-radius: 10px;
    margin: 0 auto;
    display: block;
  }
`;

const Generator = styled.section`
  input[type='number'] {
    margin: 0 5px 0 0;
    border: 1px solid #ccc;
  }
  input[type='range'] {
    width: 100%;
  }
`;


// Component
function Inner() {
  // Hooks
  const [angle, setAngle] = useState(0);

  // Change Angle
  const changeAngle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const getValue: number = Number(e.target.value);
    setAngle(getValue);
  };

  // JSX
  return (
    <>
        <UnitCircle>
          <ReactP5Wrapper
            sketch={sketch}
            angle={angle}
          />
        </UnitCircle>
        <Generator>
          <p>角度：<input type="number" value={angle} min="-360" max="360" onChange={changeAngle} />度</p>
          <input type="range" name="hue" value={angle} min="-360" max="360" onChange={changeAngle} />
        </Generator>
    </>
  );
}


export default Inner;
