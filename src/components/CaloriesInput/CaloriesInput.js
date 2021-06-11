import { useState } from "react"
import "./CaloriesInput.css"

const CaloriesInput = (props) => {

    // States
    const [input, setInput] = useState()
    
    const inputChangeHandler = (event) => {
        let newValue = event.target.value
        setInput(newValue)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let tempInput, tempDate, type

        if (input === undefined) {
            tempInput = ""
        }
        else {
            tempInput = input.trim()
        }

        if (tempInput.includes("for")) {
            tempDate = tempInput.split("for")
            tempInput = tempDate[0].trim()
            type = tempDate[1].toLowerCase().trim()
        }
        else {
            type = "-"
        }

        const entry = {
            date: new Date(),
            query: tempInput,
            type: type
        }

        if (props.addEntry(entry)) {
            setInput("")
        }
    }

    return (
        <div className="add-entry">
            <div className="add-entry-title">
                <h2>Welcome to Odyssea Callories Tracker </h2>
            </div>

            <div className="add-entry-input">
                <input type="text" placeholder="ex. 200g green salad for meal" value={input} onChange={inputChangeHandler} />
                <button onClick={onSubmitHandler}>Click me</button>
            </div>
        </div>)
}

export default CaloriesInput