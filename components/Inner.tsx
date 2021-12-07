import React, { useState, useEffect }  from 'react';
import styled from 'styled-components';
import { P5WrapperProps } from 'react-p5-wrapper';
import sketch from '../modules/sketch/unitCircle';
import { p2rText, countClicks } from '../modules/sketch/unitCircle';
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
const UnitCircle = styled.figure`

`;


// Component
function Inner() {
  // Hooks
  const [title, setTitle] = useState('値の受け渡しテスト');
  const [text, setText] = useState('へんじがない、ただのしかばねのようだ。');
  const [clickTimes, setClickTimes] = useState(0);
  const [countTimes, setCountTimes] = useState(0);

  useEffect(() => {
    if (process.browser) {
      document.body.onclick = function(e){
        setText(p2rText);
        setClickTimes(countClicks + 1);
      }
    }

    let countUp: number;
    const interval = setInterval(
      () => {
        setCountTimes(countTimes => countTimes + 1);
      },
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  // JSX
  return (
    <>
      <UnitCircle id="unitCircle">
        <ReactP5Wrapper
          sketch={sketch}
          r2pText={data.text}
          countTimes={countTimes}
        />
      </UnitCircle>
      <section>
        <h2>{ title }</h2>
        <p>{ text }</p>
        <p>あなたのクリック数：{ clickTimes }</p>
      </section>
    </>
  );
}


export default Inner;
