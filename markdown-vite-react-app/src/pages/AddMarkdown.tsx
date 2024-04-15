import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import CreatableSelect from 'react-select/creatable';
import tags from "../data/tags.json";
import { useNavigate } from "react-router-dom";

function AddMarkdown() {
  const navigate = useNavigate();

  return (
    <div>
      <h3 className="my-4">Add File</h3>
      <Form>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control required />
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
                  options={tags}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="markdown">
            <Form.Label>Body</Form.Label>
            <Form.Control required as="textarea" rows={15} />
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