"use client"

import styles from "./SideBar.module.scss"
import { Note } from "@/types";

interface SideBarProps {
  notes: Note[] | undefined;
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  notes,
  selectedNote,
  onSelectNote
}) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__notesList}>
          {notes?.map(note => (
            <div
              key={note.date}
              className={`${styles.sidebar__note} ${
                selectedNote?.date === note.date ? styles.active : ''
              }`}
              onClick={() => onSelectNote(note)}
            >
              {note.date}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar;