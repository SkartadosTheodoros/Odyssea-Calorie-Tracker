import "./Calories.css"
import CaloriesList from "./CaloriesList"

const Calories = (props) => {
    const date = new Date(props.filterDate)

    const filteredItems = props.data.filter(item => {
        if (props.filterType !== "all" && props.filterSearch.length !== 0) {
            return (item.date.getYear() === date.getYear() &&
                item.date.getMonth() === date.getMonth() &&
                item.date.getDate() === date.getDate() &&
                item.type === props.filterType &&
                item.meal.startsWith(props.filterSearch))
        }
        else if (props.filterType !== "all" && props.filterSearch.length === 0) {
            return (item.date.getYear() === date.getYear() &&
                item.date.getMonth() === date.getMonth() &&
                item.date.getDate() === date.getDate() &&
                item.type === props.filterType)
        }
        else if (props.filterSearch.length !== 0) {
            return (item.date.getYear() === date.getYear() &&
                item.date.getMonth() === date.getMonth() &&
                item.date.getDate() === date.getDate() &&
                item.meal.startsWith(props.filterSearch))
        }
        else {
            return (item.date.getYear() === date.getYear() &&
                item.date.getMonth() === date.getMonth() &&
                item.date.getDate() === date.getDate())
        }
    })

const onDeleteHandler = (id) => props.onDelete(id)
const onEditHandler = (id) => props.onEdit(id)

return (
    <div className="calories">
        {filteredItems.length !== 0 &&
            <div className="calories-list">
                <CaloriesList 
                data={filteredItems} 
                caloriesLimit={props.caloriesLimit}
                onEdit={onEditHandler} 
                onDelete={onDeleteHandler} />
            </div>
        }
    </div>
)
}

export default Calories