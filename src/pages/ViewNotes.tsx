import { Button } from "@/components/ui/button";
import type { RawIdNote, Tags } from "@/types";
import {  useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom"


type NoteProps = {
    availableTags?: Tags[];
    notes: RawIdNote[]; // Adjust type as needed
    setNotes: React.Dispatch<React.SetStateAction<RawIdNote[]>>
    setTags : React.Dispatch<React.SetStateAction<Tags[]>>
}



function ViewNotes({ availableTags, notes, setNotes, setTags }: NoteProps) {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const showNotes = useMemo(() => {
        return notes.filter(note => note.id === id);
    }, [notes, id]);
    function deleteNote(id: string) {
        setNotes(prev => {
            return prev.filter(note => note.id !== id);
        });
        setTags(prev => {
            return prev.filter(tag => !showNotes[0].tagIds.includes(tag.id));
        });
        
        navigate("..")
    }

    return (
        <>
            <div className="page">
                {showNotes.map(note => (
                    <div className="flex flex-col gap-6" key={note.id}>
                        <div className="top flex justify-between">
                            <div className="title text-4xl font-extrabold">{note.title}</div>
                            <div className="Button flex gap-1.5">
                                <Button variant="secondary">Edit</Button>
                                <Button onClick={()=> deleteNote(note.id)} className="hover:bg-white hover:text-black">Delete</Button>
                            </div>
                        </div>
                        <div className="main">
                            <div className="content">{note.content}</div>
                        </div>
                        <div className="footer flex flex-col gap-1 justify-start">
                            <p>Tags</p>
                            <div className="tags flex flex-row gap-4">{note.tagIds.map(
                                (tagId) => {
                                    const tag = availableTags?.find(t => t.id === tagId)
                                    return tag ? (
                                        <span key={tag.id} className="bg-gray-700 text-white px-2 py-1 rounded ">
                                            {tag.name}
                                        </span>
                                    ) : ""
                                }
                            )}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ViewNotes