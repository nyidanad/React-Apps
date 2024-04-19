import { Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { Tag } from "../App";
import styles from "../css/Markdown.module.css"

type MarkdownProps = {
  id: string,
  title: string,
  tags?: Tag[],
  text: string,
}

export function Markdown({ id, title, text, tags  }: MarkdownProps) {
  const navigate = useNavigate();

  return (
    <Card className={`h-100 ${styles.card}`} onClick={() => navigate(`/${id}`)}>
      <Card.Body>
        <Card.Title className='mb-4'>
          <div className='fs-4 text-align-center'>{title}</div>
          <div>
            { tags && tags.length > 0 ? (
                tags.map((tag, index) => (
                  <span key={index} className="badge text-bg-primary" style={{ fontSize: "0.65rem", marginRight: "0.15rem" }}>{tag.label}</span>
                ))
              ) : null
            }
          </div>
          <div className='fs-6 mt-2 text-muted'>
            {text.length > 100 ? <div>{text.slice(0, 97)}...</div> : <div>{text}</div> }
          </div>
        </Card.Title>
      </Card.Body>
    </Card>
  )
}

export default Markdown