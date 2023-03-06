import React from "react";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><b>Pass Store</b></a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/same-password">SamePasswords</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="">Profile</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="">Logout</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/signin">Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;