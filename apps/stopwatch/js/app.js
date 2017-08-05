function App(buttonsElements, timeValuesElements, lapValuesElements, lapsDetailsElement) {
    this.timeValuesElements = timeValuesElements;
    this.lapValuesElements = lapValuesElements;
    this.buttons = buttonsElements;
    this.lapsDetailsElement = lapsDetailsElement;

    this.buttons.start.addEventListener('click', this.onClickStartButton.bind(this));
    this.buttons.stop.addEventListener('click', this.onClickStopButton.bind(this));
    this.buttons.resume.addEventListener('click', this.onClickResumeButton.bind(this));
    this.buttons.reset.addEventListener('click', this.onClickResetButton.bind(this));
    this.buttons.lap.addEventListener('click', this.onClickLapButton.bind(this));

    this.resetApp();
}

App.prototype.resetApp = function() {
    this.isModeOn = false;
    this.timeCounter = 0;
    this.lapCounter = 0;
    this.stopwatch = null;
    this.totalLaps = 0;

    this.timeMinutes = 0;
    this.timeSeconds = 0;
    this.timeCentiseconds = 0;

    this.lapMinutes = 0;
    this.lapSeconds = 0;
    this.lapCentiseconds = 0;

    this.lapsDetailsElement.innerText = ''
};

App.prototype.loadApp = function() {
    this.resetApp();

    this.hideAllButtons.call(this);

    // show start and lap buttons
    this.buttons.start.classList.toggle('visible');
    this.buttons.lap.classList.toggle('visible');

    this.updateCurrentTimeValues.call(this);
    this.updateTimeValuesElements.call(this);
};

App.prototype.startStopwatch = function() {
    this.stopwatch = setInterval(function() {
        this.timeCounter++;

        if (this.timeCounter === 100 * 60 * 100) { // check for limit of 100 minutes
            this.timeCounter = 0;
        }

        this.lapCounter++;
        this.updateCurrentTimeValues.call(this);
        this.updateTimeValuesElements.call(this);
    }.bind(this), 10);
};

App.prototype.updateTimeValuesElements = function() {
    this.timeValuesElements.minutes.innerText = this.formatTimeValue(this.timeMinutes);
    this.timeValuesElements.seconds.innerText = this.formatTimeValue(this.timeSeconds);
    this.timeValuesElements.centiseconds.innerText = this.formatTimeValue(this.timeCentiseconds);

    this.lapValuesElements.minutes.innerText = this.formatTimeValue(this.lapMinutes);
    this.lapValuesElements.seconds.innerText = this.formatTimeValue(this.lapSeconds);
    this.lapValuesElements.centiseconds.innerText = this.formatTimeValue(this.lapCentiseconds);
};

App.prototype.formatTimeValue = function(value) {
    return value < 10 ? '0' + value : value;
};

/**
 * Converts counters to minutes, seconds and centiseconds.
 */
App.prototype.updateCurrentTimeValues = function() {
    // 1 min = 60*100 centiseconds = 6000 centiseconds
    this.timeMinutes = Math.floor(this.timeCounter / 6000);
    // 1 sec = 100 centiseconds
    this.timeSeconds = Math.floor((this.timeCounter % 6000) / 100);
    this.timeCentiseconds = (this.timeCounter % 6000) % 100;

    // 1 min = 60*100 centiseconds = 6000 centiseconds
    this.lapMinutes = Math.floor(this.lapCounter / 6000);
    // 1 sec = 100 centiseconds
    this.lapSeconds = Math.floor((this.lapCounter % 6000) / 100);
    this.lapCentiseconds = (this.lapCounter % 6000) % 100;
};

App.prototype.hideAllButtons = function() {
    this.buttons.start.classList.remove('visible');
    this.buttons.stop.classList.remove('visible');
    this.buttons.lap.classList.remove('visible');
    this.buttons.resume.classList.remove('visible');
    this.buttons.reset.classList.remove('visible');
};

App.prototype.onClickStartButton = function() {
    this.isModeOn = true;

    this.hideAllButtons.call(this);

    // show stop and lap buttons
    this.buttons.stop.classList.toggle('visible');
    this.buttons.lap.classList.toggle('visible');

    // start counter
    this.startStopwatch(this);
};

App.prototype.onClickStopButton = function() {
    this.hideAllButtons.call(this);

    // show stop and lap buttons
    this.buttons.resume.classList.toggle('visible');
    this.buttons.reset.classList.toggle('visible');

    this.stopStopwatch();
};

App.prototype.onClickResumeButton = function() {
    this.hideAllButtons.call(this);

    // show stop and lap buttons
    this.buttons.stop.classList.toggle('visible');
    this.buttons.lap.classList.toggle('visible');

    // stop counter
    this.startStopwatch();
};

App.prototype.onClickResetButton = function() {
    this.loadApp();
};

App.prototype.onClickLapButton = function() {
    if (this.isModeOn) {
        this.stopStopwatch();

        // reset lap and show lap details
        this.lapCounter = 0;
        this.addLapDetails();

        // start action
        this.startStopwatch();
    }
};

App.prototype.addLapDetails = function() {
    this.totalLaps++;

    var newLapDetails = document.createElement('div');
    newLapDetails.classList.add('lap');
    newLapDetails.classList.add('outline-text');

    var lapTitle = document.createElement('div');
    lapTitle.classList.add('lap-time-title');
    lapTitle.innerText = 'Lap ' + this.totalLaps + ':';

    var lapTimeDetails = document.createElement('div');
    lapTimeDetails.classList.add('lap-time-details');

    var lapTimeMinutesSpan = document.createElement('span');
    lapTimeMinutesSpan.innerText = this.formatTimeValue(this.lapMinutes) + ':';

    var lapTimeSecondsSpan = document.createElement('span');
    lapTimeSecondsSpan.innerText = this.formatTimeValue(this.lapSeconds) + ':';

    var lapTimeCentisecondsSpan = document.createElement('span');
    lapTimeCentisecondsSpan.innerText = this.formatTimeValue(this.lapCentiseconds);

    lapTimeDetails.appendChild(lapTimeMinutesSpan);
    lapTimeDetails.appendChild(lapTimeSecondsSpan);
    lapTimeDetails.appendChild(lapTimeCentisecondsSpan);

    newLapDetails.appendChild(lapTitle);
    newLapDetails.appendChild(lapTimeDetails);

    this.lapsDetailsElement.prepend(newLapDetails);
};

App.prototype.stopStopwatch = function() {
    clearInterval(this.stopwatch);
};
