import { archive, pen, trash } from "./icons.js";
import { initialNotes, categories, monthNames } from "./mockup.js";
import { selectActiveNotes, selectArchivedNotes } from "./noteTypes.js";
import { updateCategoriesTable } from "./categories.js";

let notes = [...initialNotes];

let showArchivedNotes = false;

function selectCategoryIcon(category) {
  return categories.find((item) => item.name === category).icon;
}

function getCurrentTime() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = monthNames[currentDate.getMonth()];
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  return `${month} ${day}, ${year}, ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function addNote() {
  const newNote = {};
  newNote.name = document.querySelector("#modalContent>input").value;
  newNote.timeOfCreation = getCurrentTime();
  newNote.noteCategory = document.querySelector("#modalContent>select").value;
  newNote.noteContent = document.querySelector("#modalContent>textarea").value;
  newNote.archived = showArchivedNotes;
  newNote.datesMentioned = [];
  notes = [...notes, newNote];
  updateNotesTable();
  updateCategoriesTable(notes);
  getCurrentTime();
}

function archiveNote(note) {
  notes.map((element) => {
    if (element === note) {
      note.archived = !note.archived;
    }
  });
  updateNotesTable();
  updateCategoriesTable(notes);
}

function editNote(note) {
  notes.map((element) => {
    if (note === element) {
      note.name = document.querySelector("#modalContent>input").value;
      note.noteCategory = document.querySelector("#modalContent>select").value;
      note.noteContent = document.querySelector("#modalContent>textarea").value;
    }
  });
  updateNotesTable();
  updateCategoriesTable(notes);
}

function deleteNote(note) {
  notes = notes.filter((e) => e !== note);
  updateNotesTable();
  updateCategoriesTable(notes);
}

function createInput(placeholder, value) {
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", placeholder ? placeholder : "");
  input.setAttribute("value", value ? value : "");
  input.classList.add("form-control");
  return input;
}

function createTextarea(placeholder, value) {
  const textarea = document.createElement("textarea");
  textarea.classList.add("form-control");
  textarea.setAttribute("placeholder", placeholder);
  textarea.value = value ? value : "";
  return textarea;
}

function createCategoriesSelect(category) {
  const select = document.createElement("select");
  select.classList.add("form-select");
  select.setAttribute("aria-label", "Default select example");
  categories.map((item) => {
    const option = document.createElement("option");
    option.setAttribute("value", item.name);
    if (item.name === category) {
      option.selected = true;
    }
    option.textContent = item.name;
    select.appendChild(option);
  });
  return select;
}

function showModal(action, note) {
  const modal = document.getElementById("myModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  const acceptBtn = document.getElementById("acceptBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  switch (action) {
    case "Archive": {
      modalTitle.textContent = "Archive Note";
      modalContent.textContent = "Are you sure you want to archive this note?";
      acceptBtn.onclick = () => {
        archiveNote(note);
        closeModal();
      };
      break;
    }
    case "Delete": {
      modalTitle.textContent = "Delete Note";
      modalContent.textContent = "Are you sure you want to delete this note?";
      acceptBtn.onclick = () => {
        deleteNote(note);
        closeModal();
      };
      break;
    }
    case "Edit": {
      modalTitle.textContent = "Edit Note";
      modalContent.textContent = "You can edit the note here.";
      modalContent.appendChild(createInput("Note Name", note.name));
      modalContent.appendChild(createCategoriesSelect(note.noteCategory));
      modalContent.appendChild(createTextarea("Content", note.noteContent));
      acceptBtn.onclick = () => {
        editNote(note);
        closeModal();
      };
      break;
    }
    case "Add": {
      console.log("here");
      modalTitle.textContent = "Add Note";
      modalContent.textContent = "You can add new note here.";
      modalContent.appendChild(createInput("Note Name"));
      modalContent.appendChild(createCategoriesSelect("Task"));
      modalContent.appendChild(createTextarea("Content"));
      acceptBtn.onclick = () => {
        addNote();
        closeModal();
      };
      break;
    }
    default:
      modalTitle.textContent = "";
      modalContent.textContent = "";
  }
  modal.style.display = "block";

  cancelBtn.onclick = function () {
    closeModal();
  };
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
  modalTitle.textContent = "";
  modalContent.textContent = "";
}

function createActionButton(icon, clickHandler) {
  const button = document.createElement("td");
  button.innerHTML = icon;
  button.addEventListener("click", clickHandler);
  return button;
}

function createNoteRow(note, index) {
  const row = document.createElement("tr");
  row.setAttribute("data-index", index);
  row.innerHTML =
    "<td>" +
    selectCategoryIcon(note.noteCategory) +
    `</td>
                <td>${note.name}</td>
                <td>${note.timeOfCreation}</td>
                <td>${note.noteCategory}</td>
                <td>${note.noteContent}</td>
                <td>${note.datesMentioned.join(", ")}</td>`;
  row.appendChild(
    createActionButton(archive, () => showModal("Archive", note))
  );
  row.appendChild(createActionButton(pen, () => showModal("Edit", note)));
  row.appendChild(createActionButton(trash, () => showModal("Delete", note)));
  return row;
}

function updateNotesTable() {
  const tableBody = document.querySelector(".note-list");
  tableBody.innerHTML = "";
  notes.forEach((note, index) => {
    if (showArchivedNotes === note.archived) {
      const row = createNoteRow(note, index);
      tableBody.appendChild(row);
    }
  });
}

const addButton = document.querySelector(".bi-file-earmark-plus");

addButton.addEventListener("click", () => showModal("Add"));

const activeNotesSection = document.querySelector(".active-notes-option>a");
const archiveNotesSection = document.querySelector(".archived-notes-option>a");

activeNotesSection.addEventListener("click", () => {
  showArchivedNotes = selectActiveNotes(
    activeNotesSection,
    archiveNotesSection
  );
  updateNotesTable();
});

archiveNotesSection.addEventListener("click", () => {
  showArchivedNotes = selectArchivedNotes(
    activeNotesSection,
    archiveNotesSection
  );
  updateNotesTable();
});

updateNotesTable();
updateCategoriesTable(notes);
