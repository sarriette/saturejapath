// jshint maxerr:1000

/* 	-------------------------------------------------------------------------------------------------------------- 
	
	◤   ◥	SCRIBBLEMAKES - HOVER CLOCK 1.0
	 SM/C	-------------------------------
	◣   ◢	Last updated: 9th July 2024
	
	More widgets, plugins, and themes at: https://scribblemakes.com/code
	
	--------------------------------------------------------------------------------------------------------------

	Welcome to the Hover Clock Widget (HCW)! This widget creates a moveable window on your website that has a
	clock displayed on it, similar to a clock window on your PC. To integrate into your website, save this .js
	file to your website's directory and follow the instructions listed below:
	
 	1)	Save the .js file to your website directory
	2)	Open the .html file that will use this widget and add the following code in the <body> section:
		<script src="URLPATHWAY/scWidget_HoverClock.js"></script>
	3) Save the .css file to your website directory
	4) In your .html file, add the following code in the <head> section:
		<link href="URLPATHWAY/scWidget_HoverClock_style.css" rel="stylesheet" type="text/css" media="all">
	5) Replace 'URLPATHWAY' in both code lines with your website URL or the local pathway to it.
	
	You can read more about the widget at: https://scribblemakes.com/code#scWidget_HoverClock
	
 	-------------------------------------------------------------------------------------------------------------- */

// --------------------------------------------------------------------------------------------------------------
// -------------------------- EDIT THE VARIABLES BELOW TO CHANGE THE WIDGET'S SETTINGS --------------------------
// --------------------------------------------------------------------------------------------------------------

const sc_hcw_containerID = "sc_hcw_clockContainer"; // Replace an element with this ID / make an element with this ID
const sc_hcw_clockID = "sc_hcw_clock"; // ID for the clock object
const sc_hcw_grabClass = "sc_hcw_clockContainerGrabbed"; // What class is given to element when it's moved
const sc_hcw_moveable = true; // Can the user move the clock on your website

const sc_hcw_sizeWidth = "100px"; // Default width of clock if not given in the css form
const sc_hcw_sizeHeight = "100px"; // Default height of clock if not given in the css form

const sc_hcw_posTop = "6.5em"; // How far the clock starts from the top of the screen
const sc_hcw_posLeft = "20em"; // How far the clock starts from the left of the screen

// 	NOTE: Some other scripts from https://scribblemakes.com/code use the default settings, such as ignoring Images
//	with the 'sc_icep_ignoreClass' class. If changing these defaults while also adding additional scripts, check 
//	if the other scripts use a similar variable.

// --------------------------------------------------------------------------------------------------------------
// ------------------------- DON'T EDIT PAST THIS POINT UNLESS PROFICIENT IN JAVASCRIPT -------------------------
// --------------------------------------------------------------------------------------------------------------

// Check if a widget with a matching ID exists
let sc_hcw_clockElement;
if (document.getElementById(sc_hcw_containerID)) {
	sc_hcw_clockElement = document.getElementById(sc_hcw_containerID);
} else {
	sc_hcw_clockElement = document.createElement("div");
	document.body.appendChild(sc_hcw_clockElement);
	sc_hcw_clockElement.id = sc_hcw_containerID;
	console.log(sc_hcw_clockElement);
}

if (sc_hcw_clockElement.style.height == "") {
	sc_hcw_clockElement.style.height = sc_hcw_sizeHeight;
	sc_hcw_clockElement.style.width = sc_hcw_sizeWidth;
}
if (sc_hcw_clockElement.style.top == "") {
	sc_hcw_clockElement.style.top = sc_hcw_posTop;
	sc_hcw_clockElement.style.left = sc_hcw_posLeft;
}


// ---------------------------------------------------------------------
// ----------------------------- ADD CLOCKS ---------------------------- 
// ---------------------------------------------------------------------
// Clock Object
let sc_hcw_clockObject = document.createElement("div");
sc_hcw_clockObject.id = sc_hcw_clockID;
sc_hcw_clockElement.appendChild(sc_hcw_clockObject);

// Clock Numbers
sc_hcw_clockObject.innerHTML = `
	<span id="sc_hcw_clockFaceNumber_one" class="sc_hcw_clockFaceNumber"></span>
	<span id="sc_hcw_clockFaceNumber_two" class="sc_hcw_clockFaceNumber"></span>
	<span id="sc_hcw_clockFaceNumber_three" class="sc_hcw_clockFaceNumber"></span>
	<span id="sc_hcw_clockFaceNumber_four" class="sc_hcw_clockFaceNumber"></span>
	<span id="sc_hcw_clockFaceNumber_five" class="sc_hcw_clockFaceNumber"></span>
	<span id="sc_hcw_clockFaceNumber_six" class="sc_hcw_clockFaceNumber"></span>
	<span id="sc_hcw_clockFaceNumber_seven" class="sc_hcw_clockFaceNumber"></span>
	<span id="sc_hcw_clockFaceNumber_eight" class="sc_hcw_clockFaceNumber"></span>
	<span id="sc_hcw_clockFaceNumber_nine" class="sc_hcw_clockFaceNumber"></span>
	<span id="sc_hcw_clockFaceNumber_ten" class="sc_hcw_clockFaceNumber"></span>
	<span id="sc_hcw_clockFaceNumber_eleven" class="sc_hcw_clockFaceNumber"></span>
	<span id="sc_hcw_clockFaceNumber_twelve" class="sc_hcw_clockFaceNumber"></span>
`;

