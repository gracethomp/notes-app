import { archive, pen, trash } from "./icons.js";
import { initialNotes } from "./mockup.js";
import { selectActiveNotes, selectArchivedNotes } from "./noteTypes.js";
import { selectCategoryIcon, updateCategoriesTable } from "./categories.js";
import {
  createInput,
  createTextarea,
  createCategoriesSelect,
  createWarningMessage,
  createActionButton,
} from "./elements.js";
import { getCurrentTime, getDatesFromString } from "./dateUtils.js";

let notes = [...initialNotes];

let showArchivedNotes = false;

function getNotesDataFromForm(action) {
  const newNote = {};
  newNote.name = document.querySelector("#modalContent>input").value;
  newNote.noteCategory = document.querySelector("#modalContent>select").value;
  newNote.noteContent = document.querySelector("#modalContent>textarea").value;
  newNote.datesMentioned = getDatesFromString(newNote.name + newNote.noteContent);
  console.log(newNote.datesMentioned);
  if (action === "Add") {
    newNote.timeOfCreation = getCurrentTime();
    newNote.archived = showArchivedNotes;
  }
  return newNote;
}

function addNote() {
  const newNote = getNotesDataFromForm("Add");
  notes = [...notes, newNote];
  updateNotesTable();
  updateCategoriesTable(notes);
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
  const editedNote = getNotesDataFromForm();
  notes.map((element) => {
    if (note === element) {
      console.log(editedNote.datesMentioned)
      note.name = editedNote.name;
      note.noteCategory = editedNote.noteCategory;
      note.noteContent = editedNote.noteContent;
      note.datesMentioned = editedNote.datesMentioned;
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
        if (
          document.querySelector("#modalContent>input").value === "" ||
          document.querySelector("#modalContent>textarea").value === ""
        ) {
          if (!document.querySelector(".warning-message")) {
            modalContent.appendChild(createWarningMessage());
          }
        } else {
          editNote(note);
          closeModal();
        }
      };
      break;
    }
    case "Add": {
      modalTitle.textContent = "Add Note";
      modalContent.textContent = "You can add new note here.";
      modalContent.appendChild(createInput("Note Name"));
      modalContent.appendChild(createCategoriesSelect("Task"));
      modalContent.appendChild(createTextarea("Content"));
      acceptBtn.onclick = () => {
        if (
          document.querySelector("#modalContent>input").value === "" ||
          document.querySelector("#modalContent>textarea").value === ""
        ) {
          if (!document.querySelector(".warning-message")) {
            modalContent.appendChild(createWarningMessage());
          }
        } else {
          addNote();
          closeModal();
        }
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
  modalContent.innerHTML = "";
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
