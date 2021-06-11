import "./CaloriesFilter.css"
import CaloriesFilterType from "./CaloriesFilterType"
import CaloriesFilterDate from "./CaloriesFilterDate"

const CaloriesFilter = (props) => {
    const onSetTypeHandler = (type) => props.onSetType(type)
    const onSetStartDateHandler = (newStartDate) => props.onSetStartDate(newStartDate)
    const onSetTypeListHandler = (newStartDate) => props.onSetTypeList(newStartDate)

    return (
        <div className="filter">
            <div className="filter-entry">
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