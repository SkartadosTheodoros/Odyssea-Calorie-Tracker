import "./LoginForm.css"
import { useState } from "react"
import Input from "../UI/Input"

const LoginForm = (props) => {

    const [userUsername, setUserUsername] = useState("")
    const usernameChangedHandler = (event) => {
        let newValue = event.target.value
        setUserUsername(newValue)
        console.log(`Someone typed ${userUsername}`)
    }

    const [userPassword, setUserPassword] = useState("")
    const passwordChangedHandler = (event) => {
        let newValue = event.target.value
        setUserPassword(newValue)
        console.log(`Someone typed ${userPassword}`)
    }

    const onSubmitHandler = event => {
        event.preventDefault();

        const credentials = {
            username: userUsername,
            password: userPassword
        }

        if (props.onLogin(credentials)) {
            console.log("Reseting form data")
            setUserUsername("")
            setUserPassword("")
        }
        else {
            console.log("Error credentials");
        }
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <div className="login__elements">
                <Input className="login__element"
                    labelText="Username"
                    input={{
                        id: "username",
                        type: "text",
                        label: "username",
                        value: userUsername,
                        onChange: usernameChangedHandler
                    }} />

                <Input className="login__element"
                    labelText="Password"
                    input={{
                        id: "password",
                        type: "password",
                        label: "password",
                        value: userPassword,
                        onChange: passwordChangedHandler
                    }} />

            </div>
            <div className="login__actions">
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default LoginForm