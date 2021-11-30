import p5 from 'p5';

const unitCircle = (p: p5) => {
    p.setup = () => {
        const windowWidth = p.windowWidth;
        // console.log('windowWidth', windowWidth);

        if (windowWidth < 600) {
            p.createCanvas(windowWidth -60, windowWidth -60).parent('unitCircle');
        } else {
            p.createCanvas(600, 600).parent('unitCircle');
        }
    };

    p.draw = () => {
        p.background(220);
        p.ellipse(50, 50, 80, 80);
    };

    p.windowResized = () => {
        const windowWidth = p.windowWidth;
        // console.log('windowWidth', windowWidth);

        if (windowWidth < 600) {
            p.resizeCanvas(windowWidth -60, windowWidth -60);
        }
    };
};

export default unitCircle;