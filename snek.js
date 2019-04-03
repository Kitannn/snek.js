window.onload=function() {
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d"); //graphics context
    document.addEventListener("keydown", keyPush);
    setInterval(game,1000/15); 
}

px=py=10;    //player position
gs=tc=20;    //grid size and tile count
ax=ay=15;    //apple starting location
xvel=yvel=0; //x velocity and y velocity
trail=[];     //array for snake size
tail = 5;    //snake tail
score = 0;
highscore = 0;
lastdirection=123;

function game(){
    px+=xvel;
    py+=yvel;
    if(px<0) {       //wrap around logic
        px=tc-1;    
    }
    if(px>tc-1) {
        px=0;
    }
    if(py<0) {
        py=tc-1;
    }
    if(py>tc-1) {
        py=0;
    }
    //fil canvas color and size
    ctx.fillStyle="#303030";
    ctx.fillRect(0,0,canv.width,canv.height);
    
    //snake movement and game over condition
    ctx.fillStyle="#009900";
    for(var i=0;i<trail.length; i++) {
        ctx.fillRect(trail[i].x*gs, trail[i].y*gs,gs-2,gs-2);
        if(trail[i].x==px && trail[i].y==py) {
            tail=5;
            score=0;
        }
    }
    
    trail.push({x:px,y:py});
    while(trail.length>tail) {
        trail.shift();
        document.getElementById("score").innerHTML = score;
        document.getElementById("highscore").innerHTML = highscore;
    }
    
    if(ax==px && ay==py){
        tail++;
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tc);
        score+=5;
        if(score>highscore){
            highscore = score;
        }
    }
    
	ctx.fillStyle="#A00000";
	ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
}
function keyPush(evt){ //input
    switch(evt.keyCode) {
        case 37: //left arrow key
            if(lastdirection==39){ //so you can't reverse directions and lose by accident
                break;
            }
            xvel=-1;
            yvel=0;
            lastdirection=37;
            break;
        case 38: //up arrow
            if(lastdirection==40){
                break;
            }
            xvel=0;
            yvel=-1;
            lastdirection=38;
            break;
        case 39: //right arrow
            if(lastdirection==37){
                break;
            }
            xvel=1;
            yvel=0;
            lastdirection=39;
            break;
        case 40: //down arrow
            if(lastdirection==38){
                break;
            }
            xvel=0;
            yvel=1;
            lastdirection=40;
            break;
    }
}