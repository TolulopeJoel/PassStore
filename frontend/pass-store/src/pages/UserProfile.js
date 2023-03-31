import api from '../components/api';
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";


function UserProfile() {
    const [user, setUser] = useState();

    useEffect(() => {
        api.get('/profile/')
            .then((response) => {
                setUser(response.data.results)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    return (
        <>
            <Navbar />
            <h3>Profile</h3>
            {user && user.map(user => (
                <div>
                    <p>first name: {user.first_name}</p>
                    <p>last name: {user.last_name}</p>
                    <p>username: @{user.username}</p>
                    <p>You registered with {user.email}</p>
                    <p>you joined Pass Store {new Date(user.date_joined).toLocaleDateString()}</p>
                    <p>So far, you've saved {user.saved_passwords} passwords</p>
                </div>
            ))}
        </>
    )
}

export default UserProfile;