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
  dd {
    font-size: 12px;
  }
`;


// Component
function Inner() {
  // Hooks
  const [angle, setAngle] = useState(30);
  const [radian, setRadian] = useState(0);
  const [sin, setSin] = useState(0);
  const [cos, setCos] = useState(0);
  const [tan, setTan] = useState(0);


  // 円周率
  let pi:number = Math.PI;


  // 角度→ラジアン
  const angle2radian = (angle) => {
    let getRadian: number = angle * (pi / 180);
    // getRadian = Number(getRadian.toFixed(4));
    setRadian(getRadian);
  };

  // 三角比
  const trigonometricRatio = (radian) => {
    setSin(Math.sin(radian));
    setCos(Math.cos(radian));
    setTan(Math.tan(radian));
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
  };


  // 初期設定
  useEffect(() => {
    angle2radian(angle);
    trigonometricRatio(radian);
  });


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
            <hr />
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
              radian / (Math.PI / 180) = {radian / (pi / 180)}
            </dd>
            <hr />
            <dt>サイン(Y軸, 高さ)</dt>
            <dd>
              Math.sin(angle) = {sin}
            </dd>
            <dt>コサイン(X軸, 底辺)</dt>
            <dd>
              Math.cos(angle) = {cos}
            </dd>
            <dt>タンジェント(傾き)</dt>
            <dd>
              Math.tan(angle) = {tan}
            </dd>
            <hr />
            <dt>三角比(サイン)</dt>
            <dd>
              高さ(sin) / 斜辺(1) = サイン<br />
              {sin} / 1  = {sin / 1}
            </dd>
            <dt>三角比(コサイン)</dt>
            <dd>
              底辺(cos) / 斜辺(1) = コサイン<br />
              {cos} / 1 = {cos / 1}
            </dd>
            <dt>三角比(タンジェント)</dt>
            <dd>
              高さ(sin) / 底辺(cos) = タンジェント<br />
              {sin} / {cos} = {sin / cos}
            </dd>
            <hr />
            <dt>三平方の定理</dt>
            <dd>
              底辺(con)<sup>2</sup> + 高さ(sin)<sup>2</sup> = 斜辺(1)<br />
              ({cos} ** 2) + ({sin} ** 2) = {(cos ** 2) + (sin ** 2)}
            </dd>
            <hr />

          </dl>
        </Result>
    </>
  );
}


export default Inner;
