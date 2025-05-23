import { Link } from "react-router-dom"

export function BottomWarning ({label, buttonText, to})
{
    return (
        <div className = "link-row" >
            <div className="link-label">{label}</div>
            <Link className="link-button" to={to}>
                {buttonText}
            </Link>
        </div>
    )
}