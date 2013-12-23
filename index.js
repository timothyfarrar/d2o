$(function(){
    var pgButton = {};

    pgButton.editor = $('#launchEditor');
    pgButton.projects = $('#launchProjects');
    pgButton.tickets = $('#launchTickets');

    pgButton.editor.on("click",
        function(){
            chrome.app.window.create('/subapps/editor/index.html', {
                frame: 'chrome', id: "editwin", bounds: { width: 720, height: 400}
            })
        }
    );

    pgButton.projects.on("click",
        function(){
            chrome.app.window.create('/subapps/project/index.html', {
                frame: 'chrome', id: "projectwin", bounds: { width: 720, height: 400}
            })
        }
    );

    pgButton.tickets.on("click",
        function(){
            chrome.app.window.create('/subapps/ticket/index.html', {
                frame: 'chrome', id: "ticketwin", bounds: { width: 720, height: 400}
            })
        }
    );

});