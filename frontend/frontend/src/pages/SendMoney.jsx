import {Heading} from '../components/Heading'
import {InputBox} from '../components/InputBox'
import {SubHeading} from '../components/SubHeading'
import {FriendLogo} from '../components/FriendLogo'
import { LoadComponent } from '../components/LoadComponent'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

export function SendMoney ()
{
    const [queryParams] = useSearchParams();
    const firstName = queryParams.get("firstName");
    const lastName = queryParams.get("lastName");
    const id = queryParams.get("id");
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <div className = "sendmoney-wrapper">
            <div className = "sendmoney-card" >
                <Heading label = {"Send Money"} />
                <div className = "sendmoney-user" >
                    <FriendLogo label = {firstName[0].toUpperCase()} />
                    <SubHeading label = {`${firstName} ${lastName}`} />
                </div>
                <InputBox type={"number"} onChange={(e) => {
                    setAmount(e.target.value);
                }} label = {""} placeholder = {"Amount(in Rs.)"} />
                <div className="sendmoney-message">{message}</div>
                {loading ? <LoadComponent label={"Sending..."} /> : <></>}
                <div className="sendmoney-actions">
                    <button onClick={async () => {

                        setLoading(true);

                        const response = await axios.post('https://transactly-6nnd.onrender.com/api/v1/account/transfer', {
                            body : {
                                        to: id,
                                        amount : parseInt(amount)
                                    }}, {
                            headers : {
                            Authorization : localStorage.getItem("token")
                        }})

                        setLoading(false);

                        if (response.data.message === 'Transfer successful')
                        {
                            navigate(-1);
                            alert("Transaction successful");
                        }

                        setMessage(response.data.message);
                    }} className = "btn-transfer" >
                        {"Initiate Transfer"}
                    </button>
                    <button onClick = {() => {
                        navigate(-1);
                    }} className="btn-cancel">Cancel</button>
                </div>
            </div>
        </div>
    )
}