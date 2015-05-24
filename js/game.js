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

    if(state === 2) {
        substate += 1;



        if(substate >= 1)
        {
            x+=20;
        }
    }

    if(state === 2) {
        substate += 1;



        if(substate >= 1)
        {
           // x+=20;
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

    for(var i = 1;i<5;i++)
    {
        var tempFire = new fire((i*80)+170)
        fires.push(tempFire);
    }


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

var fires = [];
var fire = function (x)
{
    this.y = 0;
    this.x= x;
    this.color = "#000000";
    this.width = 40;
    this.height = 50;
    this.vely = Math.random() * 2 + 1;
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
            x= 0;
            y=300;
        }

        interval++;

        if(interval % 40 === 0)
        {
            var tempLog = new log(Math.random() * 300 + 50);
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

    if(state ===2) {
        if(x >= 700) {
            state = 3;
            substate = 0;
        }

        var playerRect = {};
        playerRect.x = x;
        playerRect.y = y;
        playerRect.width = 75;
        playerRect.height = 75;

        for(var i =0;i<fires.length;i++) {
            if(fires[i].y<0) {
                fires[i].vely *= -1;

            }

            if(fires[i].y+100 >=500) {
                fires[i].vely *= -1;
            }

            var fireRect = {};
            fireRect.x = fires[i].x;
            fireRect.y = fires[i].y;
            fireRect.width = fires[i].width;
            fireRect.height = fires[i].height;

            if (playerRect.x < fireRect.x + fireRect.width  && playerRect.x + playerRect.width  > fireRect.x &&
                playerRect.y < fireRect.y + fireRect.height && playerRect.y + playerRect.height > fireRect.y) {
                //console.log("HIT");
                x= 10;
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

    if(state === 2)
    {
        if(substate === 0)
        {
            ctx.fillStyle = "#000000";
            ctx.fillText("I would brave hell",100,50);
        }
        if(substate >= 1)
        {
            var grd = ctx.createLinearGradient(0,0,900,0);
            grd.addColorStop(0,"red");
            grd.addColorStop(1,"white");

            ctx.fillStyle = grd;
            ctx.fillRect(0,0,900,500);

            ctx.fillStyle = "#FF0000";
            ctx.fillRect(700,300,75,75);

            ctx.fillStyle = "#0000FF";
            ctx.fillRect(x,y,75,75);

            for(var i = 0;i<fires.length;i++) {
                ctx.fillStyle = fires[i].color;

                fires[i].y += fires[i].vely;
                ctx.fillRect(fires[i].x,fires[i].y,fires[i].width,fires[i].height)
            }
        }

    }

    if(state === 3)
    {
        if(substate === 0)
        {
            ctx.fillStyle = "#000000";
            ctx.fillText("and high water",100,50);
        }

        ctx.fillStyle = "#000000";
        ctx.fillText("I love you more than anything!",100,50);
    }



}

function game()
{
    update();
    draw();
}

window.onload = init;
setInterval(game,1000.0/30.0)