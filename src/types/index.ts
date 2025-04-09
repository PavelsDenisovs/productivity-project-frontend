export interface Note {
  id: string;
  user_id: string;
  date: string;
  content: string;
  sleep_quality?: number | null;
  created_at: string;
  updated_at: string;
}