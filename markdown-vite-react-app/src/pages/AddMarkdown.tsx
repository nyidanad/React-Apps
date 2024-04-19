import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import CreatableSelect from 'react-select/creatable';
import { useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import { NoteData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid"

type AddMarkdownProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

function AddMarkdown({ onSubmit, onAddTag, availableTags }: AddMarkdownProps) {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    onSubmit({
      title: titleRef.current!.value,    // nem lehet null, mivel 'required'
      text: bodyRef.current!.value,  // nem lehet null, mivel 'required'
      tags: selectedTags,
    })

    navigate("/");
  }

  return (
    <div>
      <h3 className="my-4">Add File</h3>
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control ref={titleRef} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Tags</Form.Label>
                <CreatableSelect
                  isMulti
                  isClearable
                  closeMenuOnSelect={false}
                  name="tags"
                  options={availableTags.map(tag => { return { label: tag.label, value: tag.id } })}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={selectedTags.map(tag => {return { label: tag.label, value: tag.id }})}
                  onChange={tags => {
                    setSelectedTags(tags.map(tag => {
                      return { label: tag.label, id: tag.value }
                    }))
                  }}
                  onCreateOption = {label => {
                    const newTag = { id: uuidV4(), label }
                    onAddTag(newTag)
                    setSelectedTags(prev => [...prev, newTag])
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="markdown">
            <Form.Label>Body</Form.Label>
            <Form.Control ref={bodyRef} required as="textarea" style={{ minHeight: '25rem' }}/>
          </Form.Group>
        </Stack>
        <Stack direction="horizontal" gap={2} className="justify-content-end mt-3">
          <Button type="submit" variant="success" className="marginRight: 3">Add</Button>
          <Button type="button" variant="outline-secondary" onClick={() => navigate("/")}>Cancel</Button>
        </Stack>
      </Form>
    </div>
  )
}

export default AddMarkdown