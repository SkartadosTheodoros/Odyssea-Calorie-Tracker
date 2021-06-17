import "./RegisterForm.css"
import { v4 as uuidv4 } from "uuid";
import { useState } from "react"
import Input from "../UI/Input"

const RegisterForm = (props) => {

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [birthday, setBirthday] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const nameChangedHandler = (event) => {
        let newValue = event.target.value
        setName(newValue)
    }

    const surnameChangedHandler = (event) => {
        let newValue = event.target.value
        setSurname(newValue)
    }

    const birthdayChangedHandler = (event) => {
        let newValue = event.target.value
        setBirthday(newValue)
    }

    const usernameChangedHandler = (event) => {
        let newValue = event.target.value
        setUsername(newValue)
    }

    const passwordChangedHandler = (event) => {
        let newValue = event.target.value
        setPassword(newValue)
    }

    const onSubmitHandler = event => {
        event.preventDefault();

        const newUser = {
            id: uuidv4(),
            name: name,
            surname: surname,
            birthday: new Date(birthday),
            username: username,
            password: password,
            role: "Simple User"
        }

        if (props.onRegister(newUser)) {
            setName("")
            setSurname("")
            setBirthday("")
            setUsername("")
            setPassword("")
        }
    }

    const onCancelHandler = () => props.onCancel()

    return (
        <form className="register-form" onSubmit={onSubmitHandler}>
            <div className="register-personal-info">
                <Input className="register-element"
                    labelText="Name"
                    input={{
                        id: "name",
                        type: "text",
                        label: "name",
                        value: name,
                        onChange: nameChangedHandler
                    }} />

                <Input className="register-element"
                    labelText="Surname"
                    input={{
                        id: "surname",
                        type: "text",
                        label: "surname",
                        value: surname,
                        onChange: surnameChangedHandler
                    }} />

                <Input className="register-element"
                    labelText="Birthday"
                    input={{
                        id: "birthday",
                        type: "date",
                        label: "birthday",
                        value: birthday,
                        onChange: birthdayChangedHandler
                    }} />
            </div>

            <div className="register-login-info">
                <Input className="register-element"
                    labelText="Username"
                    input={{
                        id: "username",
                        type: "text",
                        label: "username",
                        value: username,
                        onChange: usernameChangedHandler
                    }} />

                <Input className="register-element"
                    labelText="Password"
                    input={{
                        id: "password",
                        type: "password",
                        label: "password",
                        value: password,
                        onChange: passwordChangedHandler
                    }} />
            </div>

            <div className="register-buttons">
                <button type="submit">Register</button>
                <button type="button" onClick={onCancelHandler}>Cancel</button>
            </div>
        </form>
    )
}

export default RegisterForm