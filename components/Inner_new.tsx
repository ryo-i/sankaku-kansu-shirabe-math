import React, { useState, useEffect }  from 'react';
import styled from 'styled-components';
import { P5WrapperProps } from 'react-p5-wrapper';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
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
    display: block;
  }
  dd {
    font-size: 12px;
    span {
      background: #eee;
      padding: 5px;
      border-radius: 5px;
      display: block;
      ul {
        margin: 0;
      }
    }
  }
  img {
    max-width: 100%;
  }
  menu {
    padding: 10px 0;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    overflow-x: scroll;
    white-space: nowrap;
  }
  .react-tabs__tab-list {
    margin: 0;
    border: none;
    font-size: 12px;
    .react-tabs__tab {
      margin: 0 5px 5px 0;
      padding: 5px;
      font-size: 10px;
      background: #666;
      border-radius: 5px;
      background: #ddd;
      &--selected {
        background: #fff;
        border: 1px solid #ccc;
      }
    }
  }
`;


// Component
function Inner() {
  // Hooks
  const [angle, setAngle] = useState(30);
  const [rad, setRad] = useState(0);
  const [sin, setSin] = useState(0);
  const [cos, setCos] = useState(0);
  const [tan, setTan] = useState(0);


  // 円周率
  let pi:number = Math.PI;


  // 角度→ラジアン
  const angle2radian = (angle: number): void => {
    let getRadian: number = angle * (pi / 180);
    // getRadian = Number(getRadian.toFixed(4));
    setRad(getRadian);
  };

  // 三角比
  const trigonometricRatio = (radian: number): void => {
    setSin(Math.sin(radian));
    setCos(Math.cos(radian));
    setTan(Math.tan(radian));
  }

  // 角度変更
  const changeAngle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let getValue: number = Number(e.target.value);

    if (getValue > 360) {
      getValue = 360;
    } else if (getValue < -360) {
      getValue = -360;
    }

    setAngle(getValue);
  };


  // cosのプラマイチェック
  const checkCos = (): number => {
    let cos: number;
    if ((90 < angle && angle < 270) || (-270 < angle && angle < -90)) {
      cos = -(Math.sqrt(1 - Math.pow(sin, 2)));
    } else {
      cos = Math.sqrt(1 - Math.pow(sin, 2));
    }
    return cos;
  };


  // sinのプラマイチェック
  const checkSin = (): number => {
    let sin: number;
    if ((180 < angle && angle < 360) || (-180 < angle && angle < 0)) {
      sin = -(Math.sqrt(1 - Math.pow(cos, 2)));
    } else {
      sin = Math.sqrt(1 - Math.pow(cos, 2));
    }
    return sin;
  };


  // 初期設定
  useEffect(() => {
    angle2radian(angle);
    trigonometricRatio(rad);
  });


  // JSX
  return (
    <>
        <UnitCircle>
          <dl>
            <dt>単位円(半径r = 1)</dt>
          </dl>
          <dd>
            <ReactP5Wrapper
              sketch={sketch}
              angle={angle}
            />
          </dd>
        </UnitCircle>
        <Result>
          <Tabs>
          <dl>
            <dt>角度(θ)</dt>
            <dd>
              <input type="number" value={angle} min="-360" max="360" onChange={changeAngle} />度（-360度〜360度）
              <input type="range" name="hue" value={angle} min="-360" max="360" onChange={changeAngle} />
            </dd>
            <menu>
              <TabList>
                <Tab>ラジアン</Tab>
                <Tab>三角比の関数</Tab>
                <Tab>三角比の算出</Tab>
                <Tab>三平方の定理</Tab>
                <Tab>三角比の相互関係</Tab>
                <Tab>sin → cos, tan</Tab>
                <Tab>cos → sin, tan</Tab>
                <Tab>tan → sin, cos</Tab>
                <Tab>逆三角関数</Tab>
                <Tab>双曲線関数</Tab>
              </TabList>
            </menu>
            <TabPanel>
              <dt>ラジアン(rad)</dt>
              <dd>
                三角関数の角度は度数法ではなく弧度法（ラジアン）を用いる。<br />
              </dd>
              <dt>円周率(Math.PI)</dt>
              <dd>
                円周率(π)の値を返すJS関数
                <span>Math.PI = {pi}</span>
              </dd>
              <dt>度数→ラジアンを算出</dt>
              <dd>
                円周率を使って度数からラジアンを算出できる<br />
                θ * (π / 180) = rad
                <span>
                  <ul>
                    <li>θ * (Math.PI / 180) = {rad}</li>
                    <li>{angle} * (Math.PI / 180) = {rad}</li>
                  </ul>
                </span>
              </dd>
              <dt>ラジアン→度数を算出</dt>
              <dd>
                逆算でラジアンから度数を算出できる<br />
                rad / (π / 180) = θ
                <span>
                  <ul>
                    <li>rad / (Math.PI / 180) = {rad / (pi / 180)}</li>
                    <li>{rad} / (Math.PI / 180) = {rad / (pi / 180)}</li>
                  </ul>
                </span>
                <details>
                  <summary>証明</summary>
                  <ul>
                    <li>半径rと同じ長さの弧 = 1rad<br />
                    （通常は単位radは省略する）</li>
                    <li>円周の長さ = 2πrなので<br />
                      360度のrad = 2π</li>
                    <li>2で割ると<br />
                      180度のrad = π </li>
                    <li>さらに180で割ると<br />
                      1度あたりのrad = π / 180</li>
                    <li>角度(θ)をかけて度数からラジアンを算出<br />
                      θ * (π / 180) = rad</li>
                    <li>逆算でラジアンから度数を算出<br />
                      θ * (π / 180) = rad<br />
                      rad = θ * (π / 180)<br />
                      rad / (π / 180) = θ
                    </li>
                  </ul>
                </details>
              </dd>
            </TabPanel>
            <TabPanel>
              <dt>三角比のJS関数</dt>
              <dd>
                ラジアンから三角比を算出するJSの関数
              </dd>
              <dt>サイン(Math.sin())</dt>
              <dd>
                Y座標（直角三角形の高さ）
                <span>
                  <ul>
                    <li>Math.sin(rad) = {sin}</li>
                    <li>Math.sin({rad}) = {sin}</li>
                  </ul>
                </span>
              </dd>
              <dt>コサイン(Math.cos())</dt>
              <dd>
                X座標（直角三角形の底辺）
                <span>
                  <ul>
                    <li>Math.cos(rad) = {cos}</li>
                    <li>Math.cos({rad}) = {cos}</li>
                  </ul>
                </span>
              </dd>
              <dt>タンジェント(Math.tan())</dt>
              <dd>
                X座標とY座標の傾き
                <span>
                  <ul>
                    <li>Math.tan(rad) = {tan}</li>
                    <li>Math.tan({rad}) = {tan}</li>
                  </ul>
                </span>
              </dd>
            </TabPanel>
            <TabPanel>
              <dt>三角比の算出</dt>
              <dd>
                三角比 = 直角三角形の2辺の長さの比率<br />
                ※斜辺の長さは単位円の半径rなので1
              </dd>
              <dt>サインの算出</dt>
              <dd>
                高さ(sin) / 斜辺(1) = サイン
                <span>{sin} / 1  = {sin / 1}</span>
              </dd>
              <dt>コサインの算出</dt>
              <dd>
                底辺(cos) / 斜辺(1) = コサイン
                <span>{cos} / 1 = {cos / 1}</span>
              </dd>
              <dt>タンジェントの算出</dt>
              <dd>
                高さ(sin) / 底辺(cos) = タンジェント
                <span>{sin} / {cos} = {sin / cos}</span>
                ※<b>三角比の相互関係の公式①</b>でもある<br />
                tan θ = sin θ / cos θ
              </dd>
            </TabPanel>
            <TabPanel>
              <dt>三平方の定理</dt>
              <dd>
                直角三角形の3辺の長さは下記の関係になる<br />
                底辺(cos)<sup>2</sup> + 高さ(sin)<sup>2</sup> = 斜辺(1)<sup>2</sup>
                <span>
                  <ul>
                    <li>(Math.pow({cos}, 2)) + (Math.pow({sin}, 2)) = {(Math.pow(cos, 2)) + (Math.pow(sin, 2))}</li>
                    <li>{(Math.pow(cos, 2))} + {(Math.pow(sin, 2))} = {(Math.pow(cos, 2)) + (Math.pow(sin, 2))}</li>
                  </ul>
                </span>
                ※<b>三角比の相互関係の公式②</b>でもある<br />
                sin<sup>2</sup>θ + cos<sup>2</sup>θ = 1<br />
                <details>
                  <summary>証明（正方形を用いた証明）</summary>
                  <figure><img src="img/sanheiho.jpg" alt="三平方の定理の証明" /></figure>
                  <ul>
                    <li>
                      一辺 = 底辺 + 高さの大正方形の中に<br />
                      一辺 = 斜辺の小正方形がある
                    </li>
                    <li>
                      大正方形の面積は以下の2つといえる<br />
                      大正方形の面積 = (底辺 + 高さ)<sup>2</sup><br />
                      大正方形の面積 = 三角形4つの面積 + 小正方形の面積
                    </li>
                    <li>
                      三角形4つの面積 = (底辺 * 高さ / 2) * 4<br />
                      三角形4つの面積 = 2 * 底辺 * 高さ
                    </li>
                    <li>小正方形の面積 = 斜辺<sup>2</sup></li>
                    <li>
                      代入すると<br />
                      (底辺 + 高さ)<sup>2</sup> = (2 * 底辺 * 高さ) + 斜辺<sup>2</sup><br />
                      底辺<sup>2</sup> + (2 * 底辺 * 高さ) + 高さ<sup>2</sup> = (2 * 底辺 * 高さ) + 斜辺<sup>2</sup><br />
                      底辺<sup>2</sup> + 高さ<sup>2</sup> = 斜辺<sup>2</sup>
                    </li>
                  </ul>
                </details>
              </dd>
            </TabPanel>
            <TabPanel>
              <dt>三角比の相互関係</dt>
              <dd>
                三角比の相互関係の公式③<br />
                1 + tan<sup>2</sup>θ = 1 / cos<sup>2</sup>θ
                <span>
                  <ul>
                    <li>1 + Math.pow({tan}, 2) = 1 / Math.pow({cos}, 2)</li>
                    <li>1 + {Math.pow(tan, 2)} = 1 / {Math.pow(cos, 2)}</li>
                    <li>{1 + Math.pow(tan, 2)} = {1 / Math.pow(cos, 2)}</li>
                  </ul>
                </span>
                公式①、②の組み合わせで求まる公式<br />
                ※公式①は<b>タンジェントの算出式</b>、公式②は<b>三平方の定理</b>
                <details>
                <summary>証明</summary>
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
                </details>
              </dd>
            </TabPanel>
            <TabPanel>
              <dt>サインからコサイン、タンジェントを算出</dt>
              <dd>
                サインだけわかっている場合
                <span>sin = {sin}</span>
                公式②からコサインを算出
                <ul>
                  <li>sin<sup>2</sup>θ + cos<sup>2</sup>θ = 1</li>
                  <li>cos<sup>2</sup>θ = 1 - sin<sup>2</sup>θ</li>
                </ul>
                <span>
                  <ul>
                    <li>cos<sup>2</sup> = 1 - Math.pow({sin}, 2)</li>
                    <li>cos<sup>2</sup> = 1 - {Math.pow(sin, 2)}</li>
                    <li>cos<sup>2</sup> = {1 - Math.pow(sin, 2)}</li>
                    <li>cos = Math.sqrt({1 - Math.pow(sin, 2)})</li>
                    <li>cos = {Math.sqrt(1 - Math.pow(sin, 2))}</li>
                    <li>角度が90度〜270度(-270度〜-90度)の場合はマイナス<br />
                    cos = {checkCos()} ({angle}度)</li>
                  </ul>
                </span>
                公式①からタンジェントを算出<br />
                tan θ = sin θ / cos θ
                <span>
                  <ul>
                    <li>tan = {sin} / {checkCos()} </li>
                    <li>tan = {sin / checkCos()} </li>
                  </ul>
                </span>
              </dd>
            </TabPanel>
            <TabPanel>
              <dt>コサインからサイン、タンジェントを算出</dt>
              <dd>
                コサインだけわかっている場合
                <span>cos = {cos}</span>
                公式②からサインを算出
                <ul>
                  <li>sin<sup>2</sup>θ + cos<sup>2</sup>θ = 1</li>
                  <li>sin<sup>2</sup>θ = 1 - cos<sup>2</sup>θ</li>
                </ul>
                <span>
                  <ul>
                    <li>sin<sup>2</sup> = 1 - Math.pow({cos}, 2)</li>
                    <li>sin<sup>2</sup> = 1 - {Math.pow(cos, 2)}</li>
                    <li>sin<sup>2</sup> = {1 - Math.pow(cos, 2)}</li>
                    <li>sin = Math.sqrt({1 - Math.pow(cos, 2)})</li>
                    <li>sin = {Math.sqrt(1 - Math.pow(cos, 2))}</li>
                    <li>角度が180度〜360度(0度〜-180度)の場合はマイナス<br />
                    sin = {checkSin()} ({angle}度)</li>
                  </ul>
                </span>
                公式①からタンジェントを算出<br />
                tan θ = sin θ / cos θ
                <span>
                  <ul>
                    <li>tan = {checkSin()} / {cos} </li>
                    <li>tan = {checkSin() / cos} </li>
                  </ul>
                </span>
              </dd>
            </TabPanel>
            <TabPanel>
              <dt>タンジェントからサイン、コサインを算出</dt>
              <dd>
                タンジェントだけわかっている場合
                <span>tan = {tan}</span>
                公式③からコサインを算出
                <ul>
                  <li>1 + tan<sup>2</sup>θ = 1 / cos<sup>2</sup>θ</li>
                  <li>1 / cos<sup>2</sup>θ = 1 + tan<sup>2</sup>θ</li>
                  <li>cos<sup>2</sup>θ = 1 / 1 + tan<sup>2</sup>θ</li>
                </ul>
                <span>
                  <ul>
                    <li>cos<sup>2</sup> = 1 / 1 + Math.pow({tan}, 2)</li>
                    <li>cos<sup>2</sup> = 1 / 1 + {Math.pow(tan, 2)}</li>
                    <li>cos<sup>2</sup> = 1 / {1 + Math.pow(tan, 2)}</li>
                    <li>cos = Math.sqrt(1) / Math.sqrt({1 + Math.pow(tan, 2)})</li>
                    <li>cos = {Math.sqrt(1)} / {Math.sqrt(1 + Math.pow(tan, 2))}</li>
                    <li>cos = {Math.sqrt(1) / Math.sqrt(1 + Math.pow(tan, 2))}</li>
                    <li>角度が90度〜270度(-270度〜-90度)の場合はマイナス<br />
                    cos = {checkCos()} ({angle}度)</li>
                  </ul>
                </span>
                公式①からサインを算出<br />
                <ul>
                  <li>tan θ = sin θ / cos θ</li>
                  <li>sin θ / cos θ = tan θ</li>
                  <li>sin θ = tan θ * cos θ</li>
                </ul>
                <span>
                  <ul>
                    <li>sin = {tan} * {checkCos()}</li>
                    <li>sin = {tan * checkCos()}</li>
                  </ul>
                </span>
              </dd>
            </TabPanel>
            <TabPanel>
              <dt>逆三角関数のJS関数</dt>
              <dd>三角比からラジアンを算出するJS関数<br />
              ※0度〜90度まではすべて同じ結果で、他はatan2()の0〜180度と-180度〜0度がラジアンと一致する</dd>
              <dt>アークタンジェント2(Math.atan2())</dt>
              <dd>
                Y座標, X座標からラジアンを算出<br />
                単位円ではY座標 = sin, x座標 = cos
                <span>
                  <ul>
                    <li>Math.atan2(sin, cos) = {Math.atan2(sin, cos)}</li>
                    <li>Math.atan2({sin}, {cos}) = {Math.atan2(sin, cos)}</li>
                  </ul>
                </span>
              </dd>
              <dt>アークサイン(Math.asin())</dt>
              <dd>
                サインからラジアンを算出
                <span>
                  <ul>
                    <li>Math.asin(sin) = {Math.asin(sin)}</li>
                    <li>Math.asin({sin}) = {Math.asin(sin)}</li>
                  </ul>
                </span>
              </dd>
              <dt>アークコサイン(Math.acos())</dt>
              <dd>
                コサインからラジアンを算出
                <span>
                  <ul>
                    <li>Math.acos(cos) = {Math.acos(cos)}</li>
                    <li>Math.acos({cos}) = {Math.acos(cos)}</li>
                  </ul>
                </span>
              </dd>
              <dt>アークタンジェント(Math.atan())</dt>
              <dd>
                タンジェントからラジアンを算出
                <span>
                  <ul>
                    <li>Math.atan(tan) = {Math.atan(tan)}</li>
                    <li>Math.atan({tan}) = {Math.atan(tan)}</li>
                  </ul>
                </span>
              </dd>
            </TabPanel>
            <TabPanel>
              <dt>双曲線関数のJS関数</dt>
              <dd>三角比から双曲線関数を算出するJS関数</dd>
              <dt>ハイパーボリックサイン(Math.sinh())</dt>
              <dd>
                <span>
                  <ul>
                    <li>Math.sinh(sin) = {Math.sinh(sin)}</li>
                    <li>Math.sinh({sin}) = {Math.sinh(sin)}</li>
                  </ul>
                </span>
              </dd>
              <dt>ハイパーボリックコサイン(Math.cosh())</dt>
              <dd>
                <span>
                  <ul>
                    <li>Math.cosh(cos) = {Math.cosh(cos)}</li>
                    <li>Math.cosh({cos}) = {Math.cosh(cos)}</li>
                  </ul>
                </span>
              </dd>
              <dt>ハイパーボリックタンジェント(Math.tanh())</dt>
              <dd>
                <span>
                  <ul>
                    <li>Math.tanh(tan) = {Math.tanh(tan)}</li>
                    <li>Math.tanh({tan}) = {Math.tanh(tan)}</li>
                  </ul>
                </span>
              </dd>
              <dt>ハイパーボリックアークサイン(Math.asinh())</dt>
              <dd>
                <span>
                  <ul>
                    <li>Math.asinh(sin) = {Math.asinh(sin)}</li>
                    <li>Math.asinh({sin}) = {Math.asinh(sin)}</li>
                  </ul>
                </span>
              </dd>
              <dt>ハイパーボリックアークコサイン(Math.acosh())</dt>
              <dd>
                <span>
                  <ul>
                    <li>Math.acosh(cos) = {Math.acosh(cos)}</li>
                    <li>Math.acosh({cos}) = {Math.acosh(cos)}</li>
                  </ul>
                </span>
              </dd>
              <dt>ハイパーボリックアークタンジェント(Math.atanh())</dt>
              <dd>
                <span>
                  <ul>
                    <li>Math.atanh(tan) = {Math.atanh(tan)}</li>
                    <li>Math.atanh({tan}) = {Math.atanh(tan)}</li>
                  </ul>
                </span>
              </dd>
            </TabPanel>
          </dl>
          </Tabs>
        </Result>
    </>
  );
}


export default Inner;
