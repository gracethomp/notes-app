import { initialNotes } from "./mockup.js";
import { getCurrentTime, getDatesFromString } from "./dateUtils.js";

let notes = [...initialNotes];

export function getNotesDataFromForm(action) {
  const newNote = {};
  newNote.name = document.querySelector("#modalContent>input").value;
  newNote.noteCategory = document.querySelector("#modalContent>select").value;
  newNote.noteContent = document.querySelector("#modalContent>textarea").value;
  newNote.datesMentioned = getDatesFromString(
    newNote.name + newNote.noteContent
  );
  if (action === "Add") {
    newNote.timeOfCreation = getCurrentTime();
    newNote.archived = false;
  }
  return newNote;
}

export function addNote() {
  const newNote = getNotesDataFromForm("Add");
  notes = [...notes, newNote];
}

export function archiveNote(note) {
  notes.map((element) => {
    if (element === note) {
      note.archived = !note.archived;
    }
  });
}

export function editNote(note) {
  const editedNote = getNotesDataFromForm();
  notes.map((element) => {
    if (note === element) {
      note.name = editedNote.name;
      note.noteCategory = editedNote.noteCategory;
      note.noteContent = editedNote.noteContent;
      note.datesMentioned = editedNote.datesMentioned;
    }
  });
}

export function deleteNote(note) {
  notes = notes.filter((e) => e !== note);
}

export function getNotes() {
    return [...notes];
}
