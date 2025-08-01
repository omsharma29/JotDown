import { Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import NewNotes from "./pages/NewNotes"
import type { NoteData, RawNoteData, Tags } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";


function App() {
  const [notes, setNotes] = useLocalStorage<RawNoteData[]>("NOTES", []);
    const [tags, setTags] = useLocalStorage<Tags[]>("TAGS", []);

    const notesWithTags = useMemo(()=>{
      return notes.map(note => {
        return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))} as RawNoteData & {tags: Tags[]}
      })
      
    },[notes, tags])

    function handleSubmitNotes({tags, ...data} : NoteData){
      setNotes(prev => {
         return [
           ...prev,
           {
             ...data,
             id: uuidV4(),
             tagIds: tags.map(tag => String(tag.id)) // Ensure tagIds is string[]
           }
         ];
      });
    }

    function addTag(tag: Tags) {
      setTags(prev => {
        return [...prev, tag];
      });
    }

  return (
    <Routes>
      <Route path="/" element={<HomePage availableTags={tags}/>}/>
      <Route path="/new" element={<NewNotes onSubmit={handleSubmitNotes} onAddTag={addTag} availableTags={tags}/>}/>
      <Route path="/:id">
      <Route index element={<div>Note Details</div>}/>
      <Route path="edit" element={<div>Edit Note</div>}/>
      </Route>
      <Route path="*" element={<Navigate  to={'/'}/>}/>
    </Routes>
  )
}

export default App