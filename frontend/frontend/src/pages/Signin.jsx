import {Button} from '../components/Button'
import {Heading} from '../components/Heading'
import {InputBox} from '../components/InputBox'
import {BottomWarning} from '../components/Bottomwarning'
import {LoadComponent} from '../components/Loadcomponent'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function Signin ()
{
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <div className = "signin-wrapper" >
            <div className = "signin-card">
                <Heading label = {"Sign In"} />
                <InputBox type={"text"} 
                onChange={(e) => {
                    setUserName(e.target.value);
                }} 
                label = {""} 
                placeholder = {"Enter username/email"} 
                />
                <InputBox 
                type={"password"} 
                onChange={(e) => {
                    setPassword(e.target.value);
                }} 
                label = {""} 
                placeholder = {"Enter password"} 
                />
                {loading ? <LoadComponent label={"Signing you in..."} /> : <></>}
                <div className='signin-message'>{message}</div>
                <Button 
                onClick={async () => {
                    setLoading(true);

                    const response = await axios.post('https://transactly-6nnd.onrender.com/api/v1/user/signin', {
                        userName,
                        password
                    })

                    setLoading(false);

                    setMessage(response.data.message);

                    if (response.data.message === "Logged in")
                    {
                        localStorage.setItem("token", "Bearer " + response.data.token);
                        navigate('/dashboard');
                    }
                    else
                    {
                        setMessage(response.data.message);
                    }
                }} label = {"Sign In"} />
                <BottomWarning label = {"Don't have an account?"} buttonText = {"Sign up"} to = {"/signup"} />
            </div>
        </div>
    )
}