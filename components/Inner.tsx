import React, { useState, useEffect }  from 'react';
import styled from 'styled-components';
import sketch from '../modules/sketch/unitCircle'
import dynamic from "next/dynamic";
import { inner } from '../data/data.json';

const Canvas = dynamic(() => import('./Canvas'), {
  loading: () => <></>,
  ssr: false
});

// CSS in JS
const H2 = styled.h2`
  color: red;
`;


// Component
function Inner() {
  // Hooks
  const [title, setTitle] = useState('内容が無いよう');
  const [text, setText] = useState('へんじがない、ただのしかばねのようだ。');

  useEffect(() => {
    // hello();
  });

  // JSX
  return (
    <>
      <section>
        <figure id="unitCircle">
          <Canvas sketch={sketch} />
        </figure>
        <h2>{ title }</h2>
        <p>{ text }</p>
      </section>
    </>
  );
}


export default Inner;
