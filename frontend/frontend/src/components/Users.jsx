import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {SearchBar} from './Searchbar'

export function Users ()
{
    const [users, setUsers] = useState([]);
    const [filter, setfilter] = useState("");

    async function handler ()
    {
        const tusers = await axios.get('https://transactly-6nnd.onrender.com/api/v1/user/bulk?filter=' + filter)
        setUsers(tusers.data.user);
    }

    useEffect(() => {
        handler();
    }, [filter]);

    return (
        <div>
            <SearchBar setFilter = {setfilter} />
            <div className="users-grid">
                {users == null ? <></> : users.map((user) => <User user = {user} key = {user._id} />)}
            </div>
        </div>
    )
}

function User ({user})
{
    return (
        <div className = "user-card" >
            <div>
                {user.firstName} {user.lastName}
            </div>
            <Link to = {`/sendmoney?id=${user._id}&firstName=${user.firstName}&lastName=${user.lastName}`} className ="transfer-button" >
                Transfer
            </Link>
        </div>
    )
}