export interface Note {
  id: string;
  user_id: string;
  date: string;
  content: string;
  sleep_quality?: number | null;
  created_at: string;
  updated_at: string;
}

export interface NotesApiResponse {
  note?: Note;
  error?: string;
}

export interface NoteListResponse {
  notes?: Note[];
  error?: string;
}

export interface UserApiResponse {
  email?: string;
  error?: string;
}