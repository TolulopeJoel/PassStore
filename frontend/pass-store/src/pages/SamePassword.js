import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar'
import api from '../components/Api';


function SamePassword() {
    const [credentials, setCredentials] = useState("");

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        api.get('/same-password/',)
            .then((response) => {
                setLoading(false);
                setCredentials(response.data);
            })
            .catch(error => console.log(error.response.data));
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
        <div>
            <Navbar />
            {credentials.length > 0 &&
                <div className="container-md mt-5">
                    <h1 className="display-6">Why use one password for mutiple sites 🥴?</h1>
                    <p className="lead">Change it please!</p>

                    {credentials && credentials.map(credential => {
                        return (
                            <div>
                                <div className="border rounded-3 align-items-center row p-3 my-4">
                                    <h6 className="col-lg-9 col-md-9 col-sm-8"><span className="text-secondary">password:</span> <b><i>{credential.password}</i></b></h6>
                                    <a className="btn btn-primary col-lg-1 col-md-1 col-sm-2" data-bs-toggle="collapse"
                                        href={`#c${credential.id}`} role="button" aria-expanded="false" aria-controls={`c${credential.password}`}>view
                                    </a>

                                    {credential.websites && credential.websites.map(website => (
                                        <div className="collapse mt-3" id={`c${credential.id}`}>
                                            <div className="card card-body">
                                                <p>username : <b><i>{website.username}</i></b></p>
                                                <p>website : <b><i>{website.url}</i></b></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            }

            {credentials.length < 1 &&
                <div>
                    <img src="https://www.flaticon.com/free-icons/emoji" />
                    <h3>You have no identical password</h3>
                </div>
            }
        </div>
    );
}

export default SamePassword;