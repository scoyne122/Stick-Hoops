//player contructor
function Player(playNum) {
	//VARIABLES
	this.pic = new Image();
	this.pic.src = "player"+playNum+".png";
	//this.inStealRange = false;
	var canSteal = false;
	var hasBall = false;
	var canLeft = true;
	var canRight = true;
	var atLeft = false;
	var atRight = true;
	var x = 650;
	var y = 330;
	var height = 160;
	var width = 140;
	var keys;
	var keysDown = [false, false, false, false];
	var inAir = false;
	var vUp = 0;
	var ballDist = 0;
	var hoop;
	var canBlock = false;
	var score = 0;
	//constructor method
	function construct() {
		if (playNum == 1) {
			keys = [37, 38, 39, 40];
			hoop = hoop1;
		}
		else {
			keys = [65, 87, 68, 83];
			x = 150;
			hoop = hoop2;
		}
	}
	construct();
	
	
	//these return stuff publicly
	this.getX = function() {return x}
	this.getY = function() {return y}
	this.getHeight = function() {return height}
	this.getWidth = function() {return width}
	this.isInAir = function() {return inAir}
	this.getHasBall = function() {return hasBall}
	this.getCanSteal = function() {return canSteal}
	this.getCanBlock = function() {return canBlock}
	this.getBallDist = function(val) {return ballDist}
	this.getScore = function() {return score}
	this.canRight = function() {return canRight}
	this.canLeft = function() {return canLeft}
	this.hasBall = function() {return hasBall}
	this.getVy = function() {return vUp}
	
	
	
	//move with the keys
	var moveOnKeys = function() {
		if (keysDown[0] && canLeft && !atLeft) {
			x -= 7;
		}
		else if (keysDown[2] && canRight && !atRight) {
			x += 7;
		}
		if (keysDown[1] && !inAir) {
			jump();
		}
		if (keysDown[3]) {
			keysDown[3] = false;
			downKey();
		}
	}
	
	//sets jump stuff
	var jump = function() {
		vUp = -15;
		inAir = true;
	}
	//public jump
	this.jump = function() {jump()}
	
	//do down key stuff: shoot or steal/block
	function downKey() {
		if (!hasBall) {
			steal();
		}
		else {
			shoot();
		}
	}
	
	//steal function on defense
	function steal() {
		if (canSteal) {
			ball.fly();
		}
		else if (canBlock) {
			ohh.play();
			ball.blocked();
		}
	}
	//public function
	this.steal = function() {steal()}
	
	//shoot function; done when you have ball
	function shoot() {
		var buffer = hoop.getX() / -22.6667 + 80;
		var hoopX = hoop.getX() + buffer;
		var distance = dist(hoopX, x, hoop.getY(), y);
		hasBall = false;
		canBlock = false;
		if (distance < 60) {
			ball.dunk(hoop);
		}
		else {
			ball.setShotStuff(hoop);
		}
	}
	//public shoot function
	this.shoot = function() {shoot()}
	
	
	//handles a key going down
	this.keyDown = function(code) {
		for (var i=0; i<keysDown.length; i++) {
			if (code == keys[i]) {
				if (i == 0 || i == 2) {
					ballDist = i*30 - 30;
					keysDown[i + (1 - i)*2] = false;
				}
				keysDown[i] = true;
			}
		}
	}
	
	//handles key released
	this.keyUp = function(code) {
		for (var i in keysDown) {
			if (code == keys[i]) {
				keysDown[i] = false;
			}
		}
	}
	
	
	//makes them be able to go any direction
	this.free = function() {
		canRight = true;
		canLeft = true;
	}
	
	//makes them unable to move a certain way
	this.cantGo = function(direction) {
		if (direction == "left") {
			canLeft = false;
		}
		else if (direction == "right") {
			canRight = false;
		}
	}
	
	//keeps players inbounds
	function keepInBounds() {
		if (x <= 0 + width/2.7) {
			atLeft = true;
			canLeft = false;
		}
		else if (x >= 800 - width/2.7) {
			atRight = true;
			canRight = false;
		}
		else if (atRight || atLeft) {
			atRight = false;
			atLeft = false;
			canRight = true;
			canLeft = true;
		}
	}
	
	//sets variables
	this.setHasBall = function(newState) {hasBall = newState}
	this.setCanSteal = function(newState) {canSteal = newState}
	this.setCanBlock = function(newState) {canBlock = newState}
	this.getBuckets = function() {score++; hasWon()}
	this.setX = function(value) {x = value};
	this.noKeys = function() {keys = []}
	
	
	//checks to see if user has won
	function hasWon() {
		if (score >= max && !unlimited) {
			pause = true;
			endGame(playNum);
		}
	}
	
	
	//gravity stuff
	function gravity() {
		if (inAir) {
			vUp += 0.5;
			y += vUp;
		}
		if (y >= 330) {
			vUp = 0;
			inAir = false;
		}
	}
	
	
	//main act method
	this.act = function() {
		//checkKeys();
		moveOnKeys();
		gravity();
		keepInBounds();
	}
	this.act2 = null;
}











