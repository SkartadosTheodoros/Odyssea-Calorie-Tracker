import "./Calories.css"
import CaloriesList from "./CaloriesList"

const Calories = (props) => {
    return (
        <div className="calories">
            <div className="calories-list">
                <CaloriesList data={props.data} />
            </div>


        </div>
    )
}

export default Calories