const SIDE_LENGTH = 600; //px
let BLOCKS = 32; //default

let BLOCK_LENGTH = SIDE_LENGTH / BLOCKS;

// // Color from CSS
// const root = document.documentElement;
// const rootStyles = getComputedStyle(root);
// const backgroundLight = rootStyles.getPropertyValue("--background-light").trim();

const canvas = document.querySelector(".canvas");

let color = "black"
let sketchMode = false;
let rainbowMode = false;

//let BLOCK_LENGTH = Math.floor(Math.min(canvas.clientWidth, canvas.clientHeight)) / BLOCKS;

function createCanvas() {
    deleteCanvas();
    BLOCK_LENGTH = SIDE_LENGTH / BLOCKS; //WORKS??
    for (let i = 0; i < BLOCKS; i++) {
        //canvas.innerHTML = '';
        //create 100 div rows
        let row = document.createElement("div");
        row.classList.add("row");
        //row.style.height = `${BLOCK_LENGTH}px`;

        for (let j = 0; j < BLOCKS; j++) {
            //create 100 div blocks for each row
            let block = document.createElement("div");
            block.classList.add("block");
            // block.style.boxSizing = 'border-box';
            // block.style.display = "flex";
            block.setAttribute("style", `height: ${BLOCK_LENGTH}px; width: ${BLOCK_LENGTH}px;`);
            block.addEventListener("mouseover", () => {
                if (sketchMode) {
                    let opacity = parseFloat(block.getAttribute("data-opacity"));
                    if (opacity < 1) {
                        opacity += 0.1; // Increase opacity (darker color)
                        block.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
                        block.setAttribute("data-opacity", opacity.toString());
                    }
                } else {
                    block.style.backgroundColor = color;
                }
            })
            row.appendChild(block);
        }

        canvas.appendChild(row);
    }
}

function deleteCanvas() {
    let rows = document.querySelectorAll(".row");
    for (let row of rows) // rows.forEach(row => row.remove());
        canvas.removeChild(row);
}

function clearCanvas() {
    let blocks = document.querySelectorAll(".block");
    blocks.forEach(block => {
        block.style.backgroundColor = "transparent";
    })
}

let options = document.querySelector(".options");
let optionsButtons = options.querySelectorAll("button");
optionsButtons.forEach(button => {
    button.addEventListener("mousedown", () => {
        button.classList.toggle("pressed");
    });
    button.addEventListener("mouseup", () => {
        button.classList.toggle("pressed");
    });
    button.addEventListener("mouseleave", () => {
        button.classList.remove("pressed");
    });
});

let colorGrid = document.querySelectorAll(".color-btn");
colorGrid.forEach(button => {
    button.addEventListener("click", () => {
        color = button.getAttribute("data-color");
        colorGrid.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    })
});

let size = document.getElementById("size");
size.addEventListener("click", () => {
    let dim = prompt("Enter grid size (1-96):", "32");
    if (dim === null) return;

    while (isNaN(dim) || dim < 1 || dim > 96) {
        dim = prompt("Invalid. Enter grid size (1-96):", "32");
        if (dim === null) return;
    }
    
    BLOCKS = dim;
    createCanvas();
});

let sketch = document.getElementById("sketch");
sketch.addEventListener("click", () => {
    sketchMode = !sketchMode;
    clearCanvas();
    sketch.classList.toggle("active");
    rainbow.classList.remove("active");
});

let rainbow = document.getElementById("rainbow");
rainbow.addEventListener("click", () => {
    rainbowMode = !rainbowMode;
    clearCanvas();
    colorGrid.forEach(btn => btn.classList.remove("active"));
    rainbow.classList.toggle("active");
    sketch.classList.remove("active");
});

let clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    clearCanvas();
});

createCanvas();
