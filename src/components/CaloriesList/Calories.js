import "./Calories.css"
import CaloriesList from "./CaloriesList"

const Calories = (props) => {
    const date = new Date(props.filterDate)

    const filteredItems = props.data.filter(item => {
        if (props.filterType === "all") {
            return (item.date.getYear() === date.getYear() &&
                item.date.getMonth() === date.getMonth() &&
                item.date.getDate() === date.getDate())
        }
        else {
            return (item.date.getYear() === date.getYear() &&
                item.date.getMonth() === date.getMonth() &&
                item.date.getDate() === date.getDate() &&
                item.type === props.filterType)
        }
    })

    const onDeleteHandler = (id) => props.onDelete(id)

    return (
        <div className="calories">
            {filteredItems.length !== 0 &&
                <div className="calories-list">
                    <CaloriesList data={filteredItems} onDelete={onDeleteHandler} />
                </div>
            }
        </div>
    )
}

export default Calories