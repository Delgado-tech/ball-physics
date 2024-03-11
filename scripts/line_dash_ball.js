class ColorChanger {
    constructor(color, toColor) {
        this.color = color;
        this.toColor = toColor;
        this.currentColor = [...color];
    }

    colorToColor() {
        let match = 0;

        for (let i = 0; i < 3; i++) {
            if (this.currentColor[i] === this.toColor[i]) {
                match++;
                continue;
            }

            if (this.currentColor[i] > this.toColor[i]) this.currentColor[i]--;
            else this.currentColor[i]++;
        }

        if (match === 3) {
            const tempColor = [...this.color];
            this.color = [...this.toColor];
            this.toColor = tempColor;
        }
    }

    getCurrentColorRGBA() {
        return `rgba(${this.currentColor[0]}, ${this.currentColor[1]}, ${this.currentColor[2]}, 1)`;
    }

}

const color = [253, 255, 164];
const toColor = [216, 164, 255];
const colorChanger = new ColorChanger(color, toColor);


class DashBall {
    gravity = 0.4;

    constructor(x, y, r) {
        this.r = r ?? 50;
        this.x = x ?? ((Math.random() * (canvas.width - this.r)) + 1);
        this.y = y ?? ((Math.random() * (canvas.height - this.r)) + 20);
        this.vx = (Math.random() < 0.5 ? -1 : 1) * 2;
        this.gravityMutiplier = 1;
        this.impulse = 1;
        this.impulseMultiplier = 0.001;
        this.direction = 1;
        this.collisionLocations = [];
    }

    create() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = colorChanger.getCurrentColorRGBA()
        ctx.fill();
        ctx.closePath();
    }

    physics() {
        this.y += this.direction * this.gravity * this.gravityMutiplier * this.impulse;
        this.gravityMutiplier += this.direction;
        this.r *= 1.0005;


        if (this.grounded()) {
            this.direction = -1;
            this.collisionLocations.push("bottom");
            this.impulse += this.impulseMultiplier;
        }
        if (this.y < this.r) {
            this.direction = 1;
            this.collisionLocations.push("top");
            this.impulse += this.impulseMultiplier;
        }
        if (Math.abs(this.gravityMutiplier) <= 0) this.direction = 1;

        this.x += this.vx;
        if (this.x >= canvas.width - this.r) {
            this.vx = -Math.abs((Math.random()) + 4);
            this.collisionLocations.push("right");
            this.impulse += this.impulseMultiplier;
        }
        if (this.x <= 0 + this.r) {
            this.vx = Math.abs((Math.random()) + 4)
            this.collisionLocations.push("left");
            this.impulse += this.impulseMultiplier;
        }


    }


    grounded() {
        if (this.y > (canvas.height - this.r)) return true;
        return false;
    }
}

class Lines {
    linePositions = [];

    create(ballPosX, ballPosY) {
        this.linePositions.map((start) => {
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(ballPosX, ballPosY);
            ctx.strokeStyle = colorChanger.getCurrentColorRGBA();
            ctx.stroke();
            ctx.closePath();
        })
    }
}

