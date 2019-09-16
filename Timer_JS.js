let hours = document.getElementById("Hours"), 
    minutes = document.getElementById("Minutes"), 
    seconds = document.getElementById("Seconds");

let startBtn = document.getElementById("start"),
    pauseBtn = document.getElementById("pause"),
    resetBtn = document.getElementById("reset");

let lblTime = document.getElementsByClassName("time");

let time = "0", 
    timer,
    ms = 1000;

let audio = new Audio("TimesUp.mp3");

document.addEventListener("keydown", function (e) {
	if (parseInt(time.length) !== 6 || e.key == "Backspace") {
		var numOnly = /\d+|Backspace/;
		
		if (!numOnly.test(e.key) || (time.length == 0 && e.key == "0")) {
			return;
		}

		if (e.key == "Backspace") {
			deleteNum();
		} else {
			insertNum(e.key);
		}
	} else {
		e.preventDefault();
	}
});

function insertNum(key) {
	if (parseInt(time + key) !== 0) {
		if (time.length !== 6) {
			if (time == "0") {
				time = key;
			} else {
				time += key;
			}

		}
		
		switch (time.length) {
			case 1:
				seconds.innerHTML = "0" + key;
				startBtn.removeAttribute("disabled");
				resetBtn.removeAttribute("disabled");
				break;
			case 2:
				seconds.innerHTML = parseInt(seconds.innerHTML).toString() + key;
				break;
			case 3:
				seconds.innerHTML = time.substr(1, 2);
				minutes.innerHTML = "0" + time.substr(0, 1);
				break;
			case 4:
				seconds.innerHTML = time.substr(2, 2);
				minutes.innerHTML = time.substr(0, 2);
				break;
			case 5:
				hours.innerHTML = "0" + time.substr(0, 1);
				minutes.innerHTML = time.substr(1, 2);
				seconds.innerHTML = time.substr(3, 2);
				break;
			case 6:
				hours.innerHTML = time.substr(0, 2);
				minutes.innerHTML = time.substr(2, 2);
				seconds.innerHTML = time.substr(4, 2);
				break;
			default:
				// If none of the above matches, I want to "undo" the adding
				time -= key;
				break;
		}
	}
}

function deleteNum() {
	switch (time.length) {
		case 1:
			time = "0";
			seconds.innerHTML = "00";
			startBtn.setAttribute("disabled", "true");
			resetBtn.setAttribute("disabled", "true");
			break;
		case 2:
			time = time.substr(0, 1);
			seconds.innerHTML = "0" + time.substr(0, 1);
			break;
		case 3:
			time = time.substr(0, 2);
			minutes.innerHTML = "00";
			seconds.innerHTML = time.substr(0, 2);
			break;
		case 4:
			time = time.substr(0, 3);
			minutes.innerHTML = "0" + time.substr(0, 1);
			seconds.innerHTML = time.substr(1, 2);
			break;
		case 5:
			time = time.substr(0, 4);
			hours.innerHTML = "00"
			minutes.innerHTML = time.substr(0, 2);
			seconds.innerHTML = time.substr(2, 2);
			break;
		case 6:
			time = time.substr(0, 5);
			hours.innerHTML = "0" + time.substr(0, 1);
			minutes.innerHTML = time.substr(1, 2);
			seconds.innerHTML = time.substr(3, 2);
			break;
	}
}

function startTimer() {
	correctTimer();
	disableEnableKeyPad("disable");
	
	for (let i = 0; i < lblTime.length; i++) {
		lblTime[i].classList.remove("animate");
	}
	
	startBtn.setAttribute("disabled", "true");
	pauseBtn.removeAttribute("disabled");
	resetBtn.removeAttribute("disabled");
	
	timer = setInterval(timerFunc, 100);
}

function pauseTimer() {
	clearInterval(timer);
	
	for (let i = 0; i < lblTime.length; i++) {
		lblTime[i].classList.add("animate");
	}
	
	startBtn.removeAttribute("disabled");
	pauseBtn.setAttribute("disabled", "true");
}

function resetTimer() {
	clearInterval(timer);
	disableEnableKeyPad("enable");
	time = "0";
	
	for (let i = 0; i < lblTime.length; i++) {
		lblTime[i].classList.remove("animate");
	}
	
	seconds.innerHTML = "00";
	minutes.innerHTML = "00";
	hours.innerHTML = "00";
	
	resetBtn.setAttribute("disabled", "true");
	startBtn.setAttribute("disabled", "true");
	pauseBtn.setAttribute("disabled", "true");
}

function timerFunc() {
	var sec = seconds.innerHTML;
	var min = minutes.innerHTML;
	var hr = hours.innerHTML;
	
	if (sec == 0 && min == 00 && hr == 0) {
		audio.loop = true;
		audio.play();
		alert("Times Up!");
		audio.pause();
		audio.currentTime = 0;
		
		clearInterval(timer);
		time = "";
		startBtn.setAttribute("disabled", "true");
		pauseBtn.setAttribute("disabled", "true");
		resetBtn.setAttribute("disabled", "true");
	} else {
		ms -= 100;
		if (ms == 0) {
			ms = 1000;
			if (parseInt(sec) !== 0) {
				seconds.innerHTML = parseInt(sec) - 1;
				if (parseInt(sec) < 11) {
					seconds.innerHTML = "0" + seconds.innerHTML;
				}
			} else if (parseInt(min) !== 0) {
				minutes.innerHTML = parseInt(min) - 1;
				if (parseInt(min) == 0) {
					minutes.innerHTML = "00";
				} else if (parseInt(min) < 11) {
					minutes.innerHTML = "0" + minutes.innerHTML;
				}
				seconds.innerHTML = 59;
			} else if (parseInt(hr) !== 0) {
				hours.innerHTML = parseInt(hr) - 1;
				if (parseInt(hr) == 0) {
					hours.innerHTML = "00";
				} else if (parseInt(hr) < 11) {
					hours.innerHTML = "0" + hours.innerHTML;
				}
				minutes.innerHTML = 59;
				seconds.innerHTML = 59;
			}
		}
	}
}

function correctTimer() {
	if (seconds.innerHTML > 59) {
		var sec = parseInt(seconds.innerHTML) - 60;
		
		if (sec < 10) {
			seconds.innerHTML = "0" + sec;
		} else {
			seconds.innerHTML = sec;
		}
		
		if (minutes.innerHTML < 10) {
			minutes.innerHTML = "0" + (parseInt(minutes.innerHTML) + 1);
		} else {
			minutes.innerHTML = parseInt(minutes.innerHTML) + 1;
		}
	}
	if (minutes.innerHTML > 59) {
		var min = parseInt(minutes.innerHTML) - 60;
		
		if (min < 10) {
			minutes.innerHTML = "0" + min;
		} else {
			minutes.innerHTML = min;
		}
		
		if (hours.innerHTML < 10) {
			hours.innerHTML = "0" + (parseInt(hours.innerHTML) + 1);
		} else {
			hours.innerHTML = parseInt(hours.innerHTML) + 1;
		}
	}
}

function disableEnableKeyPad(msg) {
	var keyPadBtns = document.getElementById("keyPad").querySelectorAll("button");
	var i;
	
	if (msg == "disable") {
		for (i = 0; i < keyPadBtns.length; i++) {
			keyPadBtns[i].setAttribute("disabled", "true");
		}
	} else if (msg == "enable") {
		for (i = 0; i < keyPadBtns.length; i++) {
			keyPadBtns[i].removeAttribute("disabled");
		}
	}
}
