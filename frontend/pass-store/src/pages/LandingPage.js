import React from "react";
import Navbar from "../components/Navbar";


export default function LandingPage() {
    return (
        <>
            <Navbar />
            <div className="bg-danger bg-gradient">
                <div className="container text-left text-white">
                    <header>
                        <div className="row justify-content-between">
                            <div className="col-2">
                                <img src={require("../assets/images/logo.png")} height="50" width="100" alt="logo" />
                            </div>
                            <div className="col-6 align-self-center text-right">
                                <a href="/signin" className="lead text-white text-decoration-none">Sign In</a>
                            </div>
                        </div>
                    </header>

                    <h1 className="display-2 font-weight-bold my-5 fw-bolder">
                        <b>
                            Never Forget<br />
                            Passwords Again___🔒
                        </b>
                    </h1>
                    <p className="lead my-4">
                        PassStore Keeps your passwords secured.
                        <br />And helps you detect security vulnerabilities for your passwords.
                    </p>
                    <a href="/signup" className="btn btn-lg my-4 font-weight-bold btn-success rounded-pill">Get Started</a>
                </div>
            </div>

            <div class="container my-5 py-2">
                <h2 class="text-center font-weight-bold my-5 fw-bold">Secure protection for your passwords</h2>
                <div class="row">
                    <div data-aos="fade-up" data-aos-delay="0" data-aos-duration="1000" data-aos-once="true" class="col-md-4 text-center">
                        <img src="img/smart-protect-1.jpg" alt="Anti-spam" class="mx-auto" />
                        <h4>Anti-spam</h4>
                        <p>Lorem ipsum dolor sit amet porro his no his deleniti</p>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000" data-aos-once="true" class="col-md-4 text-center">
                        <img src="img/smart-protect-2.jpg" alt="Phishing Detect" class="mx-auto" />
                        <h4>Phishing Detect</h4>
                        <p>Ne error antiopam usu. Sed vocen concludaturque ea</p>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000" data-aos-once="true" class="col-md-4 text-center">
                        <img src="img/smart-protect-3.jpg" alt="Smart Scan" class="mx-auto" />
                        <h4>Smart Scan</h4>
                        <p>Et usu ocurreret elaboraret doctus prodesse assueverit.</p>
                    </div>
                </div>
            </div>
        </>
    )
}