function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock').textContent = "Current Time: " + timeString;
}

function resetTasks() {
    localStorage.clear(); // Clear local storage upon resetting tasks
    window.location.reload(); // Reload the page after resetting tasks
}

document.getElementById('resetTasks').addEventListener('click', resetTasks);

function displayTodayDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = now.getFullYear();
    const formattedDate = month + '/' + day + '/' + year; // Format as mm/dd/yyyy
    document.getElementById('date').textContent = "Today's Date: " + formattedDate;
}

setInterval(updateTime, 1000); // Update time every second

// Reset tasks at midnight
const now = new Date();
const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
const timeUntilMidnight = midnight - now;
setTimeout(resetTasks, timeUntilMidnight);

document.getElementById('resetTasks').addEventListener('change', function () {
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
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = task.id;
    const label = document.createElement('label');
    label.htmlFor = task.id;
    label.textContent = task.activity;
    cell1.appendChild(checkbox);
    cell1.appendChild(label);
    cell2.textContent = task.time;

    // Check if task completion data exists in local storage
    if (storedTasks[task.id]) {
        checkbox.checked = true;
        const completionTime = storedTasks[task.id];
        const date = new Date(completionTime);
        const dateString = date.toLocaleDateString();
        const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        label.innerHTML = `<del>${task.activity} (Completed on ${dateString} at ${timeString})</del>`;
        row.style.backgroundColor = 'grey'; // Set background color to grey if task is completed
    } else {
        // Set background color based on index
        const rowBackgroundColor = tasks.indexOf(task) % 2 === 0 ? 'white' : 'grey';
        row.style.backgroundColor = rowBackgroundColor;
    }

    // Add event listener to store task completion status in local storage and update UI
    checkbox.addEventListener('change', function () {
        const rowBackgroundColor = this.checked ? 'grey' : (tasks.indexOf(task) % 2 === 0 ? 'white' : 'grey');
        row.style.backgroundColor = rowBackgroundColor; // Update row background color
        if (this.checked) {
            storedTasks[task.id] = new Date().toISOString(); // Store completion time
            label.style.textDecoration = 'line-through'; // Add strikethrough style
        } else {
            delete storedTasks[task.id]; // Remove task completion data if unchecked
            label.style.textDecoration = 'none'; // Remove strikethrough style
        }
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update local storage
    });
});

displayTodayDate(); // Display today's date

document.getElementById('printButton').addEventListener('click', function () {
    // Get today's date
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = now.getFullYear();

    // Format the date as mmddyyyy
    const dateString = month + day + year;

    // Set the filename for the PDF
    const filename = dateString + '.pdf';

    // Generate the PDF with the specified filename
    html2pdf().from(document.body).save(filename);
});