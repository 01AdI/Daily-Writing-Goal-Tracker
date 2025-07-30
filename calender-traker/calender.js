
const calendarGrid = document.getElementById('calendarGrid');
const currentMonthYear = document.getElementById('month-name');
const prevMonth = document.getElementById('prev');
const nextMonth = document.getElementById('next');
const event_detail = document.getElementById('event');
const eventTitle = document.getElementById('event-title');
const eventDescription = document.getElementById('event-desc');
const save = document.getElementById('save');
const delet = document.getElementById('delete');
const cancel = document.getElementById('cancel');


// Current Date Variables
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let activeCell = null;
let events = JSON.parse(localStorage.getItem('events')) || {};  // Load events from localStorage


// ==============================
// Render Calendar
// ==============================


function renderCalendar(month, year) {
  calendarGrid.innerHTML = '';     // Clear calendar grid
  const firstDay = new Date(year, month).getDay();  // First day of the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();  // Total days in the month

  // Display current month & year
  currentMonthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;


  // Add empty cells before first day of the month
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    calendarGrid.appendChild(emptyCell);
  }


  // Populate calendar with days
  for (let i = 1; i <= daysInMonth; i++) {
    const cell = document.createElement('div');
    cell.textContent = i;

    const eventKey = `${year}-${month + 1}-${i}`;  // Key to store events in the format "YYYY-MM-DD"

    // Mark days with events
    if (events[eventKey]) {
      cell.innerHTML = `<strong>${i}</strong> 📌`;  // Add 📌 if there is an event
      cell.classList.add('event-marker');
    }

    // Open the modal when clicking on a day with an event
    cell.addEventListener('click', () => openModal(cell, eventKey));
    calendarGrid.appendChild(cell);
  }
}


// Open Event Modal to Add/Edit Event
function openModal(cell, eventKey) {
  activeCell = { cell, eventKey };
  const eventData = events[eventKey] || {};
  eventTitle.value = eventData.title || '';
  eventDescription.value = eventData.description || '';
  event_detail.classList.remove('hidden');

  const modalActions = document.getElementById('modal-actions');
  modalActions.innerHTML = ''; // Clear previous buttons

  if (events[eventKey]) {
    // If event already exists, show "Edit" button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'save-btn';

    // edit the Event
    editBtn.addEventListener('click', () => {
      handleSaveOrEdit('edit');
    });
    modalActions.appendChild(editBtn);
  }
  else {
    // If no event, show "Save" button
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn';

    // Save the Event
    saveBtn.addEventListener('click', () => {
      handleSaveOrEdit('save');
    });
    modalActions.appendChild(saveBtn);
  }
}

function handleSaveOrEdit(mode) {
  const { cell, eventKey } = activeCell;
  const title = eventTitle.value.trim();
  const description = eventDescription.value.trim();

  if (title || description) {
    events[eventKey] = { title, description };
    localStorage.setItem('events', JSON.stringify(events));

    cell.innerHTML = `<strong>${eventKey.split("-")[2]}</strong> 📌<br>${title}`;
    cell.classList.add('event-marker');

    if (mode === 'edit') {
      alert('Event updated successfully!');
    }
  }

  closeModal();
}



// Close the Event Modal
function closeModal() {
  event_detail.classList.add('hidden');

  save.textContent = "Save";
  save.classList.remove("edit-mode");
}



// Delete the Event
delet.addEventListener('click', () => {
  const { cell, eventKey } = activeCell;

  if (confirm('Are you sure you want to delete this event?')) {
    const titleToRemove = events[eventKey]?.title || '';  // Save title before deletion

    delete events[eventKey];  // Remove from object
    localStorage.setItem('events', JSON.stringify(events));  // Update localStorage

    cell.textContent = cell.textContent.replace('📌', '').trim();  // Remove pin
    cell.textContent = cell.textContent.replace(titleToRemove, '').trim();  // Remove title
    cell.classList.remove('event-marker');  // Remove styling
    closeModal();  // Hide modal
  }
});

// Cancel the Event Edit/Delete
cancel.addEventListener('click', closeModal);


// Navigate to the Previous Month
prevMonth.addEventListener('click', () => {
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
  renderCalendar(currentMonth, currentYear);
});

// Navigate to the Next Month
nextMonth.addEventListener('click', () => {
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
  renderCalendar(currentMonth, currentYear);
});



renderCalendar(currentMonth, currentYear);


cell.addEventListener('click', () => {
  openModal(cell, eventKey);  // Open the modal when the day is clicked
});

// Close the Event Modal
function closeModal() {
  event_detail.classList.add('hidden');
}

// Open the modal when clicking on a day
cell.addEventListener('click', () => openModal(cell, eventKey));
