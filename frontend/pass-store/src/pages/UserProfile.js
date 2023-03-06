import axios from 'axios';
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const getAuthHeader = () => {
    const token = localStorage.getItem("access_token");
    return { Authorization: `Bearer ${token}` };
};

function UserProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState();

    useEffect(() => {
        axios.all([
            axios.get('http://localhost:8000/api/profile/', { headers: getAuthHeader() })
                .then((response) => {
                    setUser(response.data.results)
                }),
            // axios.get(`http://localhost:8000/api/profile/${userId}/`, { headers: getAuthHeader() })
            // .then((response) => {
            //     setUser(response.data);
            //     // console.log(response.data)
            // }).catch((error) => {
            //     console.log(error);
            // })
        ])
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