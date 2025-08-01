import SearchInput from "@/components/SearchInput"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { RawIdNote, Tags } from "@/types"
import { useMemo, useState } from "react"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"

type NoteProps = {
  availableTags?: Tags[];
  notes: RawIdNote[];
}

function HomePage({ availableTags, notes }: NoteProps) {
  const [tags, setTags] = useState<Tags[]>([])
  const [SearchTitle, setSearchTitle] = useState("")

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (SearchTitle === "" || note.title.toLowerCase().includes(SearchTitle.toLowerCase())) &&
        (tags.length === 0 || tags.every(tag => note.tagIds.some(noteTagId => noteTagId === tag.id)))
      )
    })
  }, [SearchTitle, tags, notes])

  return (
    <div className="overflow-x-hidden"> {/* ✅ prevent horizontal scroll */}
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="font-extrabold text-2xl">Notes</h1>
        <div>
          <Link to="/new">
            <Button variant="outline" className="text-black">Create</Button>
          </Link>
        </div>
      </div>

      {/* Search section */}
<div className="flex flex-col sm:flex-row justify-between items-start gap-4 px-4 sm:px-10 lg:px-20 w-full">
  {/* Search Notes (Left) */}
  <div className="flex flex-col gap-2 w-full sm:w-auto flex-1">
    <Label>Search Notes</Label>
    <Input
      placeholder="Search notes..."
      className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px] max-w-full"
      value={SearchTitle}
      onChange={(e) => setSearchTitle(e.target.value)}
    />
  </div>

  {/* Search by Tags (Right) */}
  <div className="flex flex-col gap-2 w-full sm:w-auto flex-1 sm:items-end">
    <Label>Search by tags</Label>
    <SearchInput
      tags={tags}
      setTags={setTags}
      availableTags={availableTags}
    />
  </div>
</div>


      {/* Notes Grid */}
      <div className="card px-4 sm:px-19 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note: RawIdNote) => (
          <Link to={`/${note.id}`} key={note.id}>
            <Card className="bg-black text-white hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardFooter className="flex flex-wrap gap-3">
                {note.tagIds.map((tagId) => {
                  const tag = availableTags?.find(t => t.id === tagId)
                  return tag ? (
                    <span
                      key={tag.id}
                      className="bg-gray-700 text-white px-2 py-1 rounded"
                    >
                      {tag.name}
                    </span>
                  ) : null
                })}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage
