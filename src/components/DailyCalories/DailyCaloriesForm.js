import "./DailyCaloriesForm.css"
import { useState } from "react"
import Input from "../UI/Input"

const DailyCaloriesForm = (props) => {
    const [calories, setCalories] = useState()

    const caloriesChangeHandler = (event) => {
        let newValue = event.target.value
        setCalories(newValue)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()

        if (props.onSetCalories(calories)) {
            setCalories(0)
        }
    }

    return (
        <form className="daily-calories-form" onSubmit={onSubmitHandler}>
            <div className="daily-calories-greeting">
                <p>Hello {props.user.name}</p>
            </div>
            
            <div className="daily-calories-input">
                <Input className="daily-calories-element"
                    labelText="Calories"
                    input={{
                        id: "calories",
                        label: "Insert Daily Calories",
                        type: "number",
                        value: calories,
                        min: "0",
                        step: "10",
                        onChange: caloriesChangeHandler,
                    }} />
            </div>

            <div className="daily-calories-buttons">
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default DailyCaloriesForm