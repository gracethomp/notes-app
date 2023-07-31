import { initialNotes } from "./mockup.js";
import { changeTypesCounting } from "./categories.js";

let notes = [...initialNotes];

export function addNote(newNote) {
  notes = [...notes, newNote];
  changeTypesCounting(newNote.noteCategory, 1, 0);
  return [...notes];
}

export function archiveNote(note) {
  notes.map((existingNote) => {
    if (existingNote === note) {
      const oldNoteType = note.archived;
      note.archived = !note.archived;
      changeTypesCounting(note.noteCategory, oldNoteType ? 1 : -1, !oldNoteType ? 1 : -1);
    }
  });
  return [...notes];
}

export function editNote(note, editedNote) {
  notes.map((existingNote) => {
    if (note === existingNote) {
      const oldCategory = note.noteCategory;
      const archivedStatus = note.archived;
      changeTypesCounting(oldCategory, archivedStatus ? 0 : -1, !archivedStatus ? 0 : -1);
      note.name = editedNote.name;
      note.noteCategory = editedNote.noteCategory;
      note.noteContent = editedNote.noteContent;
      note.datesMentioned = editedNote.datesMentioned;
      changeTypesCounting(note.noteCategory, archivedStatus ? 0 : 1, !archivedStatus ? 0 : 1);
    }
  });
  return [...notes];
}

export function deleteNote(note) {
  notes = notes.filter((existingNote) => existingNote !== note);
  return [...notes];
}

export function getNotes() {
  return [...notes];
}
