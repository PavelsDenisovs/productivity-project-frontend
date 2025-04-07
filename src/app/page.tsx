"use client"

import NavBar from "@/components/features/NavBar/NavBar";
import NoteWorkspace from "@/components/features/NoteWorkspace/NoteWorkspace";
import SideBar from "@/components/features/SideBar/SideBar";
import { Note } from "@/types";
import { useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [selectedNote, SetSelectedNote] = useState<Note | null>(null)

  const handleCreateNote = () => {
    const today = new Date().toISOString().split('T')[0]
    const newNote = {
      date: today,
      content: ""
    }

    if (!notes.some(note => note.date === today)) {
      setNotes([newNote, ...notes])
    }
    SetSelectedNote(newNote)
  }

  const handleContentChange = (content: string) => {
    if (!selectedNote) return

    const updatedNote = { ...selectedNote, content }
    setNotes(notes.map(note =>
      note.date === selectedNote.date ? updatedNote : note
    ))
  }

  return (
    <div className="app-container">
      <NavBar />
      <div className="main-content">
        <SideBar
          notes={notes}
          onSelectNote={SetSelectedNote}
          selectedNote={selectedNote}
        />
        <NoteWorkspace
          selectedNote={selectedNote}
          onCreateNote={handleCreateNote}
          onContentChange={handleContentChange}
        />
      </div>
    </div>
  )
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