//ball constructor
function Ball() {
	//VARIABLES
	this.pic = new Image();
	this.pic.src = "ball.png";
	var x = 400;
	var y = 100;
	var vy = 0;
	var vx = 0;
	var width = 50;
	var height = 50;
	var GRAVITY = 0.4;
	var owner = null;
	var inAir = false;
	var timeToHoop;
	var possessed = false;
	var ballTo = null;
	var shooting = false;
	
	
	//these return stuff publicly
	this.getX = function() {return x}
	this.getY = function() {return y}
	this.getVy = function() {return vy}
	this.getHeight = function() {return height}
	this.getWidth = function() {return width}
	this.getOwner = function() {return owner}
	this.getPossessed = function() {return possessed}
	this.getBallTo = function() {return ballTo}
	this.isShooting = function() {return shooting}
	this.getOwner = function() {return owner}
	
	
	
	//gravity
	function freeBounce() {
		vy += GRAVITY;
		vx -= 0.004;
		if (vy > 0.4 && y > 360) {
			vy *= -0.8;
		}
		else if (y > 360) {
			vy = 0;
		}
		if (x <= 0 + width || x >= 800 - width) {
			vx *= -1;
		}
		if (vx <= 0.1 && vx >= -0.1) {
			vx = 0;
		}
		y += vy;
		x += vx;
	}
	
	//do stuff once ball is possessed
	this.posess = function(newOwner) {
		if (!newOwner.isInAir()) {
			y = 330;
			vy = 4.2;
		}
		owner = newOwner;
		possessed = true;
	}
	
	//make ball go in air once it is "stolen"
	this.fly = function() {
		vx = Math.random()*20 - 10;
		y = owner.getY() - 50;
		vy = -13;
		owner.setHasBall(false);
		owner = null;
		shooting = false;
		possessed = false;
		ballTo = null;
	}
	
	//do stuff once player blocks a shot
	this.blocked = function() {
		vx *= -1;
		vy = 0;
		possessed = false;
		ballTo = null;
		shooting = false;
		owner = null;
	}
	
	//dribble bouncing
	function dribble() {
		if (owner.isInAir()) {
			y = owner.getY();
			x = owner.getX();
			if (!inAir) {
				inAir = true;
			}
		}
		else {
			if (inAir) {
				inAir = false;
				vy = 4.2;
				y = 330;
			}
			if (vy != 4.2 && vy != -4.2) {
				vy = 4.2;
			}
			x = owner.getX() + owner.getBallDist();
			y += vy;
			if (y > 360 || y < 330) {
				vy *= -1;
			}
		}
	}
	
	//ball travels to the hoop on a shot
	function goToHoop() {
		if (y < 110 && y > 110 - vy && vy > 0) {
			vx = 0;
			vy = 0;
			possessed = false;
			shooting = false;
			ballTo = owner;
			cheer.play();
			owner.getBuckets();
			owner = null;
		}
		else {
			y += vy;
			x += vx;
			vy += GRAVITY;
			timeToHoop++;
		}
		if (x <= 0 || x >= 800) {
			vx *= -1;
		}
	}
	
	//set variables at start of shot
	this.setShotStuff = function(whatHoop) {
		possessed = false;
		var distUp = whatHoop.getY() - y;
		var dist = distObj(this, whatHoop);
		var buffer = whatHoop.getX() / -22.6667 + 80;
		var distX = whatHoop.getX() + buffer - x;
		var time = (distUp - 190) / 11;
		timeToHoop = -time;
		timeToHoop = 0;
		vy = GRAVITY*time;
		vx = distX / getTime(y, vy, 0);
		shooting = true;
	}
	
	this.dunk = function(whatHoop) {
		possessed = false;
		shooting = true;
		y = whatHoop.getY() - 1;
		var buffer = whatHoop.getX() / -22.6667 + 80;
		x = whatHoop.getX() + buffer;
		vy = 2;
		vx = 0;
		goToHoop();
		horn.play();
		showDunk();
	}
	
	//gets the time for the ball to drop
	function getTime(currY, velocity, times) {
		var newY = currY + velocity;
		var newV = velocity + GRAVITY;
		if (newY < 110 && newY > 110 - velocity && velocity > 0) {
			return times+1;
		}
		else {
			return getTime(newY, newV, times + 1);
		}
	}
	
	
	
	//main act method for updating
	this.act = function() {
		if (!possessed && !shooting) {
			freeBounce();
		}
		else if (shooting && !possessed) {
			goToHoop();
		}
		else {
			dribble();
		}
	}
}






//hoop constructor
function Hoop(xPos) {
	this.pic = new Image();
	this.pic.src = "hoop"+xPos+".png";
	var x = (xPos - 1) * 680;
	var y = 110;
	var height = 350;
	var width = 450;
	
	
	//these return stuff publicly
	this.getX = function() {return x}
	this.getY = function() {return y}
	this.getHeight = function() {return height}
	this.getWidth = function() {return width}
}






