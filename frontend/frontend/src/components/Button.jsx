export function Button ({label, onClick})
{
    return (
        <div className = "button-container" >
            <button onClick={onClick} className = "primary-button" >
                {label}
            </button>
        </div>
    )
}