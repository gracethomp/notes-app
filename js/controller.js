import {
  createInput,
  createTextarea,
  createCategoriesSelect,
  createWarningMessage,
  createButton,
  getValueBySelector,
} from "./elements.js";
import {
  addNote,
  archiveNote,
  editNote,
  deleteNote,
  getNotes,
} from "./dataProcessing.js";
import { updateNotesTable } from "./rendering.js";
import { updateCategoriesTable } from "./categories.js";
import { getCurrentTime, getDatesFromString } from "./dateUtils.js";

const modal = document.getElementById("myModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const modalActions = document.querySelector(".modal-actions");

function createNoteFromForm(action) {
  const newNote = {};
  newNote.name = getValueBySelector("#modalContent>input");
  newNote.noteCategory = getValueBySelector("#modalContent>select");
  newNote.noteContent = getValueBySelector("#modalContent>textarea");
  newNote.datesMentioned = getDatesFromString(
    newNote.name + " " + newNote.noteContent
  );
  if (action === "Add") {
    newNote.timeOfCreation = getCurrentTime();
    newNote.archived = false;
  }
  return newNote;
}

function changeModalText(textTitle, textContent) {
  modalTitle.textContent = textTitle;
  modalContent.textContent = textContent;
}

function setConfirmAction(action, acceptBtn) {
  acceptBtn.addEventListener("click", () => {
    action();
    updateNotesTable(getNotes());
    updateCategoriesTable(getNotes());
  });
}

function clearModal() {
  modalContent.innerHTML = "";
  while (modalActions.firstChild) {
    modalActions.removeChild(modalActions.firstChild);
  }
}

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
  clearModal();
}

function saveNoteChanges(action) {
  const newName = getValueBySelector("#modalContent>input");
  const newContent = getValueBySelector("#modalContent>textarea");
  if (newName === "" || newContent === "") {
    if (!document.querySelector(".warning-message")) {
      modalContent.appendChild(createWarningMessage());
    }
  } else {
    action();
    updateNotesTable(getNotes());
    updateCategoriesTable(getNotes());
    closeModal();
  }
}

function handleArchiveClick(note) {
  const acceptBtn = createButton("Accept", "btn", "btn-dark");
  const cancelBtn = createButton(
    "Cancel",
    "btn",
    "btn-light",
    "btn-outline-dark"
  );
  modalActions.appendChild(acceptBtn);
  modalActions.appendChild(cancelBtn);
  changeModalText(
    "Archive Note",
    `Are you sure you want to ${
      note.archived ? "unarchive" : "archive"
    } this note?`
  );
  setConfirmAction(() => {
    archiveNote(note);
    closeModal();
  }, acceptBtn);
  cancelBtn.addEventListener("click", () => {
    closeModal();
  });
  openModal();
}

function handleDeleteClick(note) {
  const acceptBtn = createButton("Accept", "btn", "btn-dark");
  const cancelBtn = createButton(
    "Cancel",
    "btn",
    "btn-light",
    "btn-outline-dark"
  );
  modalActions.appendChild(acceptBtn);
  modalActions.appendChild(cancelBtn);
  changeModalText("Delete Note", "Are you sure you want to delete this note?");
  setConfirmAction(() => {
    deleteNote(note);
    closeModal();
  }, acceptBtn);
  cancelBtn.addEventListener("click", () => {
    closeModal();
  });
  openModal();
}

function handleEditClick(note) {
  const acceptBtn = createButton("Accept", "btn", "btn-dark");
  const cancelBtn = createButton(
    "Cancel",
    "btn",
    "btn-light",
    "btn-outline-dark"
  );
  modalActions.appendChild(acceptBtn);
  modalActions.appendChild(cancelBtn);
  changeModalText("Edit Note", "You can edit the note here.");
  setConfirmAction(() => {
    saveNoteChanges(() => {
      const editedNote = createNoteFromForm();
      editNote(note, editedNote);
    });
  }, acceptBtn);
  cancelBtn.addEventListener("click", () => {
    closeModal();
  });
  modalContent.appendChild(createInput("Note Name", note.name));
  modalContent.appendChild(createCategoriesSelect(note.noteCategory));
  modalContent.appendChild(createTextarea("Content", note.noteContent));
  openModal();
}

function handleAddClick() {
  const acceptBtn = createButton("Accept", "btn", "btn-dark");
  const cancelBtn = createButton(
    "Cancel",
    "btn",
    "btn-light",
    "btn-outline-dark"
  );
  modalActions.appendChild(acceptBtn);
  modalActions.appendChild(cancelBtn);
  changeModalText("Add Note", "You can add a new note here.");
  setConfirmAction(() => {
    saveNoteChanges(() => {
      const newNote = createNoteFromForm("Add");
      addNote(newNote);
    });
  }, acceptBtn);
  cancelBtn.addEventListener("click", () => {
    closeModal();
  });
  modalContent.appendChild(createInput("Note Name"));
  modalContent.appendChild(createCategoriesSelect("Task"));
  modalContent.appendChild(createTextarea("Content"));
  openModal();
}

export function showModal(action, note) {
  switch (action) {
    case "Archive": {
      handleArchiveClick(note);
      break;
    }
    case "Delete": {
      handleDeleteClick(note);
      break;
    }
    case "Edit": {
      handleEditClick(note);
      break;
    }
    case "Add": {
      handleAddClick();
      break;
    }
    default:
      modalTitle.textContent = "";
      modalContent.textContent = "";
  }
}
