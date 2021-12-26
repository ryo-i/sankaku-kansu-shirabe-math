import styled from 'styled-components';
import Head from 'next/head';
import Header from '../components/Header';
import Profile from '../components/Profile';
import Footer from '../components/Footer';
import Data from '../data/data.json';


const headerTitle = Data.header.title;
const pageTitle = 'このアプリについて';
const pageText = 'サイン、コサイン、タンジェントって何？ グラフィック、モーション、3D作品の創作時に多用される三角関数の理解を深めるために作りました。';
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
            width: 100%;
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
                <section>
                    <h3>用途</h3>
                    <p>下記のような用途に活用できます。</p>
                    <ul>
                        <li>角度ごとの三角関数の計算結果を単位円グラフで視覚的に確認できる</li>
                        <li>JS Mathオブジェクトの三角関数系 組み込みメソッドの結果を確認できる</li>
                        <li>単位円グラフに用いるp5.jsのメソッドとJS組み込みメソッドの結果を比較できる</li>
                        <li>三角関数の公式とJS組み込み関数の結果を比較できる</li>
                        <li>三角関数の公式の主要な証明式を参照できる</li>
                    </ul>
                </section>
                <section>
                    <h3>タイトル</h3>
                    <p>説明説明説明説明説明説明説明説明</p>
                </section>
                <section>
                    <h3>タイトル</h3>
                    <p>説明説明説明説明説明説明説明説明</p>
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