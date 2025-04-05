"use client"

import { useState } from "react";
import styles from "./SideBar.module.scss"

interface Note {
  date: string;
  content: string;
}

const initialNotes: Note[] = [
  { date: "2025-04-04", content: "Today I started working on the productivity app..." },
  { date: "2025-03-31", content: "Finalized the authentication flow..." },
  // Add all other dates with empty content
  ...Array(20).fill({ date: "", content: "" }).map((_, i) => ({
    date: `2025-03-${30 - i}`,
    content: ""
  }))
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const SideBar: React.FC = () => {
  const [notes] = useState<Note[]>(initialNotes);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <div className={styles.sidebar__notesList}>
          {notes.map(note => (
            <div
              key={note.date}
              className={styles.sidebar__note}
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