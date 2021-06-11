import "./CaloriesFilterDate.css"

const CaloriesFilterDate = (props) => {
    const startDateChangeHandler = (event) => {
        let newStartDate = event.target.value
        props.onSetStartDate(newStartDate)
        props.onSetTypeList(newStartDate)
    }

    return (
        <div className="filter-entry-date">
            <label>Start on : </label>
            <input type="date" value={props.value} onChange={startDateChangeHandler} />
        </div>
    )
}

export default CaloriesFilterDate
