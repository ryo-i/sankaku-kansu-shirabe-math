import p5 from 'p5';

const getStarted = (s: p5) => {
    s.setup = () => {
        s.createCanvas(400, 400);
    }

    s.draw = () => {
        s.background(220);
        s.ellipse(50, 50, 80, 80);

    }
}

export default getStarted;