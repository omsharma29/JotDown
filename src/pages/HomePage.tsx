import SearchInput from "@/components/SearchInput"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Tags } from "@/types"
import { useState } from "react"
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type NoteProps = {
  availableTags?: Tags[];
}

function HomePage({ availableTags }: NoteProps) {
  const [tags, setTags] = useState<Tags[]>([])
  const [SearchTitle, setSearchTitle] = useState("")

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-extrabold text-4xl">Notes</h1>
          <div>
            <Button variant="outline" className="text-black">Create</Button>
            <Button >Edit Note</Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-between px-10 py-5">
          <div className="input1 flex flex-col gap-2">
            <Label>Search Notes</Label>
            <Input
              placeholder="Search notes..."
              className="w-[600px]"
              value={SearchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}

            />
          </div>
          <div className="input2 flex flex-col gap-2">
            <Label>Search by tags</Label>
            <SearchInput tags={tags} setTags={setTags} availableTags={availableTags} />
          </div>
        </div>
        <div className="card px-6 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-black text-white hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
            </CardHeader>
            <CardFooter>
              <p>Tags</p>
            </CardFooter>
          </Card>



          {/* Add more cards */}
        </div>

      </div>
    </>
  )
}

export default HomePage