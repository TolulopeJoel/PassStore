import React, { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Navbar from '../components/Navbar'

const theme = createTheme();

const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return { Authorization: `Bearer ${token}` };
};

export default function CreateWebsite() {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setfieldErrors] = useState({});
  const [otherErrors, setotherErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response1 = await axios.post("http://localhost:8000/api/websites/", { url }, { headers: getAuthHeader() });
      const websiteId = response1.data.id;
      const response2 = await axios.post("http://localhost:8000/api/credentials/", { website_id: websiteId, username, password }, { headers: getAuthHeader() });
      navigate("/")
    } catch (error) {
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
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
          <Typography component="h1" variant="h5">
            Add Password
          </Typography>
          {otherErrors && Object.values(otherErrors).map((errorMessage) => {
            return (
              <div className="alert alert-danger w-100">{errorMessage}</div>
            )
          })}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {fieldErrors.url && (<div className="text-danger w-100">{fieldErrors.url}</div>)}
                <TextField required fullWidth autoFocus type="url" label="Website link" name="url" value={url} onChange={(event) => setUrl(event.target.value)} />
              </Grid>
              <Grid item xs={12}>
                {fieldErrors.username && (<div className="text-danger w-100">{fieldErrors.username}</div>)}
                <TextField required fullWidth type="text" label="Username or Email" name="username" value={username} onChange={(event) => setUsername(event.target.value)} />
              </Grid>
              <Grid item xs={12}>
                {fieldErrors.password && (<div className="text-danger w-100">{fieldErrors.password}</div>)}
                <TextField required fullWidth type="text" label="Password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Add </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}