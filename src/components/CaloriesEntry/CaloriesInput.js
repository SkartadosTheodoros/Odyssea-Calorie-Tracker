import { v4 as uuidv4 } from "uuid";
import { useState } from "react"
import "./CaloriesInput.css"
import { logDOM } from "@testing-library/dom";

const CaloriesInput = (props) => {

    const [input, setInput] = useState()
    const inputChangeHandler = (event) => {
        let newValue = event.target.value
        setInput(newValue)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let tempInput = input.trim()
        let tempDate, meal, type, quantity
        if (tempInput.includes("for")) {
            tempDate = tempInput.split("for")
            tempInput = tempDate[0].trim()
            type = tempDate[1].trim()
        }
        else {
            type = "-"
        }

        tempInput.includes("and")
            ? tempDate = tempInput.split("and")
            : tempDate = [tempInput]

        tempDate.forEach((item) => {
            let tempSplit
            item.includes("of")
                ? tempSplit = item.trim().split("of")
                : tempSplit = item.trim().split(" ")
            quantity = tempSplit[0].trim()
            meal = tempSplit[1].trim()

            console.log(quantity);
            console.log(meal);

            const newEntry = {
                id: uuidv4(),
                date: new Date(),
                type: type,
                meal: meal,
                quantity: quantity
            }

            props.addEntry(newEntry)
        })

        setInput("")
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