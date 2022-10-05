import { Link } from "react-router-dom";

// Navbar, always displayed on top
export const NavBar = () => {

  return (
    <div className="navbar navbar-expand-lg navbar-light p-3 sticky-top">
      <div className="container-fluid">
        <h1 className="navbar-brand">Rick and Morty Database</h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Search Form</Link>
            <Link className="nav-link" to="characters">Characters</Link>
            <Link className="nav-link" to="episodes">Episodes</Link>
            <Link className="nav-link" to="locations">Locations</Link>
            <Link className="nav-link" to="watchlist">My Watchlist</Link>
          </div>
        </div>
      </div>
    </div>
  )
}