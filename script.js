const timersContainer = document.getElementById('timers-container');
const startTimerBtn = document.getElementById('start-timer');

startTimerBtn.addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    // console.log(1);
    const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds) * 1000;
    if (totalMilliseconds > 0) {
        createTimer(totalMilliseconds);
    }
    let secondsInput = document.getElementById("seconds");
    secondsInput.value = parseInt("0");
    // secondsInput.setAttribute ("placeholder", "Seconds");


    let minutesInput = document.getElementById("minutes");
    minutesInput.value = parseInt("0");

    let hoursInput = document.getElementById("hours");
    hoursInput.value = parseInt("0");
});

function createTimer(duration) {
    const timerElement = document.createElement('div');
    timerElement.classList.add('active-timer');

    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('timer-display');
    timerElement.appendChild(timerDisplay);

    const stopBtn = document.createElement('button');
    stopBtn.innerText = 'Stop Timer';
    stopBtn.addEventListener('click', () => {
        clearInterval(interval);
        timerElement.remove();
    });
    timerElement.appendChild(stopBtn);

    timersContainer.appendChild(timerElement);

    let remainingTime = duration;
    updateTimerDisplay();

    const interval = setInterval(() => {
        remainingTime -= 1000;
        if (remainingTime <= 0) {
            clearInterval(interval);
            timerDisplay.textContent = 'Time is UP!'; 
            timerElement.style.backgroundColor = " #F0F757"; 
            timerElement.style.color = "black";
            stopBtn.innerText = "Delete";
            stopBtn.style.backgroundColor = "#34344A";
            stopBtn.style.color = " #F0F757";
            playAudioAlert(); 
        } else {
            updateTimerDisplay();
        }
    }, 1000);

    function updateTimerDisplay() {
        const hours = Math.floor(remainingTime / 3600000);
        const minutes = Math.floor((remainingTime % 3600000) / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        timerDisplay.textContent = `Time Left: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
}

function playAudioAlert() {
    const audioAlert = document.getElementById('audio');
   
    if (audioAlert && typeof audioAlert.play === 'function') {
    
        audioAlert.pause();
        audioAlert.currentTime = 0;
      
        audioAlert.play();
    }
}
