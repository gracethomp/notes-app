import { initialNotes } from "./mockup.js";

let notes = [...initialNotes];

export function addNote(newNote) {
  notes = [...notes, newNote];
}

export function archiveNote(note) {
  notes.map((existingNote) => {
    if (existingNote === note) {
      note.archived = !note.archived;
    }
  });
}

export function editNote(note, editedNote) {
  notes.map((existingNote) => {
    if (note === existingNote) {
      note.name = editedNote.name;
      note.noteCategory = editedNote.noteCategory;
      note.noteContent = editedNote.noteContent;
      note.datesMentioned = editedNote.datesMentioned;
    }
  });
}

export function deleteNote(note) {
  notes = notes.filter((existingNote) => existingNote !== note);
}

export function getNotes() {
  return [...notes];
}
