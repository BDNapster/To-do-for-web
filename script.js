function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    document.getElementById('clock').textContent = "Current Time: " + timeString;
}

function resetTasks() {
    localStorage.clear(); // Clear local storage upon resetting tasks
    window.location.reload(); // Reload the page after resetting tasks
}

document.getElementById('resetTasks').addEventListener('click', resetTasks);

function displayTodayDate() {
    document.getElementById('date').textContent = "Today's Date: " + new Date().toLocaleDateString();
}

setInterval(updateTime, 1000); // Update time every second

// Reset tasks at midnight
const now = new Date();
const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
const timeUntilMidnight = midnight - now;
setTimeout(resetTasks, timeUntilMidnight);

document.getElementById('resetTasks').addEventListener('change', function() {
    if (this.checked) {
        resetTasks();
    }
});

// Retrieve stored task completion data from local storage
const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};

// Add event listeners to all task checkboxes
const tasks = [
    { id: 'wakeUp', activity: 'Wake up', time: '4:30 am' },
    { id: 'prepare', activity: 'Prepare for the day', time: '4:30 - 4:45 am' },
    { id: 'reciteQuran', activity: 'Recite Quran', time: '4:45 - 5:00 am' },
    { id: 'shower', activity: 'Cold shower', time: '5:00 - 5:05 am' },
    { id: 'morningPrayer', activity: 'Fajr', time: '5:05 - 5:15 am' },
    { id: 'learn', activity: 'Learning Hour', time: '5:15 - 6:00 am' },
    { id: 'breakfast', activity: 'Breakfast', time: '6:00 - 6:30 am' },
    { id: 'personalBusiness', activity: 'Work on personal', time: '6:30 - 7:30 am' },
    { id: 'earningMoney1', activity: 'Work on business', time: '7:30 - 12:00 pm' },
    { id: 'lunch', activity: 'Lunch', time: '12:00 - 1:00 pm' },
    { id: 'businessDevelopment', activity: 'Business Development', time: '1:00 - 2:30 pm' },
    { id: 'afternoonPrayer', activity: 'Zuhr', time: '2:30 - 3:30 pm' },
    { id: 'earningMoney2', activity: 'Work on business', time: '3:30 - 5:30 pm' },
    { id: 'eveningPrayer', activity: 'Asr', time: '5:30 - 6:30 pm' },
    { id: 'learn2', activity: 'Learning Hour', time: '6:30 - 7:30 pm' },
    { id: 'dinner', activity: 'Dinner', time: '7:30 - 8:30 pm' },
    { id: 'reciteQuran2', activity: 'Recite Quran', time: '8:30 - 9:30 pm' },
    { id: 'personalDevelopment', activity: 'Personal Development', time: '9:30 - 10:30 pm' },
    { id: 'windDown', activity: 'Wind down, prepare for sleep', time: '10:30 - 11:00 pm' },
    { id: 'sleep', activity: 'Sleep', time: '11:00 pm' }
];

const table = document.querySelector('.timeframe table');
tasks.forEach(task => {
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.innerHTML = `<input type="checkbox" id="${task.id}">${task.activity}`;
    cell2.textContent = task.time;

    // Check if task completion data exists in local storage
    if (storedTasks[task.id]) {
        document.getElementById(task.id).checked = true;
        const completionTime = storedTasks[task.id];
        const date = new Date(completionTime);
        const dateString = date.toLocaleDateString();
        const timeString = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        cell1.innerHTML += ` (Completed on ${dateString} at ${timeString})`;
    }

    // Add event listener to store task completion status in local storage
    document.getElementById(task.id).addEventListener('change', function() {
        if (this.checked) {
            storedTasks[task.id] = new Date().toISOString(); // Store completion time
        } else {
            delete storedTasks[task.id]; // Remove task completion data if unchecked
        }
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update local storage
    });
});

displayTodayDate(); // Display today's date

document.getElementById('printButton').addEventListener('click', function() {
    window.print();
});

