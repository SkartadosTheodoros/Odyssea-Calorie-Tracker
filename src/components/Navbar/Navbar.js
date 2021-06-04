import "./Navbar.css"

const Navbar = () => {
    return (
        <header>
            <nav className="navbar-menu">
                <h1 className="navbar-logo">Odyssea Calorie Tracker</h1>

                <ul className="navbar-links">
                    <li><a href="#">Log In </a></li>
                    <li><a href="#">Sign Up</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar