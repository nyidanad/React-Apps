import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
      <div className="container">
        <img src="src/assets/workout-logo.png" style={{ width: '50px', marginRight: '25px' }} />
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar