import {
  createInput,
  createTextarea,
  createCategoriesSelect,
  createWarningMessage,
  createButton,
} from "./elements.js";
import {
  addNote,
  archiveNote,
  editNote,
  deleteNote,
  getNotes,
} from "./dataProcessing.js";
import { updateNotesTable } from "./script.js";
import { updateCategoriesTable } from "./categories.js";

const modal = document.getElementById("myModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const modalActions = document.querySelector(".modal-actions");

function createButtons(acceptBtn, cancelBtn) {
  modalActions.appendChild(acceptBtn);
  modalActions.appendChild(cancelBtn);
  cancelBtn.addEventListener("click", () => {
    closeModal();
  });
}

function confirmAction(textTitle, textContent, action, acceptBtn) {
  modalTitle.textContent = textTitle;
  modalContent.textContent = textContent;
  acceptBtn.addEventListener("click", () => {
    action();
    updateNotesTable(getNotes());
    updateCategoriesTable(getNotes());
  });
}

function closeModal() {
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modalContent");
  const modalActions = document.querySelector(".modal-actions");
  modal.style.display = "none";
  modalContent.innerHTML = "";
  while (modalActions.firstChild) {
    modalActions.removeChild(modalActions.firstChild);
  }
}

function saveNote(action) {
  if (
    document.querySelector("#modalContent>input").value === "" ||
    document.querySelector("#modalContent>textarea").value === ""
  ) {
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

function handleArchiveClick(note, acceptBtn) {
  confirmAction(
    "Archive Note",
    "Are you sure you want to archive this note?",
    () => {
      archiveNote(note);
      closeModal();
    },
    acceptBtn
  );
}

function handleDeleteClick(note, acceptBtn) {
  confirmAction(
    "Delete Note",
    "Are you sure you want to delete this note?",
    () => {
      deleteNote(note);
      closeModal();
    },
    acceptBtn
  );
}

function handleEditClick(note, acceptBtn) {
  confirmAction(
    "Edit Note",
    "You can edit the note here.",
    () => saveNote(() => editNote(note)),
    acceptBtn
  );
  modalContent.appendChild(createInput("Note Name", note.name));
  modalContent.appendChild(createCategoriesSelect(note.noteCategory));
  modalContent.appendChild(createTextarea("Content", note.noteContent));
}

function handleAddClick(acceptBtn) {
  confirmAction(
    "Add Note",
    "You can add new note here.",
    () => saveNote(() => addNote()),
    acceptBtn
  );
  modalContent.appendChild(createInput("Note Name"));
  modalContent.appendChild(createCategoriesSelect("Task"));
  modalContent.appendChild(createTextarea("Content"));
}

export function showModal(action, note) {
  const acceptBtn = createButton("Accept", "btn", "btn-dark");
  const cancelBtn = createButton(
    "Cancel",
    "btn",
    "btn-light",
    "btn-outline-dark"
  );
  createButtons(acceptBtn, cancelBtn);
  switch (action) {
    case "Archive": {
      handleArchiveClick(note, acceptBtn);
      break;
    }
    case "Delete": {
      handleDeleteClick(note, acceptBtn);
      break;
    }
    case "Edit": {
      handleEditClick(note, acceptBtn);
      break;
    }
    case "Add": {
      handleAddClick(acceptBtn);
      break;
    }
    default:
      modalTitle.textContent = "";
      modalContent.textContent = "";
  }
  modal.style.display = "block";
}
