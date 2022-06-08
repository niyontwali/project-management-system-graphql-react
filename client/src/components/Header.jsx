import { Link } from "react-router-dom"

const Header = () => {
  return (
    <nav>
      <div className="navbar bg-light mb-4 p-0">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Project Mgmt
          </Link>
        </div>
      </div>      
    </nav>
  )
}

export default Header