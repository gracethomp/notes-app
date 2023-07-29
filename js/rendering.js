import { archive, pen, trash } from "./icons.js";
import { createActionButton, createCell } from "./elements.js";
import { selectCategoryIcon, updateCategoriesTable } from "./categories.js";
import { showModal } from "./controller.js";
import { getNotes } from "./dataProcessing.js";
import { selectActiveNotes, selectArchivedNotes } from "./noteTypes.js";

let showArchivedNotes = false;

function createNoteRow(note, index) {
  const row = document.createElement("tr");
  row.setAttribute("data-index", index);
  row.appendChild(createCell(selectCategoryIcon(note.noteCategory)));
  row.appendChild(createCell(note.name));
  row.appendChild(createCell(note.timeOfCreation));
  row.appendChild(createCell(note.noteCategory));
  row.appendChild(createCell(note.noteContent));
  row.appendChild(createCell(note.datesMentioned.join(", ")));
  row.appendChild(
    createActionButton(archive, () => showModal("Archive", note))
  );
  row.appendChild(createActionButton(pen, () => showModal("Edit", note)));
  row.appendChild(createActionButton(trash, () => showModal("Delete", note)));
  return row;
}

export function createAddButton() {
  const addButton = document.querySelector(".bi-file-earmark-plus");
  addButton.addEventListener("click", () => showModal("Add"));
}

function updateNotesTable(notes) {
  const tableBody = document.querySelector(".note-list");
  tableBody.innerHTML = "";
  notes.forEach((note, index) => {
    if (showArchivedNotes === note.archived) {
      const row = createNoteRow(note, index);
      tableBody.appendChild(row);
    }
  });
}

export function addNotesTypeChanging() {
  const activeNotesSection = document.querySelector(".active-notes-option>a");
  const archiveNotesSection = document.querySelector(
    ".archived-notes-option>a"
  );

  activeNotesSection.addEventListener("click", () => {
    showArchivedNotes = selectActiveNotes(
      activeNotesSection,
      archiveNotesSection
    );
    updateNotesTable(getNotes());
  });

  archiveNotesSection.addEventListener("click", () => {
    showArchivedNotes = selectArchivedNotes(
      activeNotesSection,
      archiveNotesSection
    );
    updateNotesTable(getNotes());
  });
}

export function updateScreenData() {
  try {
    updateNotesTable(getNotes());
    updateCategoriesTable(getNotes());
  } catch (error) {
    console.error("An error occurred while updating the screen data:", error);
  }
}
