import "./CaloriesFilterType.css"

const CaloriesFilterType = (props) => {
    const startTypeChangeHandler = (event) => {
        let type = event.target.value
        props.onSetType(type)
    }

    return (
        <div className="filter-entry-meal">
            <label htmlFor="meal">Meal Type : </label>
            <select name="meals" id="meal" onChange={startTypeChangeHandler}>
                <option value="all">all</option>
                {
                    props.typeList.length > 0 &&
                    props.typeList.map(type => {
                        return (<option value={type}>{type}</option>)
                    })
                }
            </select>
        </div>
    )
}

export default CaloriesFilterType