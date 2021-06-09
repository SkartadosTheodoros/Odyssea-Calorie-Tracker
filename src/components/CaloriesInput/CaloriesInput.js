import { v4 as uuidv4 } from "uuid";
import { useState } from "react"
import "./CaloriesInput.css"

const CaloriesInput = (props) => {

    const [input, setInput] = useState()
    const inputChangeHandler = (event) => {
        let newValue = event.target.value
        setInput(newValue)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let tempInput, tempDate, meal

        if (input === undefined) {
            tempInput = ""
        }
        else {
            tempInput = input.trim()
        }

        if (tempInput.includes("for")) {
            tempDate = tempInput.split("for")
            tempInput = tempDate[0].trim()
            meal = tempDate[1].trim()
        }
        else {
            meal = "-"
        }

        const newEntry = {
            id: uuidv4(),
            date: new Date(),
            name: tempInput,
            meal: meal
        }

        if (props.addEntry(newEntry)) {
            setInput("")
        }
        else {
            console.log("Error Data");
        }
    }

    return (
        <div className="add-entry">
            <div className="add-entry-title">
                <h2>Welcome to Odyssea Callories Tracker </h2>
            </div>

            <div className="add-entry-input">
                <input type="text" placeholder="ex. 200gr green salad for meal" value={input} onChange={inputChangeHandler} />
                <button onClick={onSubmitHandler}>Click me</button>
            </div>

        </div>)
}

export default CaloriesInput