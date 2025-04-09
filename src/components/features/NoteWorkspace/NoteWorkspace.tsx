"use client"

import Button from "@/components/ui/Button/Button";
import { Note } from "@/types";
import styles from "./NoteWorkspace.module.scss";
import SleepQualitySelector from "../SleepQualitySelector/SleepQualitySelector";

interface NoteWorkspaceProps {
  selectedNote: Note | null;
  updateNote: (noteData: Note) => void;
  onCreateNote: () => void;
  onDataChange: <K extends keyof Note>(key: K, value: Note[K]) => void;
}

const NoteWorkspace: React.FC<NoteWorkspaceProps> = ({
  selectedNote,
  updateNote,
  onCreateNote,
  onDataChange
}) => {
  return (
    <div className={styles.noteWorkspace}>
      {selectedNote ? (
        <>
          <SleepQualitySelector
            value={selectedNote?.sleep_quality ?? null}
            onChange={(value) => onDataChange("sleep_quality", value)}
          />
          <textarea
            value={selectedNote?.content}
            onChange={(e) => onDataChange("content", e.target.value)}
            placeholder="Start writing your note..."
            className={styles.noteWorkspace__noteEditor}
          />
          <Button 
            label="Save Changes" 
            onClick={() => updateNote(selectedNote)}
            className={styles.noteWorkspace__createButton}
          />
        </> 
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