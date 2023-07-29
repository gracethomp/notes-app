import { updateCategoriesTable } from "./categories.js";
import { getNotes } from "./dataProcessing.js";
import { updateNotesTable, addNotesTypeChanging, createAddButton } from "./rendering.js";

createAddButton();

addNotesTypeChanging();

updateNotesTable(getNotes());
updateCategoriesTable(getNotes());
