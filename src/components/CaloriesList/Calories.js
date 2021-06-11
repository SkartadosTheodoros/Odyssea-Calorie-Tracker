import "./Calories.css"
import CaloriesList from "./CaloriesList"

const Calories = (props) => {

    const date = new Date(props.filterDate)

    const filteredItems = props.data.filter(item => {
        if (props.filterMeal === "all") {
            return (item.date.getYear() === date.getYear() &&
                item.date.getMonth() === date.getMonth() &&
                item.date.getDate() === date.getDate())
        }
        else {
            return (item.date.getYear() === date.getYear() &&
                item.date.getMonth() === date.getMonth() &&
                item.date.getDate() === date.getDate() &&
                item.meal === props.filterMeal)
        }
    })

    const onDeleteHandler = (id) => props.delete(id)

    return (
        <div className="calories">
            {
                filteredItems.length === 0
                    ? 
                    null

                    :
                    <div className="calories-list">
                        <CaloriesList data={filteredItems} delete={onDeleteHandler}/>
                    </div>
            }
        </div>
    )
}

export default Calories