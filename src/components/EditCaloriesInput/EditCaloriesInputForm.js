import "./EditCaloriesInputForm.css"
import { useState } from "react"
import Input from "../UI/Input"

const EditCaloriesInputForm = (props) => {
    // States
    const [input, setInput] = useState()
    
    const inputChangeHandler = (event) => {
        let newValue = event.target.value
        setInput(newValue)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()

        let tempInput, tempData, type

        if (input === undefined) {
            tempInput = ""
        }
        else {
            tempInput = input.trim()
        }

        if (tempInput.includes("for")) {
            tempData = tempInput.split("for")
            tempInput = tempData[0].trim()
            type = tempData[1].toLowerCase().trim()
        }
        else {
            type = "-"
        }

        const entry = {
            date: new Date(),
            query: tempInput,
            type: type
        }

        if (props.onEdit(entry)) {
            setInput("")
        }
    }

    const onCancelHandler = () => props.onCancel()

    return (
        <form className="edit-form" onSubmit={onSubmitHandler}>
            <div className="edit-input">
                <Input className="edit-element"
                    labelText="Input"
                    input={{
                        id: "input",
                        type: "text",
                        label: "input",
                        value: input,
                        placeholder:"ex. 200g green salad for meal",
                        onChange: inputChangeHandler
                    }} />
            </div>

            <div className="edit-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={onCancelHandler}>Cancel</button>
            </div>
        </form>
    )
}

export default EditCaloriesInputForm