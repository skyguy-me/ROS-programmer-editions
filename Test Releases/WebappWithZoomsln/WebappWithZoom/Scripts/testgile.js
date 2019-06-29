
function plotKeyPoint() {//to plot keyPoints onCanvas
    //local variables
    var index = 0;


    for (index; index < keyPointArray.length; index++) {
        var position = keyPointArray[index];
        if (position.time > canvas.width / divisionNumber) {
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.arc(position.time * divisionNumber, position.yCoord, position.radius, 0, 2 * Math.PI, false);
        context.moveTo(position.time * divisionNumber, position.yCoord);
        context.stroke();
        context.fillStyle = position.color;
        context.fill();
        context.moveTo(position.time * divisionNumber, position.yCoord);
        delete position;
    }
    for (index = 0; index < keyPointArray2.length; index++) {
        var position = keyPointArray2[index];
        context2.clearRect(0, 0, canvas2.width, canvas2.height);
        context2.arc(position.time * divisionNumber, position.yCoord, position.radius, 0, 2 * Math.PI, false);
        context2.moveTo(position.time * divisionNumber, position.yCoord);
        context2.stroke();
        context2.fillStyle = position.color;
        context2.fill();
        context2.moveTo(position.time * divisionNumber, position.yCoord);
        delete position;
    }
    for (index = 0; index < keyPointArray3.length; index++) {
        var position = keyPointArray3[index];
        context3.clearRect(0, 0, canvas3.width, canvas3.height);
        context3.arc(position.time * divisionNumber, position.yCoord, position.radius, 0, 2 * Math.PI, false);
        context3.moveTo(position.time * divisionNumber, position.yCoord);
        context3.stroke();
        context3.fillStyle = position.color;
        context3.fill();
        context3.moveTo(position.time * divisionNumber, position.yCoord);
        delete position;
    }
    delete index;
}

function hitPoint(point, mx, my) {
    var dx;
    var dy;
    dx = mx - point.time * divisionNumber;
    dy = my - point.yCoord;

    if ((dx * dx + dy * dy) < 150 == true) {
        delete dx;
        delete dy;
        return true
    }
    return false;
}

function sortArray() {
    keyPointArray.sort(function (a, b) { return a.time - b.time });
    keyPointArray2.sort(function (a, b) { return a.time - b.time });
    keyPointArray3.sort(function (a, b) { return a.time - b.time });
}



function render() {
    if (playIndex > canvas.width) {
        stop();
    }
    else {
        myObject.rotation.y += 0.0005;
        neck1.rotation.z += 0.002
        neck2.rotation.z += 0.003
        neck3.rotation.z = 10
        neck4.rotation.z += 0.02;

        getPosition();
        plotKeyPoint();
        renderer.render(scene, camera);
    }
}

function renderTimer() {
    return setInterval(function () {
        render();
    }, 1)
}

function play() {
    alert('Zoom will not work while playing');
    isPlaying = true;

    keyPointArray[keyPointArray.length - 1].time = canvas.width / divisionNumber
    keyPointArray2[keyPointArray2.length - 1].time = canvas3.width / divisionNumber
    keyPointArray3[keyPointArray3.length - 1].time = canvas3.width / divisionNumber //add last point to Array
    return setInterval(function () {
        playIndex++;
    }, 33.3333333333343);
}

function start() {
    divisionNumber = canvas.width / 50;
    playIndex = 0;
    id = play();
}

function stop() {
    window.clearInterval(id);
    isPlaying = false;
    playIndex = 0;
    canvas.width = canvas.width;
    render();
    delete id;
}
zoomCanvas.onclick = function (evt) {
    divisionNumber = canvas.width / 50;
    currentMousePos = getCurrentMousePos(zoomCanvas, evt);
    if (!isPlaying) {
        var zoom = (currentMousePos.x / 300);
        if (zoom <= 1) {
            divisionNumber = canvas.width / 50;
        }
        else if (zoom <= 2) {
            divisionNumber = canvas.width / 25;
        }
        else if (zoom <= 3) {
            divisionNumber = canvas.width / 12.5;
        }
        else if (zoom <= 4) {
            divisionNumber = canvas.width / 6.25;
        }
        else {
            divisionNumber = canvas.width / 3.125;
        }
    }
    render();
}