import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const getAuthHeader = () => {
    const token = localStorage.getItem("access_token");
    return { Authorization: `Bearer ${token}` };
};


function DeleteCredential() {
    const { credentialId } = useParams();
    const [fieldErrors, setfieldErrors] = useState({});
    const [otherErrors, setotherErrors] = useState({});

    async function fetchData() {
        await axios.delete("/api/credentials/" + credentialId + "/", { headers: getAuthHeader() })
            .then((response) => {
            }).catch((error) => {
                catchError(error);
            });
    }

    function catchError(error) {
        if (error.response.data.detail) {
            setotherErrors([error.response.data.detail]);
        } else if (error.response.data.message) {
            setotherErrors([error.response.data.message]);
        } else if (error.response.data.non_field_errors) {
            setotherErrors(error.response.data.non_field_errors);
        } else {
            setfieldErrors(error.response.data);
        }
    }

    useEffect(() => {
        fetchData()
    }, [credentialId]);

    return (
        <>

        </>
    );
}

export default DeleteCredential;