//CPU player constructor
function computerPlayer() {
	this.inheritFrom = Player;
	this.inheritFrom(2);
	this.noKeys();
	
	//VARIABLES
	var canSteal = false;
	var hasBall = false;
	var canLeft = true;
	var canRight = true;
	var atLeft = false;
	var atRight = true;
	var x = 150;
	var y = 330;
	var height = 160;
	var width = 140;
	var keys;
	var keysDown = [false, false, false, false];
	var inAir = false;
	var vUp = 0;
	var ballDist = 0;
	var hoop;
	var canBlock = false;
	var score = 0;
	var defense = false;
	var freeBall = false;
	var ballDist = 0;
	var SPOT = 200;
	
	
	//returns all the stuff publicly
	this.getBallDist = function() {return ballDist}
	
	
	//move along x axis
	this.move = function(newX) {
		if ((this.canRight() && newX > 0) || (this.canLeft() && newX < 0)) {
			this.setX(x += newX);
			ballDist = x / Math.abs(x) * 30;
		}
	}
	
	//moves to the ball
	this.moveToBall = function() {
		var diff = ball.getX() - x;
		var diffY = ball.getY() - y;
		if (Math.abs(diff) > 7) {
			this.move(diff / Math.abs(diff) * 7);
		}
		if (diffY < -50 && !this.isInAir() && Math.abs(diff) < 50 && ball.getVy() < 10) {
			this.jump();
		}
	}
	
	//defense stuff all goes here
	this.defend = function() {
		var toSpot = SPOT - x;
		var speed = Math.abs(toSpot) / toSpot * 7;
		var toYam = dist(me.getX(), hoop1.getX() + 80, me.getY(), hoop1.getY());
		var toPlayer = distObj(this, me);
		if (toYam < 10 || toPlayer < 200) {
			//alert("hi");
			this.goToPlayer();
		}
		else if (Math.abs(toSpot) > 7) {
			this.setX(x += speed);
		}
		if (Math.random() < 1/10) {
			this.steal();
		}
	}
	
	//jumps if it should try to block
	this.shouldBlock = function() {
		var toBuck = dist(ball.getX(), hoop1.getX() + 80, ball.getY(), hoop1.getY());
		var toBall = distObj(ball, this);
		var toBallX = ball.getX() - x;
		if (x - (hoop1.getX() + 80) > 7 && toBall > 250) {
			this.setX(x -= 7);
		}
		if (toBuck < 300 && !this.isInAir() && toBall < 420) {
			this.jump();
		}
		else if (toBall < 250 && !this.isInAir()) {
			this.jump();
		}
		else if (toBall < 250 && Math.abs(toBallX) > 7) {
			this.setX(x += Math.abs(toBallX)/toBallX * 7);
		}
		this.steal();
	}
	
	//go to the oppossing player
	this.goToPlayer = function() {
		var distX = me.getX() - x;
		if (Math.abs(distX) > 7) {
			var speed = Math.abs(distX) / distX * 7;
			this.setX(x += speed);
		}
		if (me.isInAir() && !this.isInAir() && Math.random() < 0.1) {
			this.jump();
		}
	}
	
	//checks if the ball is free
	function checkFreeBall() {
		if (ball.getOwner() == null && !freeBall && ball.getBallTo() != this) {
			if (Math.random() < 1/20) {
				freeBall = true;
			}
		}
		else if (ball.getOwner() != null && freeBall) {
			freeBall = false;
		}
	}
	
	
	//offense function
	this.offense = function() {
		var toHoop = hoop2.getX() + 40 - x;
		var toDef = distObj(this, me);
		var toYam = dist(ball.getX(), hoop2.getX() + 40, ball.getY(), hoop2.getY());
		
		//dunking logic
		if (toYam < 50) {
			this.shoot();
		}
		if (Math.abs(toHoop) < 300 && !this.isInAir()) {
			this.jump();
		}
		
		//driving to hoop logic
		if (toDef > 120) {
			this.goToHoop();
		}
		else if (toDef < 113 && this.isInAir()) {
			this.goToHoop(false);
		}
		else if (!me.isInAir() && !this.isInAir()) {
			this.jump();
		}
		
		//pop a J logic
		if (this.getY() + 160 < me.getY()) {
			this.shoot();
		}
		else if (me.getX() - x < 80 && this.getY() + 100 < me.getY()) {
			this.shoot();
		}
		else if (this.getY() < me.getY() && me.getVy() > 0) {
			this.shoot();
		}
	}
	
	//go towards the hoop
	this.goToHoop = function(really) {
		var toHoop = hoop2.getX() + 40 - x;
		var speed = Math.abs(toHoop)/toHoop * 7;
		if (really === false) {
			speed *= -1;
		}
		if ((speed < 0 && this.canLeft()) || (speed > 0 && this.canRight())) {
			if (toHoop > 7) {
				this.setX(x += speed);
			}
		}
	}
	
	
	//act method
	this.act2 = function() {
		checkFreeBall();
		if (freeBall && ball.getBallTo() != this) {
			this.moveToBall();
		}
		else if (ball.getOwner() == this && this.hasBall()) {
			this.offense();
		}
		else if (ball.getOwner() == me && me.hasBall()) {
			this.defend();
		}
		else if (ball.isShooting() && ball.getOwner() != this) {
			this.shouldBlock();
		}
	}
}