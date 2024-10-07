let timer;
let repeating;
function setCountdownTimer() {
    let countdown = document.getElementById('countdownDuration').value;
    if(countdown <= 0) {
        console.log("Duration must be a number greater than 0");
        return;
    }
    document.getElementById('countdownTimer').textContent = countdown;
    clearInterval(timer);
    // Task 2: delayed by 500 ms notification
    setTimeout(function () {
        document.getElementById('notification').textContent = 'Remember, the timer is in seconds.';
    }, 500)
    // Task 3: Every 5 seconds notificationr repeats
    repeating = setInterval(function () {
        document.getElementById('notificationRepeated').innerHTML += `
        Repeat!<button onclick="dismiss()">Dismiss notification</button>`;
    }, 5000)
    timer = setInterval(function () {
        countdown--;
        document.getElementById('countdownTimer').textContent = countdown;
        if(countdown == 0) {
            clearInterval(timer);
        }
    },1000);
}

function dismiss() {
    clearInterval(repeating);
    document.getElementById('notificationRepeated').innerHTML = '';
}