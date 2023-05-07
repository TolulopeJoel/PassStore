import api from '../components/Api';
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";


function UserProfile() {
    const [user, setUser] = useState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/profile/')
            .then((response) => {
                setLoading(false);
                setUser(response.data.results)
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }


    return (
        <>
        <Navbar />
        <div className='container my-5'>
            <h1 className='text-center'>Profile</h1>
            {user && user.map(user => (
                <div className='row'>
                    <p className='my-2'><b>first name:</b> {user.first_name}</p>
                    <p>last name: {user.last_name}</p>
                    <p>username: @{user.username}</p>
                    <p>You registered with {user.email}</p>
                    <p>you joined PassStore {new Date(user.date_joined).toLocaleDateString()}</p>
                    <p>So far, you've saved {user.saved_passwords} passwords</p>
                </div>
            ))}
        </div>
        </>
    )
}

export default UserProfile;