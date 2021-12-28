import styled from 'styled-components';
import Head from 'next/head';
import Header from '../components/Header';
import Profile from '../components/Profile';
import Footer from '../components/Footer';
import Data from '../data/data.json';


const headerTitle = Data.header.title;
const pageTitle = 'このアプリについて';
const pageText = 'サイン、コサイン、タンジェントって何？ グラフィック、モーション、3D作品の制作に多用される三角関数の理解を深めるために作りました。';
const headTitle = pageTitle + ' | ' + headerTitle;


// CSS in JS
const Main = styled.main`
    h2 {
        background: #eee;
        margin: 60px 0 20px;
        padding: 10px;
        border-radius: 3px;
    }
    h3 {
        margin: 40px 0 10px;
        padding: 0 0 10px;
        border-bottom: 1px solid #ddd;
    }
    figure {
        margin: 0 0 30px;
        img {
            max-width: 100%;
            box-shadow: 0 0 15px 2px rgb(0 0 0 / 10%);
        }
    }
`;


// Component
function About() {
    return (
        <>
        <Head>
            <title>{ headTitle }</title>
            <meta name="description" content={ pageText } />
            <meta property="og:title" content={ headTitle } />
            <meta property="og:description" content={ pageText } />
        </Head>

        <Header />
        <Main>
            <h1>{ pageTitle }</h1>
            <p dangerouslySetInnerHTML={{ __html: pageText }}></p>
            <section>
                <h2>使い方</h2>
                <ul>
                    <li><a href="#yoto">用途</a></li>
                    <li><a href="#tanien">単位円グラフ</a></li>
                    <li><a href="#kakudo">角度(θ)の変更</a></li>
                    <li><a href="#radian">ラジアン</a></li>
                    <li><a href="#sankaku-js">三角比のJS関数</a></li>
                    <li><a href="#sankaku-keisan">三角比の算出</a></li>
                    <li><a href="#sanheiho">三平方の定理</a></li>
                    <li><a href="#sogokankei">三角比の相互関係</a></li>
                    <li><a href="#sogo-sin">サインからコサイン、タンジェントを算出</a></li>
                    <li><a href="#sogo-cos">コサインからサイン、タンジェントを算出</a></li>
                    <li><a href="#sogo-tan">タンジェントからサイン、コサインを算出</a></li>
                    <li><a href="#gyakusankaku">逆三角関数のJS関数</a></li>
                    <li><a href="#sokyokusen">双曲線関数のJS関数</a></li>
                </ul>
                <section>
                    <h3 id="yoto">用途</h3>
                    <p>下記のような用途に活用できます。</p>
                    <ul>
                        <li>角度ごとの三角関数の計算結果を単位円グラフで視覚的に確認できる</li>
                        <li>JS(Mathオブジェクト)の三角関数系の組み込み関数による計算結果を確認できる</li>
                        <li>単位円グラフに用いるp5.jsの関数とJS組み込み関数の計算結果を比較できる</li>
                        <li>三角関数の主要な公式とJS組み込み関数の計算結果を比較できる</li>
                        <li>三角関数の公式の根拠となる主要な証明式を参照できる</li>
                    </ul>
                </section>
                <section>
                    <h3 id="tanien">単位円グラフ</h3>
                    <p>ページ上部に表示されているのは単位円のグラフです。左上に三角関数の主要な値を表示しています（小数は4桁で四捨五入）。
                   </p>
                    <figure><img src="img/sankaku_01.jpg" alt="単位円グラフ" /></figure>
                    <ul>
                        <li>単位円の半径r（直角三角形の斜辺）の長さは1です。</li>
                        <li>θは度数法による角度で初期値は30度です</li>
                        <li>radはラジアン（弧度法）による角度です</li>
                        <li>sinはサインで、Y座標（直角三角形の高さ）です</li>
                        <li>cosはコサインで、X座標（直角三角形の底辺）です</li>
                        <li>tanはタンジェントで、Y座標とX座標の傾きです</li>
                    </ul>
                </section>
                <section>
                    <h3 id="kakudo">角度(θ)の変更</h3>
                    <p>角度(θ)のスライダーは単位円グラフの角度と同期します。テキストで直接入力もできます。</p>
                    <figure><img src="img/sankaku_02.jpg" alt="角度の初期値(30度)" /></figure>
                    <p>角度スライダーを動かすと単位円グラフの角度も移動します。</p>
                    <figure><img src="img/sankaku_03.jpg" alt="角度をプラス側に移動" /></figure>
                    <p>角度スライダーはマイナス側にも動かせます。角度の範囲は-360度〜360度です。</p>
                    <figure><img src="img/sankaku_04.jpg" alt="角度をマイナス側に移動" /></figure>
                </section>
                <section>
                    <h3 id="radian">ラジアン</h3>
                    <p>三角関数の角度で使われるラジアン（弧度法）の算出。円周率(π)のJS関数(Math.PI)を使います。ラジアンから度数の算出も。</p>
                    <figure><img src="img/sankaku_05.jpg" alt="ラジアン" /></figure>
                    <p>角度のスライダーを変更するとラジアンの数値も同期して変化します（以下同じ）</p>
                    <figure><img src="img/sankaku_06.jpg" alt="ラジアン(角度の変更)" /></figure>
                    <p>「▶︎証明」を開くとラジアンと円周率(π)の関係がわかります</p>
                    <figure><img src="img/sankaku_07.jpg" alt="ラジアン(証明)" /></figure>
                </section>
                <section>
                    <h3 id="sankaku-js">三角比のJS関数</h3>
                    <p>引数にラジアンを入れると三角比を返すJS関数。</p>
                    <figure><img src="img/sankaku_08.jpg" alt="三角比のJS関数" /></figure>
                    <ul>
                        <li>サイン(Math.sin())：Y座標（直角三角形の高さ）</li>
                        <li>コサイン(Math.cos())：X座標（直角三角形の底辺）</li>
                        <li>タンジェント(Math.tan())：X座標とY座標の傾き</li>
                    </ul>
                </section>
                <section>
                    <h3 id="sankaku-keisan">三角比の算出</h3>
                    <p>直角三角形の2辺の長さから三角比を算出。JS関数の三角比の結果とほぼ同じことがわかります。</p>
                    <figure><img src="img/sankaku_09.jpg" alt="三角比の算出" /></figure>
                    <ul>
                        <li>高さ(sin) / 斜辺(1) = サイン</li>
                        <li>底辺(cos) / 斜辺(1) = コサイン</li>
                        <li>高さ(sin) / 底辺(cos) = タンジェント</li>
                    </ul>
                </section>
                <section>
                    <h3 id="sanheiho">三平方の定理</h3>
                    <p>直角三角形の3辺の長さの関係を算出。底辺の二乗と高さの二乗を足すと斜辺の二乗（=単位円の斜辺の長さ1）になります。</p>
                    <figure><img src="img/sankaku_10.jpg" alt="三平方の定理" /></figure>
                    <p>「▶︎証明」を開くと三平方の定理がなぜ成立するのかわかります。</p>
                    <figure><img src="img/sankaku_11.jpg" alt="三角比の算出(証明)" /></figure>
                </section>
                <section>
                    <h3 id="sogokankei">三角比の相互関係</h3>
                    <p>三角比の相互関係の公式①(=タンジェントの公式)、公式②(=三平方の定理)から求まる公式③。右辺と左辺は常に等しくなります。</p>
                    <figure><img src="img/sankaku_12.jpg" alt="三角比の相互関係" /></figure>
                    <p>「▶︎証明」を開くと三角比の相互関係の公式①、②、③の関係がわかります。</p>
                    <figure><img src="img/sankaku_13.jpg" alt="三角比の相互関係(証明)" /></figure>
                    <p>三角比の相互関係の公式を使うと三角比のどれか一つの値がわかれば他の2つの値も算出することができます。</p>
                </section>
                <section>
                    <h3 id="sogo-sin">サインからコサイン、タンジェントを算出</h3>
                    <p>三角比の相互関係の公式の実例。公式①、②を使ってサインからコサイン、タンジェントを算出します。</p>
                    <figure><img src="img/sankaku_14.jpg" alt="sin -> cos, tan" /></figure>
                    <p>ただし、角度が90度〜270度(-270度〜-90度)の場合はコサインをマイナスにする必要があります。</p>
                    <figure><img src="img/sankaku_14_2.jpg" alt="sin -> cos, tan" /></figure>
                </section>
                <section>
                    <h3 id="sogo-cos">コサインからサイン、タンジェントを算出</h3>
                    <p>三角比の相互関係の公式の実例。公式①、②を使ってコサインからサイン、タンジェントを算出します。</p>
                    <figure><img src="img/sankaku_15.jpg" alt="cos -> sin, tan" /></figure>
                    <p>ただし、角度が180度〜360度(0度〜-180度)の場合はサインをマイナスにする必要があります。</p>
                    <figure><img src="img/sankaku_15_2.jpg" alt="sin -> cos, tan" /></figure>
                </section>
                <section>
                    <h3 id="sogo-tan">タンジェントからサイン、コサインを算出</h3>
                    <p>三角比の相互関係の公式の実例。公式①、③を使ってタンジェントからサイン、コサインを算出します。</p>
                    <figure><img src="img/sankaku_16.jpg" alt="tan -> sin, cos" /></figure>
                    <p>ただし、角度が90度〜270度(-270度〜-90度)の場合はコサインをマイナスにする必要があります。</p>
                    <figure><img src="img/sankaku_16_2.jpg" alt="sin -> cos, tan" /></figure>
                </section>
                <section>
                    <h3 id="gyakusankaku">逆三角関数のJS関数</h3>
                    <p>三角関数から角度(ラジアン)を算出するJS関数。0〜90度まではどの関数も一致。それ以外はatan2()のみ360度一致（座標から直接算出できる意味でもこれが一番良さそうです）</p>
                    <figure><img src="img/sankaku_17.jpg" alt="逆三角関数のJS関数" /></figure>
                    <ul>
                        <li>アークタンジェント2(Math.atan2())：Y座標, X座標からラジアンを算出</li>
                        <li>アークサイン(Math.asin())：サインからラジアンを算出</li>
                        <li>アークコサイン(Math.acos())：コサインからラジアンを算出</li>
                        <li>アークタンジェント(Math.atan())：タンジェントからラジアンを算出</li>
                    </ul>
                    <p>逆三角関数の手計算は微分を用いた計算量が多い証明式のため、このJS関数を使うのが便利と思います。</p>
                </section>
                <section>
                    <h3 id="sokyokusen">双曲線関数のJS関数</h3>
                    <p>JS関数で用意された残りのジャンルである双曲線関数。</p>
                    <figure><img src="img/sankaku_18.jpg" alt="双曲線関数のJS関数" /></figure>
                    <ul>
                        <li>ハイパーボリックサイン(Math.sinh())</li>
                        <li>ハイパーボリックコサイン(Math.cosh())</li>
                        <li>ハイパーボリックタンジェント(Math.tanh())</li>
                        <li>ハイパーボリックアークサイン(Math.asinh())</li>
                        <li>ハイパーボリックアークコサイン(Math.acosh())</li>
                        <li>ハイパーボリックアークタンジェント(Math.atanh())</li>
                    </ul>
                    <p>これまでのどの計算結果とも一致せず、用途をよく理解できてないです（角度によって結果がどう変化するかを知るために追加）。</p>
                </section>
            </section>
            <section>
                <h2>詳細</h2>
                <section>
                    <h3>ブログ</h3>
                    <p><a href="https://www.i-ryo.com/entry/xxxx">タイトル - クモのようにコツコツと</a></p>
                </section>
                <section>
                    <h3>ソースコード（GitHub）</h3>
                    <p><a href="https://github.com/ryo-i/xxxxx">リポジトリ</a></p>
                </section>
            </section>
            <Profile />
        </Main>
        <Footer />
        </>
    );
}

export default About;