import "./ErrorModal.css";
import Modal from "./Modal";

const ErrorModal = (props) => {
    return (
        <Modal>
            <div className="error">
                <div className="error-title">
                    <h2>{props.title}</h2>
                </div>
                <div className="error-content">
                    <p>Input must have one of the following forms:</p>
                    <ul>
                        <li>200g green salad</li>
                        <li>100g burger for meal</li>
                        <li>100g burger and 200g green salad</li>
                        <li>100g burger and 200g green salad for dinner</li>
                    </ul>
                </div>
                <footer className="error-button">
                    <button type="button" onClick={props.onDismiss}>OK</button>
                </footer>
            </div>
        </Modal>
    )
}

export default ErrorModal;