var KEYS = ['c', 'd', 'e', 'f'];
var NOTE_DURATION = 1000;

// Array of notes waiting to be played after 2.5 secs
var NOTES = [];
var lastTime = Date.now();
var timerId = -1;
// NoteBox
//
// Acts as an interface to the coloured note boxes on the page, exposing methods
// for playing audio, handling clicks,and enabling/disabling the note box.
function NoteBox(key, onClick) {
	// Create references to box element and audio element.
	var boxEl = document.getElementById(key);
	var audioEl = document.getElementById(key + '-audio');
	if (!boxEl) throw new Error('No NoteBox element with id' + key);
	if (!audioEl) throw new Error('No audio element with id' + key + '-audio');

	// When enabled, will call this.play() and this.onClick() when clicked.
	// Otherwise, clicking has no effect.
	var enabled = true;
	// Counter of how many play calls have been made without completing.
	// Ensures that consequent plays won't prematurely remove the active class.
	var playing = 0;

	this.key = key;
	this.onClick = function (key) {
    if (lastTime > Date.now() - 2500 && timerId != -1) {
      clearTimeout(timerId);
      timerId = -1;
    }

    this.delay = NOTES.length === 0 ? 0 : Date.now() - lastTime;
    NOTES.push(this);
    lastTime = Date.now();
    timerId = setTimeout(() => {
      var totalDuration = NOTES.length * NOTE_DURATION;
      for (var i = 0; i < NOTES.length; i++){
        NOTES[i].disable();
        totalDuration += NOTES[i].delay;
      }
      setTimeout(function() {
        for (var i = 0; i < NOTES.length; i++){
          NOTES[i].enable();
        }
        NOTES.length = 0;
      }, totalDuration);

      var cumulativeDelay = 0;
      for (var i = 0; i < NOTES.length; i++){
        cumulativeDelay += NOTES[i].delay;
        setTimeout(NOTES[i].play, (i * NOTE_DURATION) + cumulativeDelay);
      }
      timerId = -1;
    }, 2500);
  };

	// Plays the audio associated with this NoteBox
	this.play = function () {
		playing++;
		// Always play from the beginning of the file.
		audioEl.currentTime = 0;
		audioEl.play();

		// Set active class for NOTE_DURATION time
		boxEl.classList.add('active');
		setTimeout(function () {
			playing--
			if (!playing) {
				boxEl.classList.remove('active');
			}
		}, NOTE_DURATION)
	}

	// Enable this NoteBox
	this.enable = function () {
		enabled = true;
	}

	// Disable this NoteBox
	this.disable = function () {
		enabled = false;
	}

	// Call this NoteBox's clickHandler and play the note.
	this.clickHandler = () => {
    console.log(enabled);
		if (!enabled) {
      console.log('WAIT');
      return;
    }
    this.onClick(this.key)
		//this.play()
	};

	boxEl.addEventListener('mousedown', this.clickHandler);
}



// Example usage of NoteBox.
//
// This will create a map from key strings (i.e. 'c') to NoteBox objects so that
// clicking the corresponding boxes on the page will play the NoteBox's audio.
// It will also demonstrate programmatically playing notes by calling play directly.

var notes = {};

KEYS.forEach(function (key) {
	notes[key] = new NoteBox(key);
});


// KEYS.concat(KEYS.slice().reverse()).forEach(function(key, i) {
// 	setTimeout(notes[key].play, i * NOTE_DURATION);
// });

