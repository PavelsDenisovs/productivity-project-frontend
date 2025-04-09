"use client"

import NavBar from "@/components/features/NavBar/NavBar";
import NoteWorkspace from "@/components/features/NoteWorkspace/NoteWorkspace";
import SideBar from "@/components/features/SideBar/SideBar";
import { Note, NoteListResponse, NotesApiResponse } from "@/types";
import { useEffect, useState } from "react";

interface apiResponse {
  email?: string;
  error?: string;
}

const updateNote = async (noteData: Note) => {
  console.log(noteData)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/${noteData?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(noteData),
    })

    const data: NotesApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to save changes")
    }

    console.log("Note saved.")
  } catch (err) {
    console.error(err)
  }
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState<Note[]>();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [prevSelectedNote, setPrevSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/current-user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
    
        const data: apiResponse = await response.json();
    
        if (!response.ok || !data.email) {
          throw new Error(`HTTP error! Status: ${response.status}` || "Fetching current user failed")
        }

        setEmail(data.email);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    const fetchNotes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })

        const data: NoteListResponse = await response.json()

        if (!response.ok || !data.notes) {
          throw new Error(data.error)
        }

        setNotes(data.notes)
        
        const today = new Date().toISOString().slice(0, 10);
        const todaysNote = data.notes.find(note => note.date === today);
        if (todaysNote) {
          setSelectedNote(todaysNote);
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchCurrentUser();
    fetchNotes();
  }, [])

  useEffect(() => {
    if (!selectedNote) return;

    if (!prevSelectedNote) {
      setPrevSelectedNote(selectedNote);
      return;
    }

    if (selectedNote.id !== prevSelectedNote.id) {
      updateNote(prevSelectedNote);
    }

    setPrevSelectedNote(selectedNote);
  }, [selectedNote, prevSelectedNote])

  const handleCreateNote = async () => {
    const today = new Date().toISOString()
    
    if (notes?.some(note => note.date === today)) {
      const existing = notes.find(note => note.date === today);
      setSelectedNote(existing || null);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ date: today }),
      });

      const data: NotesApiResponse = await response.json();

      if (!response.ok || !data.note) {
        throw new Error(data.error || "Failed to create note")
      }

      const updatedNotes = [data.note, ...(notes || [])];
      setNotes(updatedNotes);
      setSelectedNote(data.note);
    } catch (err) {
      console.error("Failed to create note:", err);
    }
  }
  
  const handleDataChange = <K extends keyof Note>(key: K, value: Note[K]) => {
    if (selectedNote) {
      const updated = { ...selectedNote, [key]: value };
      setSelectedNote(updated);
      setNotes(prev => 
        prev?.map(note => (note.id === updated.id ? updated : note)) || []
      );
    }
  }

  return (
    <div className="app-container">
      <NavBar
        email={email}
      />
      <div className="main-content">
        <SideBar
          notes={notes}
          onSelectNote={setSelectedNote}
          selectedNote={selectedNote}
        />
        <NoteWorkspace
          selectedNote={selectedNote}
          updateNote={updateNote}
          onCreateNote={handleCreateNote}
          onDataChange={handleDataChange}
        />
      </div>
    </div>
  )
}