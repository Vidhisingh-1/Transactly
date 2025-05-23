export function InputBox ({label, placeholder, onChange, type})
{
    return (
        <div className = "input-box" >
            <label htmlFor = {label} className = "input-label" >{label}</label>
            <input type = {type} onChange = {onChange} id = {label} placeholder = {placeholder} className = "input-field"/>
        </div>
    )
}