// Clock Hands
let sc_hcw_clockHandHour = document.createElement("div");
let sc_hcw_clockHandMinute = document.createElement("div");
let sc_hcw_clockHandSecond = document.createElement("div");
sc_hcw_clockHandHour.id = sc_hcw_clockID + "HandHour";
sc_hcw_clockHandMinute.id = sc_hcw_clockID + "HandMinute";
sc_hcw_clockHandSecond.id = sc_hcw_clockID + "HandSecond";
sc_hcw_clockHandHour.classList.add("sc_hcw_clockHand");
sc_hcw_clockHandMinute.classList.add("sc_hcw_clockHand");
sc_hcw_clockHandSecond.classList.add("sc_hcw_clockHand");
sc_hcw_clockObject.appendChild(sc_hcw_clockHandHour);
sc_hcw_clockObject.appendChild(sc_hcw_clockHandMinute);
sc_hcw_clockObject.appendChild(sc_hcw_clockHandSecond);

// Set up clock ticking function
sc_hcw_ClockTick(); // Initial time
let sc_hcw_clockInterval = setInterval(sc_hcw_ClockTick, 1000);

// Clock tick function
function sc_hcw_ClockTick() {
	const now = new Date();
	let hour = now.getHours();
	let minute = now.getMinutes();
	let second = now.getSeconds();
	sc_hcw_ClockDraw(hour, minute, second);
	console.log("tick");
}

function sc_hcw_ClockDraw(hour, minute, second) {
	sc_hcw_clockHandHour.style.transform = "rotate(" + (hour * 30) + "deg)";
	sc_hcw_clockHandMinute.style.transform = "rotate(" + (minute * 6) + "deg)";
	sc_hcw_clockHandSecond.style.transform = "rotate(" + (second * 6) + "deg)";
}


// --------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------
// ------------------------ DRAGGABLE ELEMENT JS ------------------------ 
// ----------------------------------------------------------------------
// Edited from: https://www.w3schools.com/howto/howto_js_draggable.asp

// Positional data
let sc_hcw_1 = 0, sc_hcw_2 = 0, sc_hcw_3 = 0, sc_hcw_4 = 0;

// When clock element is grabbed
if (sc_hcw_moveable) {
	sc_hcw_clockElement.onmousedown = sc_hcw_dragClockDown;
}

// ----------------------------------------------------------------------
// ---------------------- WHEN CLOCK IS CLICKED ON ----------------------
// ----------------------------------------------------------------------
function sc_hcw_dragClockDown(e) {
	sc_hcw_clockElement.classList.add(sc_hcw_grabClass);
	sc_hcw_clockElement.style.position = "fixed";
	e = e || window.event;
	e.preventDefault();
	
	// Get mouse cursor position at startup
	sc_hcw_3 = e.clientX;
	sc_hcw_4 = e.clientY;
	
	// When click is released
	document.onmouseup = sc_hcw_dragClockUp;
	
	// When cursor is moved
	document.onmousemove = sc_hcw_dragClockMove;
}

// ---------------------------------------------------------------------
// -------------------- WHEN CLOCK GRAB IS RELEASED --------------------
// ---------------------------------------------------------------------
function sc_hcw_dragClockUp() {
	// Stop moving
	sc_hcw_clockElement.classList.remove(sc_hcw_grabClass);
	document.onmouseup = null;
	document.onmousemove = null;	
}

// ---------------------------------------------------------------------
// ----------------------- WHEN CLOCK IS DRAGGED -----------------------
// ---------------------------------------------------------------------
function sc_hcw_dragClockMove(e) {
	e = e || window.event;
	e.preventDefault();
	
	// calculate new cursor position
	sc_hcw_1 = sc_hcw_3 - e.clientX;
	sc_hcw_2 = sc_hcw_4 - e.clientY;
	sc_hcw_3 = e.clientX;
	sc_hcw_4 = e.clientY;
	
	// Set clock's new position
	sc_hcw_clockElement.style.top = (sc_hcw_clockElement.offsetTop - sc_hcw_2) + "px";
	sc_hcw_clockElement.style.left = (sc_hcw_clockElement.offsetLeft - sc_hcw_1) + "px";
	
	// Reset it into bounds if it's offscreen
	if ((sc_hcw_clockElement.offsetTop - sc_hcw_2) < 0) {
		sc_hcw_clockElement.style.top = 0;
	} 
		else if ((sc_hcw_clockElement.offsetTop - sc_hcw_2) > (window.innerHeight - sc_hcw_clockElement.style.height.split("px")[0])) {
			sc_hcw_clockElement.style.top = (window.innerHeight - sc_hcw_clockElement.style.height.split("px")[0]) + "px";
		}
	if ((sc_hcw_clockElement.offsetLeft - sc_hcw_1) < 0) {
		sc_hcw_clockElement.style.left = 0;
	} 
		else if ((sc_hcw_clockElement.offsetLeft - sc_hcw_1) > (window.innerWidth - sc_hcw_clockElement.style.width.split("px")[0])) {
			sc_hcw_clockElement.style.left = (window.innerWidth - sc_hcw_clockElement.style.width.split("px")[0]) + "px";
		}
}