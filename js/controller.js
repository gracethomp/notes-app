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
import { updateScreenData } from "./rendering.js";
import { getCurrentTime, getDatesFromString } from "./dateUtils.js";

const modal = document.getElementById("myModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const modalActions = document.querySelector(".modal-actions");

function getNoteFromForm(action) {
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
    try {
      action();
      updateScreenData();
    } catch (error) {
      console.error("Error occurred during action:", error);
    }
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
    try {
      action();
      updateScreenData();
      closeModal();
    } catch (error) {
      console.error("Error occurred during action:", error);
    }
  }
}

function setupModalActions(
  acceptText,
  cancelText,
  titleText,
  contentText,
  onAccept
) {
  const acceptBtn = createButton(acceptText, "btn", "btn-dark");
  const cancelBtn = createButton(
    cancelText,
    "btn",
    "btn-light",
    "btn-outline-dark"
  );
  modalActions.appendChild(acceptBtn);
  modalActions.appendChild(cancelBtn);
  changeModalText(titleText, contentText);
  setConfirmAction(() => {
    onAccept();
  }, acceptBtn);

  cancelBtn.addEventListener("click", () => {
    closeModal();
  });
}

function handleArchiveClick(note) {
  const acceptText = "Accept";
  const cancelText = "Cancel";
  const titleText = "Archive Note";
  const contentText = `Are you sure you want to ${
    note.archived ? "unarchive" : "archive"
  } this note?`;
  setupModalActions(acceptText, cancelText, titleText, contentText, () => {
    archiveNote(note);
    closeModal();
  });
}

function handleDeleteClick(note) {
  const acceptText = "Accept";
  const cancelText = "Cancel";
  const titleText = "Delete Note";
  const contentText = "Are you sure you want to delete this note?";
  setupModalActions(acceptText, cancelText, titleText, contentText, () => {
    deleteNote(note);
    closeModal();
  });
}

function handleEditClick(note) {
  const acceptText = "Accept";
  const cancelText = "Cancel";
  const titleText = "Edit Note";
  const contentText = "You can edit the note here.";
  setupModalActions(acceptText, cancelText, titleText, contentText, () => {
    saveNoteChanges(() => {
      const editedNote = getNoteFromForm();
      editNote(note, editedNote);
    });
  });
  modalContent.appendChild(createInput("Note Name", note.name));
  modalContent.appendChild(createCategoriesSelect(note.noteCategory));
  modalContent.appendChild(createTextarea("Content", note.noteContent));
}

function handleAddClick() {
  const acceptText = "Accept";
  const cancelText = "Cancel";
  const titleText = "Add Note";
  const contentText = "You can add a new note here.";

  setupModalActions(acceptText, cancelText, titleText, contentText, () => {
    saveNoteChanges(() => {
      const newNote = getNoteFromForm("Add");
      addNote(newNote);
    });
  });

  modalContent.appendChild(createInput("Note Name"));
  modalContent.appendChild(createCategoriesSelect("Task"));
  modalContent.appendChild(createTextarea("Content"));
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
  openModal();
}
