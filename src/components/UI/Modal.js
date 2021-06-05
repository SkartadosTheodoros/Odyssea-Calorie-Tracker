import "./Modal.css"

const Modal = (props) => {
    return (
        <div>
            <div className="backdrop" />
            <div className="center-modal">
                <div className="modal"> {props.children}</div>
            </div>

        </div>
    )
}
export default Modal
