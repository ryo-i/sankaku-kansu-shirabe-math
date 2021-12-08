import { P5Instance } from 'react-p5-wrapper'


export let p2rText: string = 'p5.jsからReactへ';
export let countClicks = 0;


const unitCircle = (p5: P5Instance) => {
    let countTimes: number = 0;
    let r2pText: string = '';

    p5.setup = () => {
        const windowWidth = p5.windowWidth;
        // console.log('windowWidth', windowWidth);

        if (windowWidth < 600) {
            p5.createCanvas(windowWidth -60, windowWidth -60);
        } else {
            p5.createCanvas(600, 600);
        }
    };

    p5.updateWithProps = (props) => {
        if (props.r2pText) {
            r2pText = props.r2pText;
        }

        if (props.countTimes) {
            countTimes = props.countTimes;
        }
    };

    p5.mouseClicked = function() {
        countClicks++;
    }

    p5.draw = () => {
        p5.fill('#000');
        p5.stroke('#000');
        p5.strokeWeight(1);
        p5.background('#eee');

        const canvasSize = p5.width;
        const canvasHalfSize = canvasSize * 0.5;
        const radiusRatio = 0.8;
        const pointRatio = 0.03;

        // X軸、Y軸の十字線
        p5.line(0, canvasHalfSize, canvasSize, canvasHalfSize);
        p5.line(canvasHalfSize, 0,  canvasHalfSize, canvasSize);

        // 単位円
        p5.noFill();
        p5.ellipse(
            canvasHalfSize,
            canvasHalfSize,
            canvasSize * radiusRatio,
            canvasSize * radiusRatio
        );

        // 三角関数
        const angle: number = 15;
        const radian: number = angle * (p5.PI / 180);
        const sin: number = p5.sin(radian);
        const cos: number = p5.cos(radian);
        const tan: number = p5.tan(radian);

        // 半径
        p5.stroke('#999');
        p5.strokeWeight(4);
        p5.line(
            canvasHalfSize,
            canvasHalfSize,
            canvasHalfSize + (cos * canvasHalfSize * radiusRatio),
            canvasHalfSize - (sin * canvasHalfSize * radiusRatio)
        );

        // 原点
        p5.fill('#A63744');
        p5.noStroke();
        p5.ellipse(
            canvasHalfSize,
            canvasHalfSize,
            canvasSize * pointRatio,
            canvasSize * pointRatio
        );

        // 交点
        p5.ellipse(
            canvasHalfSize + (cos * canvasHalfSize * radiusRatio),
            canvasHalfSize - (sin * canvasHalfSize * radiusRatio),
            canvasSize * pointRatio,
            canvasSize * pointRatio
        );

        // テキスト
        p5.textSize(14);
        p5.noStroke();
        p5.fill('#000');
        p5.text('X', canvasSize - 20, canvasHalfSize - 5);
        p5.text('Y', canvasHalfSize + 5, 20);
        p5.text('angle: ' + angle, 5, 20);
        p5.text('radian: ' + radian.toFixed(4), 5, 40);
        p5.text('sin: ' + sin.toFixed(4), 5, 60);
        p5.text('cos: ' + cos.toFixed(4), 5, 80);
        p5.text('tan: ' + tan.toFixed(4), 5, 100);
    };

    p5.windowResized = () => {
        const windowWidth = p5.windowWidth;
        // console.log('windowWidth', windowWidth);

        if (windowWidth < 600) {
            p5.resizeCanvas(windowWidth -60, windowWidth -60);
        }
    };
};

export default unitCircle;