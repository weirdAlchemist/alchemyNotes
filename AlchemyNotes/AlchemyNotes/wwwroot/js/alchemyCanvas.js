var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;

        currTranslateX = 0;
        currTranslateY = 0;

    var drawnObjects = [];
    var currentlyDrawing = null;

    var oldPos = [];
    var currentPos = [];

    var x = "black",
        y = 2;

    var activePen = getPen();

    function init() {
        registerCanvas();
        registerEvents();
    }

    function registerCanvas() {
        canvas = document.getElementById('can2');
        ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        w = canvas.width;
        h = canvas.height;
    }

    function registerEvents() {
        canvas.addEventListener("mousedown", function (e) {
            setTimeout(newObjectDrawing(e), 0);
        }, false);
        canvas.addEventListener("touchstart", function (e) {
            setTimeout(newObjectDrawing(e), 0);
        }, false);


        canvas.addEventListener("mousemove", function (e) {
            if (currentlyDrawing === null) return;
            e.drawObject = currentlyDrawing;
            setTimeout(addToObjectDrawing(e), 0);
        }, false);
        canvas.addEventListener("touchmove", function (e) {
            if (currentlyDrawing === null) return;
            e.drawObject = currentlyDrawing;
            setTimeout(addToObjectDrawing(e), 0);
        }, false);


        canvas.addEventListener("mouseup", function (e) {
            setTimeout(closeObjectDrawing(e), 0);
        }, false);
        canvas.addEventListener("touchend", function (e) {
            setTimeout(closeObjectDrawing(e), 0);
        }, false);


        canvas.addEventListener("mouseout", function (e) {
            if (currentlyDrawing === null) return;
            setTimeout(closeObjectDrawing(e), 0);
        }, false);
        canvas.addEventListener("touchcancel", function (e) {
            if (currentlyDrawing === null) return;
            setTimeout(closeObjectDrawing(e), 0);
        }, false);
    }

    function getPen() {
        var can2 = document.getElementById('can2');
        var ctx = can2.getContext("2d");

        var pen = {};

        pen.size = 2;
        pen.red = 0;
        pen.green = 0;
        pen.blue = 0;

        pen.threshold = 3;

        pen.context = ctx;

        pen.stroke = "pen";

        return pen;
    }

    function getBlockMarker() {
        var can1 = document.getElementById('can1');
        var ctx = can1.getContext("2d");

        var pen = {};

        pen.size = 20;
        pen.red = 0;
        pen.green = 0;
        pen.blue = 255;

        pen.threshold = 2;

        pen.stroke = "block";

        pen.context = ctx;

        return pen;
    }

    function getCircleMarker() {
        var can1 = document.getElementById('can1');
        var ctx = can1.getContext("2d");

        var pen = {};

        pen.size = 20;
        pen.red = 0;
        pen.green = 0;
        pen.blue = 255;

        pen.threshold = 2;

        pen.stroke = "circle";

        pen.context = ctx;

        return pen;
    }

    function newObjectDrawing(e) {
        currentPos = getPosition(e);
        currentlyDrawing = [];

        currentlyDrawing.push(currentPos);
        console.log("started drawing");

        e.preventDefault();
    }

    function addToObjectDrawing(e) {
        e.preventDefault();

        var currentlyDrawing = e.drawObject;
        //if (currentlyDrawing === null) return;

        var readPos = getPosition(e);

        if (Math.abs(oldPos[0] - readPos[0]) < 3 && Math.abs(oldPos[1] - readPos[1]) < 3) return;
    
        var ctx = activePen.context;

        oldPos = currentPos;
        currentPos = getPosition(e);

        var startPos = oldPos;
        var endPos = currentPos;

        var deltaX = currentPos[0] - oldPos[0];
        var deltaY = currentPos[1] - oldPos[1];

        var ratioX = 0;
        var ratioY = 0;

        if (deltaX !== 0 && deltaY !== 0) {
            ratioX = Math.abs(deltaX) / Math.abs(deltaY);
            ratioX = (ratioX > 1) ? 1 : ratioX;
            if (deltaX < 0) ratioX *= -1;

            ratioY = Math.abs(deltaY) / Math.abs(deltaX);
            ratioY = (ratioY > 1) ? 1 : ratioY;
            if (deltaY < 0) ratioY *= -1;

        } else if (deltaX === 0) {
            ratioX = 0;
            ratioY = (deltaY > 0) ? 1 : -1;

        } else if (deltaY === 0) {
            ratioX = (deltaX > 0) ? 1 : -1;
            ratioY = 0;
        }

            console.log("drawing");
            console.log(e);
            currentlyDrawing.push(currentPos);

        if (activePen.stroke === "pen") {

            ctx.beginPath();
            ctx.moveTo(oldPos[0], oldPos[1]);
            ctx.lineTo(currentPos[0], currentPos[1]);
            ctx.strokeStyle = `rgba(${activePen.red},${activePen.green},${activePen.blue},0.1)`;
            ctx.lineWidth = activePen.size + 2;
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.moveTo(oldPos[0], oldPos[1]);
            ctx.lineTo(currentPos[0], currentPos[1]);
            ctx.strokeStyle = `rgba(${activePen.red},${activePen.green},${activePen.blue},1)`;
            ctx.lineWidth = activePen.size;
            ctx.stroke();
            ctx.closePath();
        }
        else if (activePen.stroke === "block") {
            ctx.fillStyle = `rgba(${activePen.red},${activePen.green},${activePen.blue},1)`;

            if (startPos != endPos) console.log(`difference found! start: ${startPos} end: ${endPos}`);

            while (startPos[0] !== endPos[0] && startPos[1] !== endPos[1]) {
                startPos[0] += ratioX;
                startPos[1] += ratioY;
                ctx.fillRect(startPos[0] - (activePen.size / 2), startPos[1] - (activePen.size / 2), activePen.size, activePen.size);
            }

            ctx.fillRect(currentPos[0] - (activePen.size / 2), currentPos[1] - (activePen.size / 2), activePen.size, activePen.size);
        }
        else if (activePen.stroke === "circle") {
            ctx.fillStyle = `rgba(${activePen.red},${activePen.green},${activePen.blue},1)`;

            if (startPos != endPos) console.log(`difference found! start: ${startPos} end: ${endPos} // ratios: ${ratioX} / ${ratioY}`);

            while (((ratioX >= 0) ? startPos[0] < endPos[0] : startPos[0] > endPos[0])
                || ((ratioY >= 0) ? startPos[1] < endPos[1] : startPos[1] > endPos[1])) {

                startPos[0] += ratioX;
                startPos[1] += ratioY;

                console.log(`move to ${startPos} / ${endPos}`);

                ctx.beginPath();
                ctx.arc(startPos[0], startPos[1], activePen.size / 2, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.closePath();
            }

            ctx.beginPath();
            ctx.arc(currentPos[0], currentPos[1], activePen.size / 2, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
        }
       
    }

    function closeObjectDrawing(e) {
        e.drawObject = currentlyDrawing;
        addToObjectDrawing(e);
        console.log("stopped drawing");

        var tmpStore = [];
        var resultObject = [];


        drawnObjects.push(resultObject);
        currentlyDrawing = null;

        e.preventDefault();
    }


function transformUp() {
    ctx.transform(1,1,1,1,0, -1);
}

function transformDown() {
    ctx.transform(1,1,1,1,0, 1);
}

function transformLeft() {
    ctx.transform(1,1,1,1,-1, 0);
}
function transformRight() {
    ctx.transform(1,1,1,1,1, 0);
}

    function getPosition(e) {
        var pos = [];
        pos[0] = e.pageX - canvas.offsetLeft;
        pos[1] = e.pageY - canvas.offsetTop;
        return pos;
    }