import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./CaloriesEntry.css";

const CaloriesEntry = (props) => {
    console.log(props.meal)
    
    return (
        <div className="calories-entry">
            <div className="calories-entry-date">{props.date}</div>
            <div className="calories-entry-meal">{props.meal}</div>
            <div className="calories-entry-quantity">{props.quantity}</div>
            <div className="calories-entry-calories">{props.calories}</div>
            <button className="edit-button" onClick={props.edit}>
                <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="delete-button" onClick={props.delete}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    )
}

export default CaloriesEntry