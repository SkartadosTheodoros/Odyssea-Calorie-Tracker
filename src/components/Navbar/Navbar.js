import Modal from "../UI/Modal"
import "./Navbar.css"

const Navbar = (props) => {
    return (
        <header>
            <nav className="navbar-menu">
                <h1 className="navbar-logo">Odyssea Calorie Tracker</h1>

                {!props.isLoggedIn
                    ? <ul className="navbar-links">
                        <li><a href="#" onClick={props.login}>Log In</a></li>
                        <li><a href="#" onClick={props.signup}>Sign Up</a></li>
                    </ul>
                    : <ul className="navbar-links">
                        <li><a href="#" onClick={props.logout}>Log Out</a></li>
                    </ul>
                }

            </nav>
        </header>
    )
}

export default Navbar