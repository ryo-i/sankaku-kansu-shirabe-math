import p5 from 'p5';

const unitCircle = (p: p5) => {
    p.setup = () => {
        p.createCanvas(400, 400);
    }

    p.draw = () => {
        p.background(220);
        p.ellipse(50, 50, 80, 80);

    }
}

export default unitCircle;