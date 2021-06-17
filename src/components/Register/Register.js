import "./Register.css"
import { useState } from 'react';
import RegisterForm from "./RegisterForm"
import Modal from "../UI/Modal";
import ErrorModal from "../UI/ErrorModal";

const Register = (props) => {
    const [error, setError] = useState();

    const onRegisterHandler = (newUser) => {
        if (newUser.username.trim().length === 0) {
            setError("Username is mandatory")
            return false;
        }
        else if (newUser.password.trim().length === 0) {
            setError("Password is mandatory")
            return false;
        }
        props.onRegister(newUser)
        return true;
    }

    const onDismissHandler = () => setError(null)
    const onCancelHandler = () => props.onCancel()

    return (
        <Modal>
            <div>
                {error && <ErrorModal title="Error" message={error} onDismiss={onDismissHandler}></ErrorModal>}
                {!error && <div className="register">
                    <RegisterForm onRegister={onRegisterHandler} onCancel={onCancelHandler} />
                </div>}
            </div>
        </Modal>
    )
}

export default Register