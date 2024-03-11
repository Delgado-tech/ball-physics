let currentView = "default";
let freeze = false;

let physicBall = new PhysicBall();
let dashBall = new DashBall();
let lines = new Lines();


function reset() {
    physicBall = new PhysicBall();
    dashBall = new DashBall();
    lines = new Lines();

    toggleFreeze(false)
}

function setView(view) {
    if (view === currentView) return;

    reset();
    currentView = view;
}

function toggleFreeze(value) {
    freeze = value ?? !freeze;

    let btn = document.getElementById("btn_freeze");

    let text = "Congelar";
    if (freeze) {
        text = "Descongelar";
        btn.classList.add("selected");
    } else {
        btn.classList.remove("selected");
    }

    btn.innerText = text;
}

function drawnDashBall() {
    const ball = dashBall;
    ball.physics();

    if (ball.collisionLocations.length > lines.linePositions.length) {
        const lastCollision = ball.collisionLocations[ball.collisionLocations.length - 1];

        let x = 0;
        let y = 0;

        switch (lastCollision) {
            case "bottom":
                x = ball.x;
                y = canvas.height;
                break;
            case "left":
                x = 0;
                y = ball.y;
                break;
            case "right":
                x = canvas.width;
                y = ball.y;
                break;
            case "top":
                x = ball.x;
                y = 0;
                break;
            default:
                break;
        }

        lines.linePositions.push({ x, y });
    }

    lines.create(ball.x, ball.y);
    ball.create();

    colorChanger.colorToColor();
}

function drawnPhysicBall() {
    const ball = physicBall;
    ball.physics()
    ball.create();
}

function drawn() {
    if (!freeze) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (currentView === "default") drawnPhysicBall();
        else drawnDashBall();
    }

    requestAnimationFrame(drawn);
}

drawn();