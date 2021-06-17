import "./Navbar.css"

const Navbar = (props) => {
    return (
        <header>
            <nav className="navbar-menu">
                <h1 className="navbar-logo">Odyssea Calorie Tracker</h1>

                {/* {!props.isLoggedIn
                    ? <ul className="navbar-links">
                        <li><a href="#" onClick={props.register}>Register</a></li>
                        <li><a href="#" onClick={props.login}>Log In</a></li>
                    </ul>
                    : <ul className="navbar-links">
                        <li><a href="#" onClick={props.logout}>Log Out</a></li>
                    </ul>
                } */}

                {!props.isLoggedIn
                    ? <div className="navbar-buttons">
                        <button onClick={props.register}>Register</button>
                        <button onClick={props.login}>Log In</button>
                    </div>
                    : <div className="navbar-buttons">
                        <button onClick={props.logout}>Log Out</button>
                    </div>
                }
            </nav>
        </header>
    )
}

export default Navbar