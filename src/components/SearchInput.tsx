import type { Tags } from "@/types"
import ReactSelect from "react-select/creatable"

type NoteSubmit = {
 
  availableTags?: Tags[];
  tags: Tags[];
  setTags: React.Dispatch<React.SetStateAction<Tags[]>>
}

export default function CreateInput({  availableTags, tags, setTags }: NoteSubmit) {



  return (
    <ReactSelect
      value={tags.map(tag => {
        return { label: tag.name, value: tag.id }
      })}
      onChange={(tags) => {
        setTags(tags.map(tag => {
          return { id: tag.value, name: tag.label }
        }))
      }}
      
      options={availableTags?.map((tag) => {
        return { label: tag.name, value: tag.id }
      })}

      isClearable
      required
      id="note-tag"
      isMulti
      name="tags"
      className="basic-multi-select"
      classNamePrefix="select"
      styles={{
        control: (base, state) => ({
          ...base,
          backgroundColor: "black",
          color: "white",
          borderColor: state.isFocused ? "#444445" : "none",
          borderWidth: "1px",
          width: "200px",
          borderRadius: "0.5rem",

          padding: "2px 6px",

        }),
        valueContainer: (base) => ({
          ...base,
          flexWrap: "wrap", // ✅ allow tags to wrap to new line
          gap: "4px",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "black",
          borderRadius: "0.5rem",
          marginTop: "4px",
         
          boxShadow:
            "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)",
          color: "white",
        }),
        option: (base, { isFocused, isSelected }) => ({
          ...base,
          backgroundColor: isSelected ? "#6366f1" : isFocused ? "#1e293b" : "black",
          color: "white",
          ":active": { backgroundColor: "#4f46e5" },
        }),
        multiValue: (base) => ({
          ...base,
          backgroundColor: "#1e293b",
          borderRadius: "0.375rem",
          padding: "0 2px",
        }),
        multiValueLabel: (base) => ({
          ...base,
          color: "white",
        }),
        multiValueRemove: (base) => ({
          ...base,
          color: "white",
          borderRadius: "0.375rem",
          ":hover": {
            backgroundColor: "#ef4444",
            color: "black",
          },
        }),
        input: (base) => ({
          ...base,
          color: "white",
          margin: 0,
          padding: 0,
        }),
        singleValue: (base) => ({
          ...base,
          color: "white",
        }),
        placeholder: (base) => ({
          ...base,
          color: "#9ca3af",
        }),
      }}
    />
  )
}
