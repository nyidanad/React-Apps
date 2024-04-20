import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Tag } from "../App";
import { FaTrashAlt } from "react-icons/fa";

type EditTagModalProps = {
  availableTags: Tag[]
  show: boolean
  handleModal: () => void
  onUpdateTag: (id: string, label: string) => void
  onDeleteTag: (id: string) => void
}

function EditTagModal({ availableTags, show, handleModal, onUpdateTag, onDeleteTag }: EditTagModalProps) {
  return (
    <Modal show={show} onHide={handleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map(tag => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control type="text" value={tag.label} onChange={(e) => onUpdateTag(tag.id, e.target.value)} />
                </Col>
                <Col xs="auto">
                  <Button variant="outline-danger" onClick={() => onDeleteTag(tag.id)}>
                    <FaTrashAlt />
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditTagModal