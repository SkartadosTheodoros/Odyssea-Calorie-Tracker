import "./LoginForm.css"
import { useState } from "react"
import Input from "../UI/Input"

const LoginForm = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const usernameChangedHandler = (event) => {
        let newValue = event.target.value
        setUsername(newValue)
    }

    const passwordChangedHandler = (event) => {
        let newValue = event.target.value
        setPassword(newValue)
    }

    const onSubmitHandler = event => {
        const credentials = {
            username: username,
            password: password
        }

        if (props.onLogin(credentials)) {
            setUsername("")
            setPassword("")
        }
    }

    const onCancelHandler = () => props.onCancel()

    return (
        <form className="login-form" onSubmit={onSubmitHandler}>
            <div className="login-input">
                <Input className="login-element"
                    labelText="Username"
                    input={{
                        id: "username",
                        type: "text",
                        label: "username",
                        value: username,
                        onChange: usernameChangedHandler
                    }} />

                <Input className="login-element"
                    labelText="Password"
                    input={{
                        id: "password",
                        type: "password",
                        label: "password",
                        value: password,
                        onChange: passwordChangedHandler
                    }} />

            </div>
            <div className="login-buttons">
                <button type="submit">Login</button>
                <button type="button" onClick={onCancelHandler}>Cancel</button>
            </div>
        </form>
    )
}

export default LoginForm