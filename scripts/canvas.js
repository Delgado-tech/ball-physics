/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");

/** @type {HTMLDivElement} */
const canvasContainer = document.getElementById("canvas_container");

canvas.width = canvasContainer.clientWidth;
canvas.height = 400;

window.addEventListener("resize", () => {
    canvas.width = canvasContainer.clientWidth;
})


/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");