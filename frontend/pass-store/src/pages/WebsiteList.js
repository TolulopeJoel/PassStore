import React, { useState, useEffect } from "react";
import { WebsiteService } from "../services/WebsiteService";
import Navbar from "../components/Navbar";

export default function WebsiteList() {
    const [websites, setWebsites] = useState([]);
    const websiteService = new WebsiteService()

    useEffect(() => {
        websiteService.getAllWebsites().then((response) => {
            setWebsites(response.data.results);
        }).catch(error => console.log(error));
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                <form className="d-flex mt-5" role="search">
                    <input className="form-control form-control-lg me-2" type="search" placeholder="Search sites..." aria-label="Search" />
                    <button type="submit" className="btn btn-lg search-btn">Search</button>
                </form>

                <h1 className="display-6 my-5">Welcome { }</h1>

                {websites.length > 0 && websites.map(website => (
                    <div>
                        <div className="row border border-2 align-items-center rounded-4 my-5 p-3">
                            <h6 className="col-lg-8 col-md-8 col-sm-8"><a href={website.url}>{website.url}</a></h6>
                            <h6 className="col-lg-2 col-md-2 col-sm-2">{website.credentials.length}</h6>
                            <div className="col-lg-2 col-md-2 col-sm-2">
                                <a className="btn btn-primary w-100" data-bs-toggle="collapse" href={`#c-${website.id}`} role="button"
                                    aria-expanded="false" aria-controls={`c-${website.id}`}> View
                                </a>
                            </div>

                            {website.credentials && website.credentials.map(credential => (
                                <div className="collapse mt-3" id={`c-${website.id}`}>
                                    <div className="card card-body">
                                        <div className="row">
                                            <div className="col-lg-8 col-sm-12">
                                                <p>username: <i><b>{credential.username}</b></i></p>
                                                <p>password: <i><b>{credential.password}</b></i></p>
                                            </div>

                                            <div className="col-lg-2 col-sm-12 my-2">
                                                <a href={`/edit/${credential.id}/`} className="btn btn-outline-dark w-100">Edit</a>
                                            </div>

                                            <div className="col-lg-2 col-sm-12 my-2">
                                                <a href={`/delete/${credential.id}/`} className="btn btn-outline-danger w-100">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {websites.length === 0 &&
                    <div>
                        <img src="https://www.flaticon.com/free-icons/sad" />
                        <h5>You have no passwords. Create one.</h5>
                    </div>
                }

                <a href="/create" className="btn btn-lg my-3 mx-auto add-password">Add Password +</a>
            </div>
        </>
    );
}
