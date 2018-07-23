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

var counter; // Used to track user clicks

function init() {
    // Sets counter equal to total clicks on data.js
    counter = data.totalClicks;
    
    // Sets counter text
    $('.counter p').html('Total: ' + counter)

    // Controls click on the button
    $(document).on('click','.button', function(){
        counter++;

        data.totalClicks = counter;

        $('.counter p').html('Total: ' + counter);

        if (data.totalClicks >= 50) scormFunctions.setComplete();
    });
}