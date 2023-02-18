// Buttons
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev')
// Title and Artist and Image and Audio
const audio = document.querySelector('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const image = document.querySelector('img');
// Progress bar and time
const progressParent = document.getElementById('progress-container');
const progressBar = document.getElementById('progress');
const duration = document.getElementById('duration');
const currentTime = document.getElementById('current-time');

const musicObject = [
    {
        artist: 'SamX-1',
        title: 'Calm',
        src: 'music/Calm.mp3',
        image: 'https://images.pexels.com/photos/1762578/pexels-photo-1762578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        artist: 'SamX-2',
        title: 'Pure',
        src: 'music/Pure.wav',
        image: 'https://images.pexels.com/photos/2701570/pexels-photo-2701570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
        artist: 'SamX-3',
        title: 'Yeah',
        src: 'music/Yeah.flac',
        image: 'https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
];

let isPlaying = false;
let songIndex = 0;

// Play/Pause song function
function playPauseSong() {
    if (audio.paused) {
        audio.play();
        isPlaying = true;
        playBtn.classList.toggle('fa-play');
        playBtn.classList.toggle('fa-pause');
        updateProgressBar();
    } else {
        audio.pause();
        isPlaying = false;
        playBtn.classList.toggle('fa-pause');
        playBtn.classList.toggle('fa-play');
    }
}

// Play next song function
function playNextSong() {
    // If the current index(songIndex) is the last song (musicObject[2]) in the track, we reset the index and back to zero and increase the index 
    if (songIndex === musicObject.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    // Update DOM depending on wich track is current
    audio.src = musicObject[songIndex].src;
    title.textContent = musicObject[songIndex].title;
    image.src = musicObject[songIndex].image;
    artist.textContent = musicObject[songIndex].artist;

    // If the current state of the audio element is currently playing do this
    if (isPlaying) {
        playPauseSong();
        playBtn.classList.toggle('fa-play');
        playBtn.classList.toggle('fa-pause');
    }
}

// Previous song function
function prevSong() {
    // To prevent songIndex of less than 0
    if (songIndex < 0) {
        songIndex = 2;
    } else {
        songIndex--;
    }

    // Update DOM
    audio.src = musicObject[songIndex].src;
    audio.onloadedmetadata = function () {
        updateProgressBar();
    }

    // Update DOM depending on wich track is current
    audio.src = musicObject[songIndex].src;
    title.textContent = musicObject[songIndex].title;
    image.src = musicObject[songIndex].image;
    artist.textContent = musicObject[songIndex].artist;
    if (isPlaying) {
        playPauseSong();
        playBtn.classList.toggle('fa-play');
        playBtn.classList.toggle('fa-pause');
    }
}

function updateProgressBar(e) {
    // Calculate and declare/ display current time
    const current = audio.currentTime;
    const minutes = Math.floor(current / 60);
    const seconds = Math.floor(current % 60);
    const secondsFormatted = (seconds < 10) ? `0${seconds}` : seconds;
    const timeUpdate = `${minutes}:${secondsFormatted}`; // Return the calculated time to the DOM
    currentTime.textContent = timeUpdate; // Append timeUpdate to DOM

    // Calculate duration time and declare/ display duration time
    const durationTime = audio.duration;
    const durationMinutes = Math.floor(durationTime / 60);
    const durationSeconds = Math.floor(durationTime % 60);
    const durationSecondsFormatted = (durationSeconds < 10) ? `0${durationSeconds}` : durationSeconds;
    const durationUpdate = `${durationMinutes}:${durationSecondsFormatted}`; // Return
    duration.textContent = durationUpdate; // Update DOM

    // Update the progress bar percentage of the song
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percentage}%`; // Update the DOM
}

// If the progress bar is clicked, let the song play at current click location
function moveToProgressBar(e) {
    // Declare the event location
    const width = this.offsetWidth;
    const clickX = e.offsetX;
    // Update the song current time  
    const percent = clickX / width;
    const duration = audio.duration;
    audio.currentTime = percent * duration;
}

// Add Event listeners
playBtn.addEventListener('click', playPauseSong);
nextBtn.addEventListener('click', playNextSong);
prevBtn.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgressBar);
progressParent.addEventListener('click', moveToProgressBar);
audio.addEventListener('loadedmetadata', () => updateProgressBar()); // Update progress bar when audio element has loaded