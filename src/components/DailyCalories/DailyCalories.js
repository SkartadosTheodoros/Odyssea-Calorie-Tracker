import "./DailyCalories.css"
import { useState } from 'react';
import Modal from "../UI/Modal";
import ErrorModal from "../UI/ErrorModal";
import DailyCaloriesForm from "./DailyCaloriesForm"

const DailyCalories = (props) => {
    const [error, setError] = useState();

    const onSetCaloriesHandler = (calories) => {
        if (parseInt(calories) <= parseInt(props.caloriesLimit)) {
            setError("The Calories you select is too low ")
            return false;
        }

        props.onSetCalories(calories)
        return true;
    }

    const onDismissHandler = () => setError(null)

    return (
        <Modal>
            <div>
                {error && <ErrorModal title="Dangerous" message={error} onDismiss={onDismissHandler}></ErrorModal>}
                {!error && <div className="daily-calories">
                    <DailyCaloriesForm 
                    user={props.user}
                    onSetCalories={onSetCaloriesHandler}/>
                </div>}
            </div>
        </Modal>
    )
}

export default DailyCalories