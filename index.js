$(function(){
    var pgButton = {};

    pgButton.editor = $('#launchEditor');
    pgButton.projects = $('#launchProjects');
    pgButton.tickets = $('#launchTickets');

    pgButton.editor.on("click",
        function(){
            chrome.app.window.create('/subapps/editor/index.html', {
                id: "editor", frame: 'chrome', id: "editwin", bounds: { width: 720, height: 400}
            })
        }
    );

    pgButton.projects.on("click",
        function(launchData){
            chrome.app.window.create('/subapps/project/index.html', {
                id: "project", frame: 'chrome', id: "projectwin", bounds: { width: 720, height: 400}
            }, function(win) {
                win.contentWindow.launchData = launchData;
              })

        }
    );

    pgButton.tickets.on("click",
        function(){
            chrome.app.window.create('/subapps/ticket/index.html', {
                id: "ticket", frame: 'chrome', id: "ticketwin", bounds: { width: 720, height: 400}
            })
        }
    );

});