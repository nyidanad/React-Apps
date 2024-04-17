import { Button, Col, Row } from "react-bootstrap";
import markdownData from "../data/files.json"
import Markdown from "../components/Markdown";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className='d-flex justify-content-between align-items-baseline mb-4'>
        <h3 className='mt-3'>My Files</h3>
        <div className="input-group" style={{ maxWidth: '50%' }}>
          <span className="input-group-text" id="addon-wrapping">🔎</span>
          <input type="text" className="form-control" placeholder="Search ..." aria-label="Seach" aria-describedby="addon-wrapping" />
        </div>
        <Button variant="primary" onClick={() => navigate('/add')}>Create File</Button>
      </div>
      <Row xs={1} md={3} lg={4} className='g-3'>
        {markdownData.map(item => (
          <Col key={item.id}><Markdown {...item} /></Col>
        ))}
      </Row>
    </>
  )
}

export default Home