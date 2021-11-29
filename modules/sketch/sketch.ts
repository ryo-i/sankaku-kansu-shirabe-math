import p5 from 'p5';

const sketch = (s: p5) => {
    s.setup = () => {
        s.createCanvas(10, 10);
    }

    s.draw = () => {
        s.background(0);
        s.circle(10, 10, 10);
    }
}

// const sketchInstance = new p5(sketch);

export default sketch;