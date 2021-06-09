import "./CaloriesFilter.css"

const CaloriesFilter = (props) => {

    const startDateChangeHandler = (event) => {
        let newStartDate = event.target.value
        props.onSetStartDate(newStartDate)
        props.onMealTypes(newStartDate)
    }

    const startMealChangeHandler = (event) => {
        let meal = event.target.value
        props.onSetMealType(meal)
    }

    return (
        <div className="filter">
            <div className="filter-entry">
                <div className="filter-entry-meal">
                    <label htmlFor="meal">Meal Type : </label>
                    <select name="meals" id="meal" onChange={startMealChangeHandler}>
                        <option value="all">all</option>
                        {
                            props.mealType.length > 0 && props.mealType[0] != null
                                ? props.mealType.map(type => { return (<option value={type}>{type}</option>) })
                                : null
                        }
                    </select>
                </div>

                <div className="filter-entry-date">
                    <label>Start on : </label>
                    <input type="date" value={props.startDate} onChange={startDateChangeHandler} />
                </div>
            </div>
        </div>
    )
}

export default CaloriesFilter
