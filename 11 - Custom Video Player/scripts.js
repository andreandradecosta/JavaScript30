const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const playBtn = player.querySelector('.toggle');
const skipBtns = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

progressBar.style.flexBasis = '0%';

function playPause() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function playing() {
    playBtn.textContent = '❚ ❚';
}

function paused() {
    playBtn.textContent = '►';
}

function updateProgess() {
    progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;

}

function seek(seeking, event) {
    if (seeking) {
        video.currentTime = video.duration * (event.offsetX / progress.offsetWidth);
    }
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeControl() {
    video[this.name] = this.value;
}

video.addEventListener('click', playPause);
video.addEventListener('play', playing);
video.addEventListener('pause', paused);
video.addEventListener('timeupdate', updateProgess);
playBtn.addEventListener('click', playPause);

let seeking = false
progress.addEventListener('mousemove', (event) => seek(seeking, event))
progress.addEventListener('click', (event) => seek(true, event))
progress.addEventListener('mousedown', () => seeking = true)
progress.addEventListener('mouseup', () => seeking = false)
progress.addEventListener('mouseout', () => seeking = false)

ranges.forEach(r => r.addEventListener('input', rangeControl))
skipBtns.forEach(b => b.addEventListener('click', skip));
