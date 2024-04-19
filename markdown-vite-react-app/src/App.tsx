import { useMemo } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AddMarkdown from "./pages/AddMarkdown"
import ShowMarkdown from "./pages/ShowMarkdown"
import EditMarkdown from "./pages/EditMarkdown"
import useLocalStorage from "./hooks/useLocalStorage"
import { Container } from "react-bootstrap"
import { v4 as uuidV4 } from "uuid"


export type Note = {
  id: string,
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  text: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  text: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}


function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  // CACHE NOTES
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const noteWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  // CREATE NOTE
  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }]
    })
  } 

  // ADD TAG
  const onAddTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }


  return (
    <Container className="mb-4">  
      <Routes>
        <Route path="/" element={<Home availableTags={tags} notes={noteWithTags} />}/>
        <Route path="/add" element={<AddMarkdown onSubmit={onCreateNote} onAddTag={onAddTag} availableTags={tags} />}/>
        <Route path="/:id">
          <Route index element={<ShowMarkdown />} />
          <Route path="edit" element={<EditMarkdown />} />
        </Route>
        <Route path="*" element={<Home availableTags={tags} notes={noteWithTags} />}/>
      </Routes>
    </Container>
  )
}

export default App
