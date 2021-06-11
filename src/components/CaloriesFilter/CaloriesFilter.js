import "./CaloriesFilter.css"
import CaloriesFilterType from "./CaloriesFilterType"
import CaloriesFilterDate from "./CaloriesFilterDate"
import CaloriesFilterSearch from "./CaloriesFilterSearch"

const CaloriesFilter = (props) => {
    const onSetSearchHandler = (entry) => props.onSetSearch(entry)
    const onSetTypeHandler = (type) => props.onSetType(type)
    const onSetStartDateHandler = (newStartDate) => props.onSetStartDate(newStartDate)
    const onSetTypeListHandler = (newStartDate) => props.onSetTypeList(newStartDate)

    return (
        <div className="filter">
            <div className="filter-entry">
                <CaloriesFilterSearch 
                    value={props.search}
                    onSetSearch = {onSetSearchHandler}/>

                <CaloriesFilterType
                    typeList={props.typeList}
                    onSetType={onSetTypeHandler} />

                <CaloriesFilterDate
                    value={props.startDate}
                    onSetStartDate={onSetStartDateHandler}
                    onSetTypeList={onSetTypeListHandler} />
            </div>
        </div>
    )
}

export default CaloriesFilter