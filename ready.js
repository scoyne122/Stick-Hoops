$(document).ready(function() {
	$(".start").click(function() {
		$(this).parent().hide();
		playing = true;
		song.play();
		if ($("#max").val() != "Unlimited") {
			unlimited = false;
			max = parseInt($("#max").val())
		}
		else {
			unlimited = true;
		}
	})
	$("#start1").click(function() {
		//AI thing
		opp = new computerPlayer();
	})
	$("#instructions").click(function() {
		var instruct = "Player 1: Arrow Keys\nPlayer 2: WASD keys\n";
		instruct += "Use left and right to move, up to jump\n";
		instruct += "Down key is shoot and steal/block\n";
		instruct += "Dunks are worth double points!";
		alert(instruct)
	})
	$("#pause").click(function() {
		pause = true;
		$("#pauseMenu").show();
	})
	$("#resume").click(function() {
		pause = false;
		$("#pauseMenu").hide();
	})
	$(".home").click(function() {
		playing = false;
		reset();
		$("#menu").show();
		$("#won").hide();
		$(".label").remove();
	})
	$("#restart").click(function() {
		reset();
	})
	$("#sound").click(function() {
		if ($(this).attr("on") == "true") {
			soundOff();
		}
		else {
			soundOn();
		}
	})
	$("#mainSound").click(function() {
		if ($(this).attr("on") == "true") {
			soundOff();
		}
		else {
			soundOn();
		}
	})
	maxOptions();
})





//changes the sound stuff
function soundOff() {
	$("#sound").html("Sound: Off");
	$("#sound").attr("on", "false");
	$("#mainSound").html("Sound: Off");
	$("#mainSound").attr("on", "false");
	horn.volume = 0;
	song.volume = 0;
	cheer.volume = 0;
	ohh.volume = 0;
}

function soundOn() {
	$("#sound").html("Sound: On");
	$("#sound").attr("on", "true");
	$("#mainSound").html("Sound: On");
	$("#mainSound").attr("on", "true");
	horn.volume = 1;
	song.volume = 0.3;
	ohh.volume = 0.5;
	cheer.volume = 0.5;
}


//reset function
function reset() {
	me = new Player(1);
	opp = new Player(2);
	ball = new Ball();
	$("#pauseMenu").hide();
	pause = false;
}

//show the dunk logo
function showDunk() {
	$("#dunk").show();
	var opacity = 1;
	setTimeout(function() {
		var interval = setInterval(function() {
			opacity -= 0.06;
			$("#dunk").css("opacity", opacity);
			if (opacity <= 0.06) {
				clearInterval(interval);
				$("#dunk").css("display", "none");
				$("#dunk").css("opacity", "1");
			}
		}, 30)
	}, 500)
}


//fills score thing with options
function maxOptions() {
	for (var i=1; i<101; i++) {
		$("#max").append("<option>"+i+"</option>")
	}
}


//ends the game and brings up menu
function endGame(winner) {
	$("#endHome").before("<p class='label'>Player " + winner + " Wins!</p>");
	$("#won").show();
}