import NoteEditor from "@/pageComp/NoteEditor"
import type { NoteData, RawIdNote, Tags } from "@/types"
import { useParams } from "react-router-dom";

type EditNoteProps = {
  notes: RawIdNote[];
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tags) => void;
  availableTags?: Tags[];
}

function EditNote({ notes, onSubmit, onAddTag, availableTags }: EditNoteProps) {
  const { id } = useParams<{ id: string }>();   // ✅ get noteId from params
  const note = notes.find(n => n.id === id);    // ✅ find the note

  if (!note) {
    return <p>Note not found</p>;               // fallback if note missing
  }
  const noteTags = availableTags?.filter(tag => note.tagIds.includes(tag.id)) || []

  return (
    <div>
      <NoteEditor
        title = {note.title}
        content = {note.content} 
        tags = {noteTags}                            // pass the single note, not whole array
        onSubmit={(data) => onSubmit(note.id,  data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  )
}

export default EditNote
