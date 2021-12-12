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

const Result = styled.div`
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
  const [angle, setAngle] = useState(30);
  const [radian, setRadian] = useState(0);
  const [angle2, setAngle2] = useState(0);


  // 円周率
  let pi:number = Math.PI;
  // pi = Number(pi.toFixed(4));


  // ラジアン→角度
  const radian2angle = (radian) => {
    let getAngle: number = radian / (Math.PI / 180);
    // getAngle = Number(getAngle.toFixed(4));
    setAngle2(getAngle);
  }


  // 角度→ラジアン
  const angle2radian = (angle) => {
    let getRadian: number = angle * (Math.PI / 180);
    // getRadian = Number(getRadian.toFixed(4));
    setRadian(getRadian);
    radian2angle(getRadian);
  }


  // 角度変更
  const changeAngle = (e: React.ChangeEvent<HTMLInputElement>) => {
    let getValue: number = Number(e.target.value);

    if (getValue > 360) {
      getValue = 360;
    } else if (getValue < -360) {
      getValue = -360;
    }

    setAngle(getValue);
    angle2radian(getValue);
  };


  // 初期設定
  useEffect(() => {
    angle2radian(angle);
  }
  ,[]);


  // JSX
  return (
    <>
        <UnitCircle>
          <ReactP5Wrapper
            sketch={sketch}
            angle={angle}
          />
        </UnitCircle>
        <Result>
          <dl>
            <dt>角度</dt>
            <dd><input type="number" value={angle} min="-360" max="360" onChange={changeAngle} />度（-360度〜360度）<br />
            <input type="range" name="hue" value={angle} min="-360" max="360" onChange={changeAngle} /></dd>
            <dt>円周率</dt>
            <dd>
            Math.PI = {pi}
            </dd>
            <dt>角度→ラジアン</dt>
            <dd>
            angle * (Math.PI / 180) = {radian}
            </dd>
            <dt>ラジアン→角度</dt>
            <dd>
            radian / (Math.PI / 180) = {angle2}
            </dd>
          </dl>
        </Result>
    </>
  );
}


export default Inner;
