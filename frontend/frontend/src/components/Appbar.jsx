import { useState } from "react";
import {useNavigate} from "react-router-dom"

export function Appbar ({firstName})
{
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className = "appbar" >
            <div className = "appbar-left" >
                Payment App
            </div>
            <div className = "appbar-right" >
                <div>
                    {isHovered ? <Logout/> : <Hello/>}
                </div>
                <div onMouseEnter={() => {
                    setIsHovered(true);
                }} onMouseLeave={() => {
                    setTimeout(() => {
                        setIsHovered(false);
                    }, 1000);
                }} className = "initial-circle" >
                    {firstName.length > 0 ? firstName[0].toUpperCase() : <></> }
                </div>
            </div>
        </div>
    )
}

function Hello ()
{
    return (
        <div className="hello-box">
            Hello
        </div>
    )
}

function Logout ()
{
    const navigate = useNavigate();

    return (
        <div onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "https://transactly-orpin.vercel.app/";
        }} className="logout-box">
            Logout
        </div>
    )
}