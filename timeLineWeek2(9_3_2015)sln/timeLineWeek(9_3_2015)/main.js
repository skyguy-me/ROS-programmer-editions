//global objects
var canvas = document.getElementById("timeLineCanvas");
var context = canvas.getContext('2d');
var keyPointArray = [];

//global variables
var currentMousePos; //x & y-cordinate of cursor
var draging = false; //whether a drag event is occuring
var pointHit = false; //whether there is a existing point at click position
var hitIndex; //for keeping track of hit events

function setUp() { //clear and reset canvas
    context.rect(0, canvas.height, canvas.width, 0.5);//to draw minimum axis
    context.rect(0, 0, canvas.width, 0.5);//to draw max axis
    context.rect(0, canvas.height / 2.0, canvas.width, 0.5);//to draw the neutral axis
}

function KeyPoint(xCoord, yCoord, color) { //keyPointObject Skeleton
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    this.radius = 8.0;
    this.color = color;
}

keyPointArray[0] = new KeyPoint(0, canvas.height / 2, 'green');//add first point to Array

function getCurrentMousePos(canvas, evt) {//return X&Y of current mousePosition
    var rect = canvas.getBoundingClientRect();

    return {
        x: Math.round((evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
        y: Math.round((evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    };
}

function plotKeyPoint() {//to plot keyPoints onCanvas
    //local variables
    var index = 0;
    //
    context.clearRect(0, 0, canvas.width, canvas.height); //clear canvas and move to first coordinate's center
    context.moveTo(keyPointArray[0].xCoord, keyPointArray[0].yCoord);

    for (index; index < keyPointArray.length; index++) {
        var position = keyPointArray[index];
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.arc(position.xCoord, position.yCoord, position.radius, 0, 2 * Math.PI, false);
        context.moveTo(position.xCoord, position.yCoord);
        context.stroke();
        context.fillStyle = position.color;
        context.fill();
        context.moveTo(position.xCoord, position.yCoord);
    }
    delete index;
}

function hitPoint(point, mx, my) {
    var dx;
    var dy;
    dx = mx - point.xCoord;
    dy = my - point.yCoord;

    if ((dx * dx + dy * dy) < 120 == true) {
        delete dx;
        delete dy;
        return true
    }
    return false;
}

function sortArray() {
    keyPointArray.sort(function (a, b) { return a.xCoord - b.xCoord });
}

canvas.onmousedown = function (evt) {
    var searchIndex = 0
    pointHit = false;
    draging = false;
    currentMousePos = getCurrentMousePos(canvas, evt);

    for (searchIndex; searchIndex < keyPointArray.length; searchIndex++) {
        if (hitPoint(keyPointArray[searchIndex], currentMousePos.x, currentMousePos.y)) {
            hitIndex = searchIndex;
            pointHit = true;
            draging = true;
            delete searchIndex;
            break;
        }
    }
    delete searchIndex;

    if (pointHit == false) {
        var keyPoint = new KeyPoint(currentMousePos.x, currentMousePos.y, 'green');
        keyPointArray[keyPointArray.length] = keyPoint;
    }

    canvas.width = canvas.width;
    setUp();
    sortArray();
    plotKeyPoint();
}

canvas.onmousemove = function (evt) {
    currentMousePos = getCurrentMousePos(canvas, evt);
    if (draging == true) {
        keyPointArray[hitIndex].xCoord = currentMousePos.x;
        keyPointArray[hitIndex].yCoord = currentMousePos.y;
        canvas.width = canvas.width;
        setUp();
        plotKeyPoint();
    }
}

canvas.onmouseup = function (evt) {
    draging = false;
    canvas.width = canvas.width;
    setUp();
    sortArray();
    plotKeyPoint();
}