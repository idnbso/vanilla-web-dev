(function(StopwatchApp) {
    var timeValuesElements = {
        minutes: document.getElementById('current-time-minutes'),
        seconds: document.getElementById('current-time-seconds'),
        centiseconds: document.getElementById('current-time-centiseconds')
    };

    var lapValuesElements = {
        minutes: document.getElementById('lap-time-minutes'),
        seconds: document.getElementById('lap-time-seconds'),
        centiseconds: document.getElementById('lap-time-centiseconds')
    };

    var buttonsElements = {
        start: document.getElementById('start-button'),
        stop: document.getElementById('stop-button'),
        resume: document.getElementById('resume-button'),
        lap: document.getElementById('lap-button'),
        reset: document.getElementById('reset-button')
    };

    var lapsDetailsElement = document.getElementById('laps-details');

    var stopwatchApp = new StopwatchApp(buttonsElements, timeValuesElements, lapValuesElements,
        lapsDetailsElement);
    stopwatchApp.loadApp();
})(App);