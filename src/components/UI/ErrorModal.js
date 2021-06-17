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
                    {(props.message === "Meal Wrong Input Format")
                        ?
                        <div>
                            <p>Input must have one of the following forms:</p>
                            <ul>
                                <li>200<b>g</b> green salad</li>
                                <li>10<b>lb</b> beef brisket <b>for</b> meal</li>
                                <li>14<b>oz</b> prime rib <b>and</b> mashed potatoes <b>for</b> dinner</li>
                            </ul>
                        </div>
                        :
                        <p>{props.message}</p>}
                </div>
                <footer className="error-button">
                    <button type="button" onClick={props.onDismiss}>OK</button>
                </footer>
            </div>
        </Modal>
    )
}

export default ErrorModal;