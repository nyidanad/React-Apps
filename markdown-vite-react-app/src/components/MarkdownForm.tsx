import { Button, Col, Row, Stack } from "react-bootstrap"
import { useNote } from "../pages/ShowMarkdown"
import { useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"

type MarkdownFormProps = {
  onDeleteNote: (id: string) => void
}

function MarkdownForm({ onDeleteNote }: MarkdownFormProps) {
  const navigate = useNavigate();
  const note = useNote()

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h2>{note.title}</h2>
          { note.tags && note.tags.length > 0 ? (
                note.tags.map((tag, index) => (
                  <span key={index} className="badge text-bg-primary" style={{ fontSize: "0.65rem", marginRight: "0.15rem" }}>{tag.label}</span>
                ))
              ) : null
            }
        </Col>
        <Col xs="auto">
          <Stack className="float-end" gap={2} direction="horizontal">
            <Button className="align-baseline" variant="outline-warning" onClick={() => navigate(`/${note.id}/edit`)}>Edit</Button>
            <Button variant="outline-danger" onClick={() => {onDeleteNote(note.id)}}>Delete</Button>
            <Button variant="outline-secondary" onClick={() => {navigate("/")}}>Back</Button>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.text}</ReactMarkdown>
    </>
  )
}

export default MarkdownForm