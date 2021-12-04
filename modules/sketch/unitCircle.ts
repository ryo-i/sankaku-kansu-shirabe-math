import { P5Instance } from 'react-p5-wrapper'


const unitCircle = (p5: P5Instance) => {
    let text: string = '';
    let rotation: number = 0;

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
        if (props.rotation) {
            rotation = (props.rotation * Math.PI) / 180;
        }

        if (props.text) {
            text = props.text;
        }
    };

    p5.draw = () => {
        p5.background(220);
        p5.ellipse(50, 50, 80, 80);
        p5.textSize(32);
        p5.text(text, 10, 30);
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