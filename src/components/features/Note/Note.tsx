"use client"

import styles from "./Note.module.scss";
import Button from "@/components/ui/Button/Button";
import Input from "@/components/ui/Input/Input";
import { useEffect, useState } from "react"

interface Note {
  id: number;
  content: string;
}

const LOCAL_STORAGE_KEY = "notes-app-data";

const Note: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    setIsClient(true)
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) setNotes(JSON.parse(saved))
    } catch (error) {
      console.error("Failed to load notes:", error);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes))
    }
  }, [notes, isClient])

  const handleCreate = () => {
    const newNote = {
      id: Date.now(),
      content: `New note ${notes.length + 1}`
    }
    setNotes([...notes, newNote])
  }

  const handleUpdate = (id: number, newContent: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, content: newContent } : note
    ))
  }

  const handleDelete = (id: number) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  return (
    <div>
      {notes.map((note) => (
        <div className={styles.note} key={note.id}>
          <Input
            className={styles.note__input}
            onChange={(e) => handleUpdate(note.id, e.target.value)} 
            value={note.content}
          />
          <Button 
            label="Delete"
            onClick={() => handleDelete(note.id)}
          />
        </div>
      ))}

      <div className={styles.note__create_btn}>
        <Button
          label="Create"
          onClick={handleCreate}
        />
      </div>
    </div>
  );
}

export default Note;