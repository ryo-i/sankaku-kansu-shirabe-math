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
        p5.background('#eee');
        p5.textSize(32);
        p5.text(r2pText, 10, 30);
        p5.text(countTimes + '秒経過', 10, 70);

        // X軸、Y軸の十字線
        p5.line(0, p5.height /2, p5.width, p5.height /2);
        p5.line(p5.width /2, 0,  p5.width /2, p5.height);

        // 単位円
        p5.noFill();
        p5.ellipse(p5.width * 0.5, p5.height * 0.5, p5.width * 0.8, p5.height * 0.8);
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