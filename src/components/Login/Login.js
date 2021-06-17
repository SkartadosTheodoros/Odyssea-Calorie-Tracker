import "./Login.css"
import { useState } from 'react';
import LoginForm from "./LoginForm"
import Modal from "../UI/Modal";
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

    const onDismissHandler = () => setError(null)
    const onCancelHandler = () => props.onCancel()

    return (
        <Modal>
            <div>
                {error && <ErrorModal title="Error" message={error} onDismiss={onDismissHandler}></ErrorModal>}
                {!error && <div className="login">
                    <LoginForm onLogin={onLoginHandler} onCancel={onCancelHandler} />
                </div>}
            </div>
        </Modal>
    )
}

export default Login