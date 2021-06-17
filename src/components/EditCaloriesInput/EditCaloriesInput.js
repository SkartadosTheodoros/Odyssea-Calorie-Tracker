import "./EditCaloriesInput.css"
import { useState } from 'react';
import Modal from "../UI/Modal";
import ErrorModal from "../UI/ErrorModal";
import EditCaloriesInputForm from "./EditCaloriesInputForm"

const EditCaloriesInput = (props) => {
    const [error, setError] = useState();

    const onEditHandler = (newEntry) => {
        if (newEntry.query.trim().length === 0) {
            setError("Meal is mandatory")
            return false;
        }

        props.onEdit(newEntry)
        return true;
    }

    const onDismissHandler = () => setError(null)
    const onCancelHandler = () => props.onCancel()

    return (
        <Modal>
            <div>
                {error && <ErrorModal title="Error" message={error} onDismiss={onDismissHandler}></ErrorModal>}
                {!error && <div className="edit">
                    <EditCaloriesInputForm 
                    editID={props.editID}
                    onEdit={onEditHandler} 
                    onCancel={onCancelHandler} />
                </div>}
            </div>
        </Modal>
    )
}

export default EditCaloriesInput