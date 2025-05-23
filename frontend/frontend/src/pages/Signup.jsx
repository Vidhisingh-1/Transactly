import { useState } from 'react'
import {Button} from '../components/Button'
import {Heading} from '../components/Heading'
import {InputBox} from '../components/InputBox'
import {BottomWarning} from '../components/Bottomwarning'
import {LoadComponent } from '../components/Loadcomponent'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export function Signup()
{
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return(
        <div className = "signup-wrapper" >
            <div className = "signup-card">
                <Heading label = {"Sign up"} />

                <InputBox onChange = {(e) => {
                    setUserName(e.target.value);
                }} type={"email"} label = {""} placeholder = {"Enter username or email-id"} 
                />

                <InputBox onChange = {(e) => {
                    setFirstName(e.target.value);
                }} type={"text"} label = {""} placeholder = {"Enter Firstname"} 
                />

                <InputBox onChange = {(e) => {
                    setLastName(e.target.value);
                }} type={"text"} label = {""} placeholder = {"Enter Lastname"} 
                />

                <InputBox onChange = {(e) => {
                    setPassword(e.target.value);
                }} type={"password"} label = {""} placeholder = {"Enter password"} 
                />

                <div className="signup-message">{message}</div>
                {loading ? <LoadComponent label={"Creating your account..."} /> : <></>}
                <Button onClick={async () => {

                    setLoading(true);

                    const response = await axios.post('https://transactly-6nnd.onrender.com/api/v1/user/signup', {
                        userName,
                        firstName,
                        lastName,
                        password
                    });

                    setLoading(false);

                    setMessage(response.data.message);

                    if (response.data.message === "User created successfully")
                    {
                        navigate('/signin');
                    }
                }} label = {"Sign up"} />
                <BottomWarning label = {"Already have an account?"} buttonText = {"Sign in"} to = {"/signin"} />
            </div>
        </div>
    )
}
