export type NoteData = {
  title: string;
  content: string;
  tags : Tags[];
}

export type Note = {
  id: RawIdNote;
} & NoteData;

export type Tags = { 
  id: string;
  name: string;
}

export type RawIdNote = {
  id: string;
} & RawNoteData

export type RawNoteData = { 
  tagIds: string[];
  title: string;
  content: string;
}
