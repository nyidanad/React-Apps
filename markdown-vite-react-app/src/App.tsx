import { useMemo } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import AddMarkdown from "./pages/AddMarkdown"
import { ShowMarkdown } from "./pages/ShowMarkdown"
import EditMarkdown from "./pages/EditMarkdown"
import MarkdownForm from "./components/MarkdownForm"
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

  // UPDATE NOTE
  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        }
        else {
          return note
        }
      })
    })
  }

  // DELETE NOTE
  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id);
    })
  }

  // ADD TAG
  const onAddTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  // EDIT TAG
  const onUpdateTag = (id: string, label: string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        }
        else {
          return tag
        }
      })
    })
  }

  // DELETE TAG
  const onDeleteTag = (id: string) => {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id);
    })
  }


  return (
    <Container className="my-4">  
      <Routes>
        <Route path="/" element={<Home availableTags={tags} notes={noteWithTags} onUpdateTag={onUpdateTag} onDeleteTag={onDeleteTag} />}/>
        <Route path="/add" element={<AddMarkdown onSubmit={onCreateNote} onAddTag={onAddTag} availableTags={tags} />}/>
        <Route path="/:id" element={<ShowMarkdown notes={noteWithTags} />}>
          <Route index element={<MarkdownForm onDeleteNote={onDeleteNote} />} />
          <Route path="edit" element={<EditMarkdown onSubmit={onUpdateNote} onAddTag={onAddTag} availableTags={tags} />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
    </Container>
  )
}

export default App
