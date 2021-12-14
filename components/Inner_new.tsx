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
    span {
      background: #eee;
      padding: 5px;
      border-radius: 5px;
      display: inline-block;
      ul {
        margin: 0;
      }
    }
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
          <dl>
            <dt>単位円（半径=1）</dt>
          </dl>
          <dd>
            <ReactP5Wrapper
              sketch={sketch}
              angle={angle}
            />
          </dd>
        </UnitCircle>
        <Result>
          <dl>
            <dt>角度(θ)</dt>
            <dd><input type="number" value={angle} min="-360" max="360" onChange={changeAngle} />度（-360度〜360度）<br />
            <input type="range" name="hue" value={angle} min="-360" max="360" onChange={changeAngle} /></dd>
            <hr />
            <dt>円周率(π)</dt>
            <dd>
              <span>Math.PI = {pi}</span>
            </dd>
            <dt>ラジアン(rad)</dt>
            <dd>
              角度→ラジアン<br/>
              <span>θ * (Math.PI / 180) = {radian}</span><br/>
              ラジアン→角度<br/>
              <span>rad / (Math.PI / 180) = {radian / (pi / 180)}</span>
            </dd>
            <hr />
            <dt>サイン(sin)</dt>
            <dd>
              Y軸（単位円では高さ）<br />
              <span>Math.sin(rad) = {sin}</span>
            </dd>
            <dt>コサイン(cos)</dt>
            <dd>
              X軸（単位円では底辺）
              <span>Math.cos(rad) = {cos}</span>
            </dd>
            <dt>タンジェント(tan)</dt>
            <dd>
              X軸とY軸の傾き
              <span>Math.tan(rad) = {tan}</span>
            </dd>
            <hr />
            <dt>三角比(サイン)</dt>
            <dd>
              高さ(sin) / 斜辺(1) = サイン<br />
              <span>{sin} / 1  = {sin / 1}</span>
            </dd>
            <dt>三角比(コサイン)</dt>
            <dd>
              底辺(cos) / 斜辺(1) = コサイン<br />
              <span>{cos} / 1 = {cos / 1}</span>
            </dd>
            <dt>三角比(タンジェント)</dt>
            <dd>
              高さ(sin) / 底辺(cos) = タンジェント<br />
              <span>{sin} / {cos} = {sin / cos}</span><br />
              ※三角比の相互関係の公式①でもある
            </dd>
            <hr />
            <dt>三平方の定理</dt>
            <dd>
              底辺(cos)<sup>2</sup> + 高さ(sin)<sup>2</sup> = 斜辺(1)<br />
              <span>({cos} ** 2) + ({sin} ** 2) = {(cos ** 2) + (sin ** 2)}</span><br />
              ※三角比の相互関係の公式②でもある
            </dd>
            <hr />
            <dt>三角比の相互関係</dt>
            <dd>
              三角比の相互関係の公式③<br />
              1 + tan<sup>2</sup>θ = 1 / cos<sup>2</sup>θ<br />
              <span>
                <ul>
                  <li>1 + ({tan} ** 2) = 1 / ({cos} ** 2)</li>
                  <li>1 + {tan ** 2} = 1 / {cos ** 2}</li>
                  <li>{1 + tan ** 2} = {1 / cos ** 2}</li>
                </ul>
              </span>
              ※公式①、②の組み合わせで求まる公式<br />
              <ul>
                <li>
                  公式②より<br />
                  sin<sup>2</sup>θ + cos<sup>2</sup>θ = 1
                </li>
                <li>
                  両辺をcos<sup>2</sup>θで割る<br />
                  (sin<sup>2</sup>θ / cos<sup>2</sup>θ) + (cos<sup>2</sup>θ / cos<sup>2</sup>θ) = 1 / cos<sup>2</sup>θ
                </li>
                <li>約分すると<br />
                  (sin θ / cos θ)<sup>2</sup> + 1 = 1 / cos<sup>2</sup>θ
                </li>
                <li>
                  公式①よりタンジェントを代入<br />
                  tan<sup>2</sup>θ + 1 = 1 / cos<sup>2</sup>θ
                </li>
              </ul>

            </dd>

          </dl>
        </Result>
    </>
  );
}


export default Inner;
