# Perugluglu SCORMer

## Perugluglu Interactive
São Paulo, Brasil

### Author
André Monello
andre.monello [at] gmail.com
#### Disclaimer
I am by no means endorsed by Rustici Software, Pipwerks or any other company related to SCORM, and also no expert, even on HTML, JS or SCORM. Please feel free to use this as a base and expand it according to your own needs!

## About
This can be used to implement SCORM 1.2 functionality to HTML5 games, including HTML, JS and all other project files. Project can be zipped, imported and tested on https://cloud.scorm.com

Basically you have an `index.html` that points to three files:
 - `scorm.js`
	 - Keeps all SCORM-related variables and functions
	 - Used to initialize and update lesson data, status
 -  `script.js`
	 - Keeps all game-related stuff
	 - All your game logic *can* be written on this file, just don't forget to call each other (this is done by default!) when loading your content 
 -   `SCORM_API_wrapper.js` (this last one found [here](https://github.com/pipwerks/scorm-api-wrapper))
	 - Pipwerks' SCORM JS wrapper I followed and based this project on

After that, you have an `imsmanifest.xml` file that points to necessary stuff that a SCORM-ready LMS used to recognize your project as a SCORM lesson.  `imsmanifest.xml` **NEEDS** to be in the root folder. I used the same rule we use here and just left `index.html` right beside it in the root folder, though I know you can move it to a subfolder and point to it on the XML.
 
I have followed some basic structures we generally use in our projects, like using a `data.js` file to store data used throughout our games, and separating `scorm.js` and `script.js`. You don't *have* to follow these rules and come up with your own structure. I also left files on some 'basic' folders, you can also move them around, just don't forget to update file locations on the HTML file.

> **Again:** I am really a newbie starting out on web/game development and came up with this idea when we needed to implement SCORM for our  clients here at Perugluglu.
