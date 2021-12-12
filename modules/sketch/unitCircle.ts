import { P5Instance } from 'react-p5-wrapper'


const unitCircle = (p5: P5Instance) => {
    let angle: number = 0;

    p5.setup = () => {
        const windowWidth = p5.windowWidth;
        // console.log('windowWidth', windowWidth);

        if (windowWidth < 500) {
            p5.createCanvas(windowWidth -60, windowWidth -60);
        } else {
            p5.createCanvas(500, 500);
        }
    };

    p5.updateWithProps = (props) => {
        if (props.angle || props.angle === 0) {
            angle = props.angle;
            // console.log('angle', angle);
        }
    };

    p5.mouseClicked = function() {
        // countClicks++;
    }

    p5.draw = () => {
        // サイズ設定
        const canvasSize = p5.width;
        const canvasHalfSize = canvasSize * 0.5;
        const radiusRatio = 0.8;
        const radiusSize = canvasHalfSize * radiusRatio;
        const pointRatio = 0.03;
        const pointSize = canvasSize * pointRatio;
        const memorySize = 5;

        // 三角関数
        const radian: number = angle * (p5.PI / 180);
        const sin: number = p5.sin(radian);
        const cos: number = p5.cos(radian);
        const tan: number = p5.tan(radian);

        // 初期設定
        p5.fill('#000');
        p5.stroke('#000');
        p5.strokeWeight(1);
        p5.background('#eee');

        // 単位円
        p5.stroke('#666');
        p5.noFill();
        p5.ellipse(
            canvasHalfSize,
            canvasHalfSize,
            canvasSize * radiusRatio,
            canvasSize * radiusRatio
        );

        // 三角形
        p5.noStroke();
        p5.fill('#fff');
        p5.triangle(
            canvasHalfSize,
            canvasHalfSize,
            canvasHalfSize + (cos * radiusSize),
            canvasHalfSize - (sin * radiusSize),
            canvasHalfSize + (cos * radiusSize),
            canvasHalfSize,
        );

        // X軸、Y軸の十字線
        p5.stroke('#666');
        p5.line(0, canvasHalfSize, canvasSize, canvasHalfSize);
        p5.line(canvasHalfSize, 0,  canvasHalfSize, canvasSize);

        // X座標
        p5.stroke('#aaa');
        p5.line(
            canvasHalfSize + (cos * radiusSize),
            canvasHalfSize,
            canvasHalfSize + (cos * radiusSize),
            canvasHalfSize - (sin * radiusSize)
        );

        // Y座標
        p5.line(
            canvasHalfSize,
            canvasHalfSize - (sin * radiusSize),
            canvasHalfSize + (cos * radiusSize),
            canvasHalfSize - (sin * radiusSize)
        );

        // 半径の半分(0.5)のメモリ
        p5.stroke('#666');
        p5.line(
            canvasHalfSize + (radiusSize * 0.5),
            canvasHalfSize - memorySize,
            canvasHalfSize + (radiusSize * 0.5),
            canvasHalfSize + memorySize,
        );
        p5.line(
            canvasHalfSize - memorySize,
            canvasHalfSize - (radiusSize * 0.5),
            canvasHalfSize + memorySize,
            canvasHalfSize - (radiusSize * 0.5),
        );
        p5.line(
            canvasHalfSize - (radiusSize * 0.5),
            canvasHalfSize - memorySize,
            canvasHalfSize - (radiusSize * 0.5),
            canvasHalfSize + memorySize,
        );
        p5.line(
            canvasHalfSize - memorySize,
            canvasHalfSize + (radiusSize * 0.5),
            canvasHalfSize + memorySize,
            canvasHalfSize + (radiusSize * 0.5),
        );

        // 半径
        p5.stroke('#999');
        p5.strokeWeight(3);
        p5.line(
            canvasHalfSize,
            canvasHalfSize,
            canvasHalfSize + (cos * radiusSize),
            canvasHalfSize - (sin * radiusSize)
        );

        // 原点
        p5.fill('#A63744');
        p5.noStroke();
        p5.ellipse(
            canvasHalfSize,
            canvasHalfSize,
            pointSize,
            pointSize
        );

        // 交点
        p5.ellipse(
            canvasHalfSize + (cos * radiusSize),
            canvasHalfSize - (sin * radiusSize),
            pointSize,
            pointSize
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