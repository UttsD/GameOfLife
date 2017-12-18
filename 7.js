"use strict";
function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}
var grid;
var cols;
var rows;
var resolutions = 10;
var canvas;
var ctx;
function setup() {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;
    cols = canvas.width / resolutions;
    rows = canvas.height / resolutions;
    grid = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = Math.floor(Math.random() * 2) + 0;
        }
    }
}
function draw() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            var x = i * resolutions;
            var y = j * resolutions;
            if (grid[i][j] == 1) {
                ctx.fillStyle = "green";
                ctx.fillRect(x, y, resolutions - 1, resolutions - 2);
            }
            else {
                ctx.fillStyle = "white";
                ctx.fillRect(x, y, resolutions - 1, resolutions - 2);
            }
        }
    }
}
function game() {
    var next = make2DArray(cols, rows);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            var state = grid[i][j];
            var sum = 0;
            var neighbors = countNeighbors(grid, i, j);
            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            }
            else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            }
            else {
                next[i][j] = state;
            }
        }
    }
    grid = next;
    draw();
}
function countNeighbors(grid, x, y) {
    var sum = 0;
    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            var col = (x + i + cols) % cols;
            var row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}
window.onload = function () {
    setup();
    step.onclick = function () {
        game();
    };
};
