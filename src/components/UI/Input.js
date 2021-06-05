import "./Input.css"

const Input = (props) => {
    return (
        <div>
            <label htmlFor={props.input.id}>{props.input.label}</label>
            <input {...props.input}></input>
        </div>
    )
}
export default Input