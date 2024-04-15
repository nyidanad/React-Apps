import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AddMarkdown from "./pages/AddMarkdown"
import ShowMarkdown from "./pages/ShowMarkdown"
import EditMarkdown from "./pages/EditMarkdown"
import { Container } from "react-bootstrap"

function App() {
  return (
    <Container className="mb-4">  
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/add" element={<AddMarkdown />}/>
        <Route path="/:id">
          <Route index element={<ShowMarkdown />} />
          <Route path="edit" element={<EditMarkdown />} />
        </Route>
        <Route path="*" element={<Home />}/>
      </Routes>
    </Container>
  )
}

export default App
