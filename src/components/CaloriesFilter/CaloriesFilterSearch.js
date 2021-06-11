import "./CaloriesFilterSearch.css"

const CaloriesFilterSearch = (props) => {
    const searchChangeHandler = (event) => {
        let search = event.target.value
        props.onSetSearch(search)
    }

    return (
        <div className="filter-entry-search">
            <label>Meal</label>
            <input type="text" value={props.value} onChange={searchChangeHandler} />
        </div>
    )
}

export default CaloriesFilterSearch
