function changeHeading(heading) {
  const h2 = document.querySelector(".notes-title");
  h2.innerText = heading;
}

export function selectActiveNotes(activeNotesSection, archiveNotesSection) {
  activeNotesSection.classList.remove("link-body-emphasis");
  activeNotesSection.classList.add("link-secondary");
  archiveNotesSection.classList.remove("link-secondary");
  archiveNotesSection.classList.add("link-body-emphasis");
  changeHeading("My Notes");
  return false;
}

export function selectArchivedNotes(activeNotesSection, archiveNotesSection) {
  archiveNotesSection.classList.add("link-secondary");
  archiveNotesSection.classList.remove("link-body-emphasis");
  activeNotesSection.classList.add("link-body-emphasis");
  activeNotesSection.classList.remove("link-secondary");
  changeHeading("Archive");
  return true;
}
