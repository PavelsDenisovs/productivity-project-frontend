"use client"

import Button from "@/components/ui/Button/Button";
import { Note } from "@/types";
import { useEffect, useState } from "react";
import styles from "./NoteWorkspace.module.scss";

interface NoteWorkspaceProps {
  selectedNote: Note | null
  onCreateNote: () => void
  onContentChange: (content: string) => void
}

const NoteWorkspace: React.FC<NoteWorkspaceProps> = ({
  selectedNote,
  onCreateNote,
  onContentChange
}) => {
  const [localContent, setLocalContent] = useState("")

  useEffect(() => {
    setLocalContent(selectedNote?.content || "")
  }, [selectedNote])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setLocalContent(newContent)
    onContentChange(newContent)
  }

  return (
    <div className={styles.noteWorkspace}>
      {selectedNote ? (
        <textarea
          value={localContent}
          onChange={handleChange}
          placeholder="Start writing your note..."
          className={styles.noteWorkspace__noteEditor}
        />
      ) : (
        <Button 
          label="Create Today's Note" 
          onClick={onCreateNote}
          className={styles.noteWorkspace__createButton}
        />
      )}
    </div>
  );
}

export default NoteWorkspace;