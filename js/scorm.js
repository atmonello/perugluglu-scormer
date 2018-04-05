/*
** Perugluglu SCORMer
** Author: Andre Monello @Perugluglu Interactive @Sao Paulo, Brasil
**
** This can be used to integrate SCORM 1.2 into your HTML5 games, 
** along with the HTML, JS and any other files.Project can be
** imported to SCORM Cloud platform.
**
** It uses Pipwerks SCORM Wrapper for JavaScript
** https://github.com/pipwerks/scorm-api-wrapper 
*/


var scorm = pipwerks.SCORM; // Used to access Pipwerks SCORM Wrapper
var lmsConnected = false; // Checks if coonected to the LMS
var lessonStatus; // Stores course status (from LMS)
var studentName; // Stores student name (from LMS)
var unloaded = false; // Used when checking if window is being closed
var scormEntry; // Stores if it's a user's first time accessing the course
var dataToString; // Receives data to be stringfied before sending to SCORM suspend_data
var setSuspendData; // Receives stringfied data and saves it into SCORM suspend_data
var getSuspendData; // Receives SCORM suspend_data. It has to be parsed BEFORE being used by the script!
var parseData; // Used to store parsed data received from SCORM suspend_data

// Initializes SCORM course
function scormInit () {
    initCourse();
}

// Initializes course main functions
function initCourse() {
    lmsConnected = scorm.init();
    lessonStatus = scorm.get('cmi.core.lesson_status');
    scormEntry = scorm.get('cmi.core.entry');

    if (lmsConnected) {
        getStudentName();
        if (lessonStatus === 'completed' || lessonStatus === 'passed') {
            alert('You have already finished this lesson. \nYou do not have to do it again.');
        }
        
        else {
            if (scormEntry !== 'ab-initio') {
                loadSuspendData();
            }
        }
    }

    else {
        alert('Could not connect to the LMS!');
    }
    counter = data.totalClicks;
    init();
}

// Sets course completion status to completed
function setComplete() {
    if (lmsConnected) {
        scorm.set('cmi.core.lesson_status', 'completed');
    }
}

// Saves data to SCORM suspend_data
function saveSuspendData() {
    // Data stored in data.js has to be JSON.stringify-ed and stored into dataToString 
    // and then setSuspendData stores it into SCORM suspend_data
    dataToString = JSON.stringify(data);
    setSuspendData = scorm.set('cmi.suspend_data', dataToString);
}

// Loads data from SCORM suspend_data
function loadSuspendData() {
    getSuspendData = scorm.get('cmi.suspend_data');
    if(getSuspendData !== '') {
        parseData = JSON.parse(getSuspendData);
        // Data parsed by parseData has to be stored back into data.js and
        // then it can be used by the script
        data = parseData;
    }
}

// Receives student_name from LMS, divides it into an array of strings and reverses it
// to be used throughout the project
function getStudentName() {
    studentName = scorm.get('cmi.core.student_name').split(',').reverse();
}

// It sets an welcome message using student's name received
// Mainly used in Perugluglu's own projects but left here for future reference
function setWelcomeMessage() {
    // If it's an user's first time accessing the course...
    if(scormEntry === 'ab-initio') {
    } 
    // ...and if it isn't
    else {
    }
}

// Saves current course status
function unloadHandler() {
    if(!unloaded) {
        saveSuspendData();
        scorm.save();
        scorm.quit();
        unloaded = true;
    }
}

// Calls save function when the user leaves the page
window.onbeforeunload = unloadHandler;
window.onunload = unloadHandler;