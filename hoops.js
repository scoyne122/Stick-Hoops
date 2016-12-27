//define FPS
var FPS = 30;
//get the canvas
var canvas = document.getElementById("canvas");
//give the canvas a width and a height
canvas.width = 800;
canvas.height = 400;
//get a 2d context of the canvas
var context = canvas.getContext("2d");

var playing = false;
var pause = false;


var hoop1 = new Hoop(1);
var hoop2 = new Hoop(2);
var me = new Player(1);
var opp = new Player(2);
var touching = false;
var ball = new Ball();
var back = new Image();
back.src = "back.jpg";
var unlimited;
var max;
var horn = new Audio("sounds/airhorn.wav");
var cheer = new Audio("sounds/cheer.wav");
var ohh = new Audio("sounds/ohh.wav");
var song = new Audio("sounds/song.wav");
song.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
song.volume = 0.3;
ohh.volume = 0.5;
cheer.volume = 0.5;




//distance formula
function dist(a1, b1 ,a2, b2) {
	return Math.sqrt(Math.pow(a1 - b1, 2) + Math.pow(a2 - b2, 2));
}
//distance for objects with x and y
function distObj(obj1, obj2) {
	var xdis = Math.pow(obj1.getX() - obj2.getX(), 2);
	var ydis = Math.pow(obj1.getY() - obj2.getY(), 2);
	return Math.sqrt(xdis + ydis);
}


//draw object method
Object.prototype.draw = function() {
	var centerX = this.getX()-0.5*this.getWidth();
	var centerY = this.getY()-0.5*this.getHeight();
	context.drawImage(this.pic, centerX, centerY, this.getWidth(), this.getHeight());
}



window.onkeydown = function(e) {
    e = e || window.event;
    var code = e.keyCode || e.which;
	code = parseInt(code);
	me.keyDown(code);
	opp.keyDown(code);
	e.preventDefault();
}
window.onkeypress = function(e) {
	e.preventDefault();
}
window.onkeyup = function(e) {
    e = e || window.event;
    var code = e.keyCode || e.which;
	code = parseInt(code);
	me.keyUp(code);
	opp.keyUp(code);
}


//check for collision of players
function playerTouch() {
	var areTouch = dist(me.getX(), opp.getX(), me.getY(), opp.getY()) < 74;
	if (areTouch && !touching) {
		touching = true;
		if (me.getX() < opp.getX()) {
			me.cantGo("right");
			opp.cantGo("left");
		}
		else if (me.getX() > opp.getX()) {
			me.cantGo("left");
			opp.cantGo("right");
		}
	}
	else if (!areTouch && touching) {
		me.free();
		opp.free();
		touching = false;
	}
}

//if nobody has ball, detect people grabbing it
function grabBall() {
	var playersThere = (distObj(me, ball) < 50 || distObj(opp, ball)<50);
	if (!ball.getPossessed() && !ball.isShooting() && playersThere) {
		if (distObj(me, ball) < distObj(opp, ball) && ball.getBallTo() != me) {
			ball.posess(me);
			me.setHasBall(true);
		}
		else if (distObj(me, ball) >= distObj(opp, ball) && ball.getBallTo() != opp) {
			ball.posess(opp);
			opp.setHasBall(true);
		}
	}
	else if (distObj(me, ball) < 70 && !me.getHasBall() && ball.getPossessed) {
		me.inStealRange = true;
	}
}

//checks if players are in range for stealing
function getStealPlayer() {
	if (ball.getOwner() != me && ball.getPossessed()) {
		if (distObj(me, ball) < 70 && !me.getCanSteal()) {
			me.setCanSteal(true);
		}
		else if (distObj(me, ball) > 70 && me.getCanSteal()) {
			me.setCanSteal(false);
		}
	}
	else if (ball.getPossessed()) {
		if (distObj(opp, ball) < 70 && !opp.getCanSteal()) {
			opp.setCanSteal(true);
		}
		else if (distObj(opp, ball) > 70 && opp.getCanSteal()) {
			opp.setCanSteal(false);
		}
	}
	//START BLOCK CODE
	if (ball.isShooting()) {
		if (Math.abs(distObj(opp, ball)) < 90 && !opp.getCanBlock() && ball.getOwner() != opp) {
			opp.setCanBlock(true);
		}
		else if (Math.abs(distObj(opp, ball)) > 90 && opp.getCanBlock()) {
			opp.setCanBlock(false);
		}
		if (Math.abs(distObj(me, ball)) < 90 && !me.getCanBlock() && ball.getOwner() != me) {
			me.setCanBlock(true);
		}
		else if (Math.abs(distObj(me, ball)) > 90 && me.getCanBlock()) {
			me.setCanBlock(false);
		}
	}
	else if(!ball.getPossessed()) {
		if (opp.getCanSteal()) {
			opp.setCanSteal(false);
		}
		if (me.getCanSteal()) {
			me.setCanSteal(false);
		}
		if (opp.getCanBlock()) {
			opp.setCanBlock(false);
		}
		if (me.getCanBlock) {
			me.setCanBlock(false);
		}
	}
}

//shows the score at the top
var showScore = function() {
	context.font = "20px Ariel";
	context.fillStyle = "black";
	context.fillText(opp.getScore()+" : "+me.getScore(),380,20);
}



function draw() {
	context.drawImage(back, 0, 0, 800, 400);
	showScore();
	me.draw();
	opp.draw();
	ball.draw();
	hoop1.draw();
	hoop2.draw();
}

function update() {
	me.act();
	opp.act();
	if (opp.act2 != null) {
		opp.act2();
	}
	ball.act();
	playerTouch();
	grabBall();
	getStealPlayer();
}

//stuff every frame
function tick() {
	if (playing) {
    	context.clearRect(0,0,canvas.width,canvas.height);
    	draw();
		if (!pause) {
			update();
		}
	}
}

//call tick FPS times per second
window.setInterval(tick, 1000/FPS);