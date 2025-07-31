import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Textarea } from "@/components/ui/textarea"
import CreateInput from "@/components/ui/CreateInput"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import type { NoteData, Tags } from "@/types"

type NoteSubmit = { 
  onSubmit : (data : NoteData)=> void
  onAddTag : (tag : Tags) => void;
  availableTags?: Tags[];
}

function NoteEditor( {onSubmit, onAddTag,availableTags }  : NoteSubmit ) {
  const titleRef =useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
   const [tags, setTags] = useState<Tags[]>([])
   const navigate = useNavigate();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      content: contentRef.current!.value ,
      tags: tags,})

      navigate("..")
  }
  return (
    <form onSubmit={handleSubmit} className="items-center">
      <div className="flex flex-row gap-5 flex-wrap sm:justify-between">

        <div>
          <Label htmlFor="note-title" className="block mb-2 text-sm font-medium">
            Title
          </Label>
          <Input
            id="note-title"
            ref={titleRef}
            type="text"
            placeholder="Enter note title"
            required
            className="sm:w-[600px] max-w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />

        </div>


        <div className="min-w-[250px]">
          <Label htmlFor="note-tag" className="block mb-2 text-sm font-medium">
            Note Tag
          </Label>
          <CreateInput onAddTag={onAddTag} availableTags={availableTags} tags={tags} setTags={setTags} />
        </div>
      </div>


      <div className="mt-6">
        <Label htmlFor="note-content" className="block mb-2 text-sm font-medium">
          Content
        </Label>
        <Textarea
          id="note-content"
          ref={contentRef}
          name="note-content"
          placeholder="Write your note here..."
          required
          className="h-80 w-full rounded-2xl border mr-0.5 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />
      </div>
      <div className="m-3 flex justify-end gap-2">
      <Button variant="secondary" className="ml-2 hover:scale-110">Create</Button>
      <Link to={".."}>
      <Button className="hover:bg-gray-200 hover:text-black">Cancel</Button>
      </Link>
      </div>
    </form>
  )
}

export default NoteEditor
