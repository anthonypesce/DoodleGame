var x = 400;
var y = 410;

var width = 700;
var height = 500;

var velx = 1;
var vely = 1;

var c;
var ctx;

var color = {};
color.white = "#FFFFFF";
color.red = "#FF0000";
color.random = "#FF0000";

var state = 0;
var substate = 0;

function touchHandler(event) {

    //var xTouch = event.touches[0].pageX;
    //var yTouch = event.touches[0].pageY;
    color.random = Math.floor(Math.random()*16777215).toString(16);
    if(state === 0) {
        substate+=1;
    }
    if(state === 1) {
        substate +=1;

        if(substate >= 1)
        {
            y-=20;
        }



    }

    if(state ===0 && substate >= 3)
    {
        state = 1;
        substate = 0;
    }



}


function init(){
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    ctx.font = "30px Arial";
    var touchzone = document.getElementById("myCanvas");
    // Add an event handler for the touchstart event
    touchzone.addEventListener("touchstart", touchHandler, false);
    //touchzone.addEventListener("click",touchHandler,false);

}

var interval = 0;

var logs = [];
var log = function (y)
{
    this.y = y;
    this.x= 0;
    this.color = "#996633";
    this.width = 100;
    this.height = 40;
};

function intersectRect(r1, r2) {
    return !(r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top);
}


function update() {

    if(state === 0) {

    }
    if(state === 1) {
        if (y <= 75)
        {
            state = 2;
            substate = 0;
        }

        interval++;

        if(interval % 40 === 0)
        {
            var tempLog = new log(Math.random() * 300 + 50);
            //tempLog.y = Math.random() * 300 + 100;
            //console.log("HERE");
            logs.push(tempLog)
        }

        var playerRect = {};
        playerRect.x = x;
        playerRect.y = y;
        playerRect.width = 75;
        playerRect.height = 75;


        for(var i = 0;i<logs.length;i++) {
            var logRect = {};
            logRect.x = logs[i].x;
            logRect.y = logs[i].y;
            logRect.width = logs[i].width;
            logRect.height = logs[i].height;

            if (playerRect.x < logRect.x + logRect.width  && playerRect.x + playerRect.width  > logRect.x &&
                playerRect.y < logRect.y + logRect.height && playerRect.y + playerRect.height > logRect.y) {
                //console.log("HIT");
                y= 410;
            }
        }

    }


}

function draw() {
    ctx.fillStyle = color.white;
    ctx.clearRect(0,0,900,500);

    if(state === 0) {
        if(substate >=0)
        {
            ctx.fillStyle = "#000000";
            ctx.fillText("This is me",50,50);

            ctx.fillStyle = "#0000FF";
            ctx.fillRect(50,200,75,75);

        }
        if(substate >= 1)
        {
            ctx.fillStyle = "#000000";
            ctx.fillText("and this is Rae",200,50);

            ctx.fillStyle = "#FF0000";
            ctx.fillRect(200,200,75,75);
        }
        if(substate >= 2)
        {
            ctx.fillStyle = "#000000";
            ctx.fillText("and I would do anything for her",450,50);

        }
    }

    if(state === 1)
    {
        if(substate === 0)
        {
            ctx.fillStyle = "#000000";
            ctx.fillText("I would cross the fiercest river",100,50);
        }
        if(substate >= 1)
        {
            ctx.fillStyle = "#009900";
            ctx.fillRect(0,0,900,500);

            ctx.fillStyle = "#6699FF";
            ctx.fillRect(0,100,900,300);

            ctx.fillStyle = "#FF0000";
            ctx.fillRect(400,20,75,75);

            ctx.fillStyle = "#0000FF";
            ctx.fillRect(x,y,75,75);

            for(var i = 0; i<logs.length;i++)
            {
                ctx.fillStyle = logs[i].color;
                logs[i].x += 5;
                ctx.fillRect(logs[i].x,logs[i].y,logs[i].width,logs[i].height)
            }
        }
    }



}

function game()
{
    update();
    draw();
}

window.onload = init;
setInterval(game,1000.0/30.0)
