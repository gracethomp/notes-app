import { selectActiveNotes, selectArchivedNotes } from "./noteTypes.js";
import { updateCategoriesTable } from "./categories.js";
import { getNotes } from "./dataProcessing.js";
import { updateNotesTable } from "./rendering.js";
import { showModal } from "./modal.js";

const addButton = document.querySelector(".bi-file-earmark-plus");

addButton.addEventListener("click", () => showModal("Add"));

const activeNotesSection = document.querySelector(".active-notes-option>a");
const archiveNotesSection = document.querySelector(".archived-notes-option>a");

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

updateNotesTable(getNotes());
updateCategoriesTable(getNotes());
