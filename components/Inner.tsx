import React, { useState, useEffect }  from 'react';
import styled from 'styled-components';
import { P5WrapperProps } from 'react-p5-wrapper';
import sketch from '../modules/sketch/unitCircle';
import { p2rText, timesClicked } from '../modules/sketch/unitCircle';
import dynamic from "next/dynamic";
import { inner } from '../data/data.json';


const ReactP5Wrapper = dynamic(() => import('react-p5-wrapper')
    .then(mod => mod.ReactP5Wrapper as any), {
    ssr: false
}) as unknown as React.NamedExoticComponent<P5WrapperProps>


const data = {
  text: 'reactからp5へ'
};


// CSS in JS
const H2 = styled.h2`
  color: red;
`;


// Component
function Inner() {
  // Hooks
  const [title, setTitle] = useState('内容が無いよう');
  const [text, setText] = useState('へんじがない、ただのしかばねのようだ。');
  const [clickTimes, setClickTimes] = useState(0);

  useEffect(() => {
    if (process.browser) {
      document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            console.log(p2rText);
            console.log(timesClicked);
            setText(p2rText);
            setClickTimes(timesClicked);
        }
      }
    }

    /* const interval = setInterval(
      () => setRotation(rotation => rotation + 100),
      100
    );

    return () => {
      clearInterval(interval);
    }; */
  }, []);

  // JSX
  return (
    <>
      <section>
        <figure id="unitCircle">
          <ReactP5Wrapper
            sketch={sketch}
            r2pText={data.text}
          />
        </figure>
        <h2>{ title }</h2>
        <p>{ text }</p>
        <p>※スペースをおしてみて！</p>
        <p>あなたのクリック数：{ clickTimes }</p>
      </section>
    </>
  );
}


export default Inner;
