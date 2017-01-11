let countdown;

const timerDisplay = document.querySelector('.display__time-left');
const endDisplay = document.querySelector('.display__end-time');

document.querySelectorAll('.timer__button').forEach(b => {
    b.addEventListener('click', (e) => {
        timer(e.target.dataset.time);
    });
});

document.customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    timer(document.customForm.minutes.value * 60);
    document.customForm.reset()
})

function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    clearInterval(countdown);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now())/ 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        //display
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const reminderSeconds = seconds % 60;
    const display = `${minutes}:${zeroPad(reminderSeconds)}`;
    timerDisplay.textContent = display
    document.title = display;
}


function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    endDisplay.textContent = `${end.getHours()}:${zeroPad(end.getMinutes())}`
}

function zeroPad(t) {
    return `${t < 10 ? '0': ''}${t}`
}
