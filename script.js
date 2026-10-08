// ---------- Select elements ----------
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");
const clearAllBtn = document.querySelector("#clear-all");

const MAX_LENGTH = 200;
const STORAGE_KEY = "quicknotes";

// ===== Task 5: load from localStorage =====
function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
      return [];
    }
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Each note: { id, text, category, createdAt }
let notes = loadNotes();

// ===== Task 4: count message =====
function countMessage() {
  if (notes.length === 0) {
    return "You have no notes yet.";
  }
  if (notes.length === 1) {
    return "You have 1 note.";
  }
  return `You have ${notes.length} notes.`;
}

// ===== Task 3: render the list (createElement + textContent only) =====
function createNoteCard(note) {
  const li = document.createElement("li");
  li.classList.add("note", `category-${note.category}`);

  const text = document.createElement("p");
  text.classList.add("note-text");
  text.textContent = note.text;

  const meta = document.createElement("div");
  meta.classList.add("note-meta");

  const label = document.createElement("span");
  label.classList.add("category-label");
  label.textContent = note.category.charAt(0).toUpperCase() + note.category.slice(1);

  const date = document.createElement("span");
  date.classList.add("note-date");
  date.textContent = note.createdAt;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    deleteNote(note.id);
  });

  meta.append(label, date, deleteBtn);
  li.append(text, meta);
  return li;
}

function render() {
  notesList.replaceChildren();
  noteCount.textContent = countMessage();

  // ===== Task 5: search filter =====
  const term = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(term);
  });

  if (notes.length > 0 && visibleNotes.length === 0) {
    const li = document.createElement("li");
    li.classList.add("no-results");
    li.textContent = "No notes match your search.";
    notesList.append(li);
    return;
  }

  visibleNotes.forEach(function (note) {
    notesList.append(createNoteCard(note));
  });
}

// ===== Task 3 + 4: add a note with validation =====
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const note = {
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.push(note);
  saveNotes();
  noteInput.value = "";
  render();
});

// ===== Task 4: delete =====
function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}

// ===== Task 5: search as the user types =====
searchInput.addEventListener("input", render);

// ===== Bonus: Clear all =====
clearAllBtn.addEventListener("click", function () {
  if (notes.length === 0) {
    return;
  }
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

// ---------- Start ----------
render();
