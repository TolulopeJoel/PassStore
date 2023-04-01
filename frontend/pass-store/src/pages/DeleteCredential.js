import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../components/api";


function DeleteCredential() {
    const { credentialId } = useParams();
    
    const navigate = useNavigate()

    async function fetchData() {
        await api.delete(`/credentials/${credentialId}/`)
    }

    useEffect(() => {
        fetchData()
        navigate('/site-details/')
    }, [credentialId]);
}

export default DeleteCredential;
