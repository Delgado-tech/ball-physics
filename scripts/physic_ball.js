class PhysicBall {
    gravity = 0.4;

    constructor(x, y, r) {
        this.r = r ?? 50;
        this.x = x ?? ((Math.random() * (canvas.width - this.r)) + 1);
        this.y = y ?? ((Math.random() * (canvas.height - this.r)) + 1);
        this.vx = (Math.random() < 0.5 ? -1 : 1) * 2;
        this.gravityMutiplier = 1;
        this.impulse = 0;
        this.direction = 1;
        this.collisionLocations = [];
    }

    create() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = "white"
        ctx.fill();
        ctx.closePath()
    }

    physics() {

        if (!this.rolling()) {
            this.y += this.direction * this.gravity * this.gravityMutiplier
            this.gravityMutiplier += this.direction

            if (this.impulse < 1) this.impulse += 0.01

            if (this.grounded()) {
                this.direction = -1
                this.gravityMutiplier -= this.gravity * 10
                this.collisionLocations.push("bottom");
            }
            if (this.y < this.r) {
                this.direction = 1
                this.collisionLocations.push("top");
            }
            if (Math.abs(this.gravityMutiplier) <= 0) this.direction = 1

            this.x += this.vx;
            if (this.x >= canvas.width - this.r) {
                this.vx = -Math.abs((Math.random()) + 4);
                this.collisionLocations.push("right");
            }
            if (this.x <= 0 + this.r) {
                this.vx = Math.abs((Math.random()) + 4)
                this.collisionLocations.push("left");
            }
        } else {
            if (this.impulse > 0) {
                this.x += this.vx * this.impulse;
                this.impulse -= 0.005;

                if (this.x >= canvas.width - this.r) {
                    this.vx = -Math.abs(this.vx)
                    this.collisionLocations.push("right");
                }
                else if (this.x <= 0 + this.r) {
                    this.vx = Math.abs(this.vx)
                    this.collisionLocations.push("left");
                }
            }

        }

    }


    grounded() {
        if (this.y > (canvas.height - this.r)) return true;
        return false;
    }

    rolling() {
        if (this.grounded() && this.gravityMutiplier <= 0) return true;
        return false;
    }
}

