const SIDE_LENGTH = 600; //px
let BLOCKS = 32;

let BLOCK_LENGTH = SIDE_LENGTH / BLOCKS;

// // Color from CSS
// const root = document.documentElement;
// const rootStyles = getComputedStyle(root);
// const backgroundLight = rootStyles.getPropertyValue("--background-light").trim();

let canvas = document.querySelector(".canvas");

let color = "black"
let sketchMode = false;
let rainbowMode = false;

function createCanvas() {
    deleteCanvas();
    for (let i = 0; i < BLOCKS; i++) {
        //create 100 div rows
        const row = document.createElement("div");
        row.classList.add("row");
        //row.style.height = `${BLOCK_LENGTH}px`;

        for (let j = 0; j < BLOCKS; j++) {
            //create 100 div blocks for each row
            const block = document.createElement("div");
            block.classList.add("block");
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

let blocks = document.querySelectorAll(".block");
function clearCanvas() {
    blocks.forEach(block => {
        block.style.backgroundColor = "black";
    })
}

let colorGrid = document.querySelectorAll(".color-btn");
colorGrid.forEach(button => {
    button.addEventListener("click", () => {
        color = button.getAttribute("data-color");
        colorGrid.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    })
    button.addEventListener("mousedown", () => {
        button.classList.toggle("pressed");
    });
    button.addEventListener("mouseup", () => {
        button.classList.toggle("pressed");
    });
})

let size = document.getElementById("size");
size.addEventListener("click", () => {
    let dim = prompt("Enter grid size (1-100):", "32");
    while (dim < 1 || dim > 100) {
        dim = prompt("Invalid. Enter grid size (1-100):", "32");
    
    }
    BLOCKS = dim;
    createCanvas();
})
size.addEventListener("mousedown", () => {
    size.classList.toggle("pressed");
});
size.addEventListener("mouseup", () => {
    size.classList.toggle("pressed");
});

let sketch = document.getElementById("sketch");
sketch.addEventListener("click", () => {
    sketchMode = !sketchMode;
    clearCanvas();
    sketch.classList.toggle("active");
    rainbow.classList.remove("active");
});
sketch.addEventListener("mousedown", () => {
    sketch.classList.toggle("pressed");
});
sketch.addEventListener("mouseup", () => {
    sketch.classList.toggle("pressed");
});

let rainbow = document.getElementById("rainbow");
rainbow.addEventListener("click", () => {
    rainbowMode = !rainbowMode;
    clearCanvas();
    colorGrid.forEach(btn => btn.classList.remove("active"));
    rainbow.classList.toggle("active");
    sketch.classList.remove("active");
});
rainbow.addEventListener("mousedown", () => {
    rainbow.classList.toggle("pressed");
});
rainbow.addEventListener("mouseup", () => {
    rainbow.classList.toggle("pressed");
});

let clear = document.getElementById("clear");
clear.addEventListener("click", () => {
    clearCanvas();
})
clear.addEventListener("mousedown", () => {
    clear.classList.toggle("pressed");
});
clear.addEventListener("mouseup", () => {
    clear.classList.toggle("pressed");
});

createCanvas();
