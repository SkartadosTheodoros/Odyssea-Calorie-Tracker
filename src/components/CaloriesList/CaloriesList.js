import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./CaloriesList.css"

const CaloriesList = (props) => {
    let totalCalories = 0;

    const renderTableData = () => {
        return props.data.map((item) => {
            totalCalories += item.calories

            return (
                <tr key={item.id}>
                    <td>{item.type}</td>
                    <td>{item.meal}</td>
                    <td>{item.quantity}</td>
                    <td>{item.calories}</td>
                    <td>
                        <div className="calories-entry-buttons">
                            <button className="edit-button" onClick={() => props.onEdit(item.id)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="delete-button" onClick={() => props.onDelete(item.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    return (
        <table className="calories-list-table">
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Meal</th>
                    <th>Quantity</th>
                    <th>Calories</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {renderTableData()}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="3">Total Calories</td>
                    <td style={props.caloriesLimit < Math.round(totalCalories * 10) / 10
                        ? { backgroundColor: "red" }
                        : {}}>
                        {Math.round(totalCalories * 10) / 10}
                    </td>
                </tr>
            </tfoot>
        </table>

    )
}

export default CaloriesList