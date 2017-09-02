# Simon (Easy Task) | NOTES

## Difficulties

1. Although I have had experience with JavaScript before, I have never used it in an object oriented way. Therefore clarifying the concept was definitely something I had to learn before I started coding.

2. It was hard to keep track of the delay between notes.

## Code Explanation

1. I created 3 new global variables: NOTES is an array that stores the notes to be played (if the user hits the next key before 2.5 seconds), lastTime is the time (using Date.now()) that the last note was played and timerId is a setTimeout method that keeps track of the 2.5 second interval.

2. We clear timerId if the user hits the next key too fast (reset the timer).

3. We keep track of the delay user hits the notes (so that this delay is also accounted for when we echo the notes 2.5secs later) using "this.delay".

4. We disable the notes before we start playing so that hitting the notes while the notes are echoing back has no effects. We enable it after the notes finish playing, which is timed using totalDuration. 

5. By keeping track of cumulativeDelay (the delay user hits the notes) as well as a totalDuration (cumulativeDelay + NOTE_DURATION * NOTES.length), we are able to time echoing back and enabling well. 
