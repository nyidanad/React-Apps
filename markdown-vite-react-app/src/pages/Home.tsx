import { Button, Col, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import Markdown from "../components/Markdown";
import { useMemo, useState } from "react";
import { Tag } from "../App";
import EditTagModal from "../components/EditTagModal";

type SimplifiedNote = {
  id: string
  title: string
  text: string
  tags: Tag[]
}

type HomeProps = {
  availableTags: Tag[]
  notes: SimplifiedNote[]
  onUpdateTag: (id: string, label: string) => void
  onDeleteTag: (id: string) => void
}

function Home({ availableTags, notes, onUpdateTag, onDeleteTag }: HomeProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [showModal, setShowModal] = useState(false)

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) 
      && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
    })
  }, [title, selectedTags, notes])

  return (
    <>
      <Row className='d-flex justify-content-between align-items-center mb-4'>
        <Col md={2} >
          <img src="src/assets/markdown-logo.png" alt="markdown-logo.png" style={{ width: '5rem' }} />
        </Col>
        <Col>
          <div className="input-group">
            <span className="input-group-text" id="addon-wrapping">🔎</span>
            <input 
              className="form-control"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Search..."
              aria-label="Seach"
              aria-describedby="addon-wrapping" />
          </div>
        </Col>
        <Col>
          <ReactSelect
            isMulti
            isClearable
            closeMenuOnSelect={false}
            name="tags"
            placeholder="Select Tags..."
            options={availableTags.map(tag => { return { label: tag.label, value: tag.id } })}
            className="basic-multi-select w-100 float-end"
            classNamePrefix="select"
            value={selectedTags.map(tag => {return { label: tag.label, value: tag.id }})}
            onChange={tags => {
              setSelectedTags(tags.map(tag => {
                return { label: tag.label, id: tag.value }
              }))
            }}
          />
        </Col>
        <Col xs="auto" md={3}>
          <Stack className="float-end" gap={2} direction="horizontal">
            <Button className="align-baseline" variant="primary" onClick={() => navigate('/add')}>Create File</Button>
            <Button variant="outline-secondary" onClick={() => setShowModal(true)}>Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Row className="mb-4">
        
      </Row>
      <Row className="mb-3">
        <h3>My Files</h3>
      </Row>
      <Row xs={1} sm={2} md={3} lg={4} className='g-3'>
        {filteredNotes.map(note => (
          <Col key={note.id}><Markdown id={note.id} title={note.title} tags={note.tags} text={note.text} /></Col>
        ))}
      </Row>
      <EditTagModal availableTags={availableTags} show={showModal} handleModal={() => setShowModal(false)} onUpdateTag={onUpdateTag} onDeleteTag={onDeleteTag}  />
    </>
  )
}

export default Home