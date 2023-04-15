import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import api from "../components/Api";
import Navbar from '../components/Navbar'

const theme = createTheme();


function EditCredential() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { credentialId } = useParams();
    const [fieldErrors, setfieldErrors] = useState({});
    const [otherErrors, setotherErrors] = useState({});
    const navigate = useNavigate();

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

    async function fetchData() {
        await api.get("/credentials/" + credentialId + "/")
            .then((response) => {
                setUsername(response.data.username)
                setPassword(response.data.password_)
            }).catch((error) => {
                catchError(error);
            });
    }

    async function updateData() {
        await api.put("/credentials/" + credentialId + "/", { username, password })
            .then((response) => {
                navigate('/site-details/')
            }).catch((error) => {
                catchError(error);
            });
    }

    useEffect(() => {
        fetchData()
    }, [credentialId]);

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            updateData()
        } catch (error) {
            catchError(error)
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                    <Typography component="h1" variant="h5">
                        Edit Password
                    </Typography>
                    {otherErrors && Object.values(otherErrors).map((errorMessage) => {
                        return (
                            <div className="alert alert-danger w-100">{errorMessage}</div>
                        )
                    })}

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {fieldErrors.username && (<div className="text-danger w-100">{fieldErrors.username}</div>)}
                                <TextField required fullWidth type="text" label="Username or Email" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                                {fieldErrors.password && (<div className="text-danger w-100">{fieldErrors.password}</div>)}
                                <TextField required fullWidth type="text" label="Password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Edit </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default EditCredential;