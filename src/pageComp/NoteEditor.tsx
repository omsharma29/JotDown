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
}& Partial<NoteData>

function NoteEditor(
  { onSubmit, onAddTag, availableTags, title = "", content = "", tags = [] }: NoteSubmit
) {
  const titleRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tags[]>(tags) // ✅ renamed
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,
      content: contentRef.current!.value,
      tags: selectedTags,  // ✅ use selectedTags
    })

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
            defaultValue={title}   // ✅ prefill for edit
            className="sm:w-[600px] max-w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="min-w-[250px]">
          <Label htmlFor="note-tag" className="block mb-2 text-sm font-medium">
            Note Tag
          </Label>
          <CreateInput
            onAddTag={onAddTag}
            availableTags={availableTags}
            tags={selectedTags}      // ✅ pass selectedTags
            setTags={setSelectedTags}
          />
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
          defaultValue={content}   // ✅ prefill for edit
          className="h-80 w-full rounded-2xl border mr-0.5 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />
      </div>

      <div className="m-3 flex justify-end gap-2">
        <Button variant="secondary" className="ml-2 hover:scale-110">
          Save
        </Button>
        <Link to={".."}>
          <Button className="hover:bg-gray-200 hover:text-black">Cancel</Button>
        </Link>
      </div>
    </form>
  )
}

export default NoteEditor
