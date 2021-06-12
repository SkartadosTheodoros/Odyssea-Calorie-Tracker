import "./Login.css"
import { useState } from 'react';
import LoginForm from "./LoginForm"
import ErrorModal from "../UI/ErrorModal";

const Login = (props) => {
    const [error, setError] = useState();

    const onLoginHandler = credentials => {
        if (credentials.username.trim().length === 0) {
            setError("Username is mandatory")
            return false;
        }
        else if (credentials.password.trim().length === 0) {
            setError("Password is mandatory")
            return false;
        }

        props.onLogin(credentials)
        return true;
    }

    const onDismissHandler = () => {
        setError(null)
    }

    return (
        <div>
            {error && <ErrorModal title="Error" message={error} onDismiss={onDismissHandler}></ErrorModal>}
            <div className="login">
                <LoginForm onLogin={onLoginHandler} />
            </div>
        </div>

    )

}

export default Login