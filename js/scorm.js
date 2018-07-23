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


var scormVars = {

    scorm: pipwerks.SCORM,  // Used to access Pipwerks SCORM Wrapper
    lmsConnected: false,  // Checks if coonected to the LMS
    lessonStatus: null,  // Stores course status (from LMS)
    studentName: '',  // Stores student name (from LMS)
    unloaded: false,  // Used when checking if window is being closed
    scormEntry: null,  // Stores if it's a user's first time accessing the course
    dataToString: null,  // Receives data to be stringfied before sending to SCORM suspend_data
    setSuspendData: null,  // Receives stringfied data and saves it into SCORM suspend_data
    getSuspendData: null,  // Receives SCORM suspend_data. It has to be parsed BEFORE being used by the script!
    parseData: null,  // Used to store parsed data received from SCORM suspend_data

}


var scormFunctions = {
    // Initializes SCORM course
    scormInit() {
        scormFunctions.initCourse();
    },
    
    // Initializes course main functions
    initCourse() {
        scormVars.lmsConnected = scormVars.scorm.init();
        scormVars.lessonStatus = scormVars.scorm.get('cmi.core.lesson_status');
        scormVars.scormEntry = scormVars.scorm.get('cmi.core.entry');
    
        if (scormVars.lmsConnected) {
            scormFunctions.getStudentName();

            if (scormVars.lessonStatus === 'completed' || scormVars.lessonStatus === 'passed') {
                alert('You have already finished this lesson. \nYou do not have to do it again.');
            }
            
            else {
                scormFunctions.setWelcomeMessage();

                if (scormVars.scormEntry !== 'ab-initio') {
                    scormFunctions.loadSuspendData();
                }
            }
        }
    
        else {
            alert('Could not connect to the LMS!');
        }

        init();
    },
    
    // Sets course completion status to completed
    setComplete() {
        if (scormVars.lmsConnected) {
           scormVars.scorm.set('cmi.core.lesson_status', 'completed');
        }
    },
    
    // Saves data to SCORM suspend_data
    saveSuspendData() {
        // Data stored in data.js has to be JSON.stringify-ed and stored into dataToString 
        // and then setSuspendData stores it into SCORM suspend_data
        scormVars.dataToString = JSON.stringify(data);
        scormVars.setSuspendData = scormVars.scorm.set('cmi.suspend_data', scormVars.dataToString);
    },
    
    // Loads data from SCORM suspend_data
    loadSuspendData() {
        scormVars.getSuspendData = scormVars.scorm.get('cmi.suspend_data');
        if(scormVars.getSuspendData !== '') {
            scormVars.parseData = JSON.parse(scormVars.getSuspendData);
            // Data parsed by parseData has to be stored back into data.js and
            // then it can be used by the script
            data = scormVars.parseData;
        }
    },
    
    // Receives student_name from LMS, divides it into an array of strings and reverses it
    // to be used throughout the project
    getStudentName() {
        scormVars.studentName = scormVars.scorm.get('cmi.core.student_name').split(',').reverse().join(' ');
    },
    
    // It sets an welcome message using student's name received
    // Mainly used in Perugluglu's own projects but left here for future reference
    setWelcomeMessage() {
        // If it's an user's first time accessing the course...
        if(scormVars.scormEntry === 'ab-initio') {
            alert('Welcome' + scormVars.studentName + '! Click to 50 to complete.\nIf you exit and come back, your progress will be saved.');
        } 
        // ...and if it isn't
        else {
            alert('Welcome back' + scormVars.studentName + '!');
        }
    },
    
    // Saves current course status
    unloadHandler() {
        if(!scormVars.unloaded) {
            scormFunctions.saveSuspendData();
            scormVars.scorm.save();
            scormVars.scorm.quit();
            scormVars.unloaded = true;
        }
    },

}

// Calls save function when the user leaves the page
window.onbeforeunload = scormFunctions.unloadHandler;
window.onunload = scormFunctions.unloadHandler;

$(document).ready(function(){
    scormFunctions.scormInit();
});
