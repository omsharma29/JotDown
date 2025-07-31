import NoteEditor from "@/pageComp/NoteEditor"
import type { NoteData, Tags } from "@/types";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag : (tag : Tags) => void;
  availableTags?: Tags[];
}

function NewNotes({onSubmit , onAddTag, availableTags} : NewNoteProps) {
  return (
    <>
    <h1 className="text-center p-6 m-4 text-5xl font-extrabold ">New Notes</h1>
    <NoteEditor onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </>
  )
}

export default NewNotes