const SIDE_LENGTH = 600; //px
let BLOCKS = 32; //default

let BLOCK_LENGTH = SIDE_LENGTH / BLOCKS;

// // Color from CSS
// const root = document.documentElement;
// const rootStyles = getComputedStyle(root);
// const backgroundLight = rootStyles.getPropertyValue("--background-light").trim();

const canvas = document.querySelector(".canvas");

let color = "black"
let blackButton = document.querySelector('.color-btn[data-color="black"]');
blackButton.classList.add("active");
let sketchMode = false;
let rainbowMode = false;

//let BLOCK_LENGTH = Math.floor(Math.min(canvas.clientWidth, canvas.clientHeight)) / BLOCKS;

function createCanvas() {
    deleteCanvas();
    BLOCK_LENGTH = SIDE_LENGTH / BLOCKS; //WORKS??
    for (let i = 0; i < BLOCKS; i++) { // create <=96 div rows
        let row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < BLOCKS; j++) { // create <=96 div blocks for each row
            let block = document.createElement("div");
            block.classList.add("block");
            block.setAttribute("style", `height: ${BLOCK_LENGTH}px; width: ${BLOCK_LENGTH}px;`);
            blockHover(block);
            row.appendChild(block);
        }

        canvas.appendChild(row);
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function blockHover(block) {
    block.addEventListener("mouseover", (e) => {
        let computedStyle = window.getComputedStyle(e.target);
        let currColor = computedStyle.backgroundColor;
        let currOpacity = parseFloat(computedStyle.opacity);

        // if (sketchMode) {
        //     // let currColor = window.getComputedStyle(e.target).backgroundColor;
        //     // let currOpacity = window.getComputedStyle(e.target).opacity;
            
        //     if (currOpacity < 1 && currColor !== "rgba(0, 0, 0, 0)") { //!= "transparent") {
        //         block.style.opacity = (currOpacity + 0.1).toFixed(1).toString();
        //     } else if (currColor === "rgba(0, 0, 0, 0)") {
        //         block.style.backgroundColor = color;
        //         block.style.opacity = "0.1";
        //     }

        if (sketchMode && rainbowMode) {
            if (currColor === "rgba(0, 0, 0, 0)") {
                block.style.backgroundColor = getRandomColor();
                block.style.opacity = "0.1";
            } else {
                block.style.opacity = (currOpacity + 0.1).toFixed(1);
            }
        } else if (sketchMode) {
            if (currColor === "rgba(0, 0, 0, 0)") {
                block.style.backgroundColor = color;
                block.style.opacity = "0.1";
            } else {
                block.style.opacity = (currOpacity + 0.1).toFixed(1);
            } 
        } else if (rainbowMode) {
            block.style.backgroundColor = getRandomColor();
            block.style.opacity = "1";
        } else {
            block.style.backgroundColor = color;
            block.style.opacity = "1";
        }
    })
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

let sketch = document.getElementById("sketch"); // works after pressing clear...
sketch.addEventListener("click", () => {
    sketchMode = !sketchMode;
    //clearCanvas();
    sketch.classList.toggle("active");

    //rainbow.classList.remove("active"); // sketch with rainbow
});

let rainbow = document.getElementById("rainbow");
let activeColorButton = document.querySelector(".color-btn.active");
rainbow.addEventListener("click", () => {
    rainbowMode = !rainbowMode;
    //clearCanvas();
    colorGrid.forEach(btn => btn.classList.remove("active"));

    if (rainbowMode) {
        activeColorButton = document.querySelector(".color-btn.active"); 
        colorGrid.forEach(btn => {
            btn.classList.remove("active");
            btn.disabled = true;
        });
    } else {
        colorGrid.forEach(btn => btn.disabled = false);

        if (activeColorButton)
            activeColorButton.classList.add("active");
    }

    //     let colorBtn = colorGrid.querySelector(`${color}`); // nope
    //     colorBtn.classList.toggle("active");

    rainbow.classList.toggle("active");
    //sketch.classList.remove("active");
});

let clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    clearCanvas();
});

createCanvas();
