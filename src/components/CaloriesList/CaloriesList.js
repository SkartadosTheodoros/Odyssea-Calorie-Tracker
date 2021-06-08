import "./CaloriesList.css"
import CaloriesEntry from "./CaloriesEntry"

const CaloriesList = (props) => {
    console.log(props.data)

    return (
        props.data.map((item) => {
            return (
                <CaloriesEntry 
                    key={item.id}
                    date={item.date}
                    meal={item.meal}
                    quantity={item.quantity}
                    calories={item.calories}
                />)
        }))
}

export default CaloriesList