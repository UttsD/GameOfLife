"use strict";
function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i_1 = 0; i_1 < arr.length; i_1++) {
        arr[i_1] = new Array(rows);
    }
    return arr;
}
var grid;
var position;
var cols;
var rows;
var resolutions = 10;
var canvas;
var ctx;
var _canvasWidth = document.getElementById('canvasWidth').value;
var _canvasHeight = document.getElementById('canvasHeight').value;
var timer;
function setup() {
    canvas = document.getElementById('cnvs');
    ctx = canvas.getContext("2d");
    position = 0;
    canvas.width = _canvasWidth;
    canvas.height = _canvasHeight;
    cols = canvas.width / resolutions;
    rows = canvas.height / resolutions;
    grid = make2DArray(cols, rows);
    for (var i_2 = 0; i_2 < cols; i_2++) {
        for (var j = 0; j < rows; j++) {
            grid[i_2][j] = Math.floor(Math.random() * 2) + 0;
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
    for (var i_3 = -1; i_3 < 2; i_3++) {
        for (var j = -1; j < 2; j++) {
            var col = (x + i_3 + cols) % cols;
            var row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}
for (var i = 0; i < 2; i++) {
    document.getElementsByTagName('input')[i].onkeypress =
        function NotANumber(e) {
            e = e || event;
            if (e.ctrlKey || e.altKey || e.metaKey)
                return;
            var chr = getChar(e);
            if (chr == null)
                return;
            if (chr < '0' || chr > '9') {
                return false;
            }
        };
    function getChar(event) {
        if (event.which == null) {
            if (event.keyCode < 32)
                return null;
            return String.fromCharCode(event.keyCode);
        }
        if (event.which != 0 && event.charCode != 0) {
            if (event.which < 32)
                return null;
            return String.fromCharCode(event.which);
        }
        return null;
    }
}
window.onload = function () {
    setup();
    draw();
    canvasWidth.onblur = function () {
        _canvasWidth = this.value;
        clearInterval(timer);
        setup();
        draw();
    };
    canvasHeight.onblur = function () {
        _canvasHeight = this.value;
        clearInterval(timer);
        setup();
        draw();
    };
    start.onclick = function () {
        timer = setInterval("game()", 10);
    };
    pause.onclick = function () {
        clearInterval(timer);
        canvas.addEventListener('click', function (event) {
            var x = event.offsetX;
            var y = event.offsetY;
            var i = Math.floor(x / resolutions);
            var j = Math.floor(y / resolutions);
                    if (grid[i][j] == 1) {
                        ctx.fillStyle = "white";
                        ctx.fillRect(x, y, resolutions - 1, resolutions - 2);
                        grid[i][j] == 0;
                    }
                    else {
                        ctx.fillStyle = "green";
                        ctx.fillRect(x, y, resolutions - 1, resolutions - 2);
                        grid[i][j] == 1;
                    }
                
        });
    };
};
