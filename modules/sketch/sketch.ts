import { P5Instance } from 'react-p5-wrapper'

const sketch = (p5: P5Instance) => {
    let rotation = 0;

    p5.setup = () => p5.createCanvas(600, 400, p5.WEBGL);

    p5.updateWithProps = props => {
        if (props.rotation) {
        rotation = (props.rotation * Math.PI) / 180;
        }
    };

    p5.draw = () => {
        p5.background(100);
        p5.normalMaterial();
        p5.noStroke();
        p5.push();
        p5.rotateY(rotation);
        p5.box(100);
        p5.pop();
    };
};

export default sketch;