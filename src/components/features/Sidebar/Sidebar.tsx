"use client"

import styles from "./Sidebar.module.scss"
import { Note } from "@/types";

interface SidebarProps {
  notes: Note[] | undefined;
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  isSidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  notes,
  selectedNote,
  onSelectNote,
  isSidebarOpen,
}) => {
  return (
    <div className={`${styles.sidebar} ${!isSidebarOpen ? styles['sidebar--closed'] : ''}`}>
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

export default Sidebar;

