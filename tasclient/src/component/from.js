import React from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';
import { profile, register } from '../api';

export default function Form({ setView, view, updataval }) {
  const [email, setEmail] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [error, setError] = React.useState({
    firstnameError: "",
    lastnameError: "",
    emailError: "",
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateName = (name) => /^[a-zA-Z]*$/.test(name) && name.length <= 100;

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    let valid = true;

    // Validate firstname
    if (!validateName(firstname)) {
      setError((prev) => ({ ...prev, firstnameError: "First name must be alphabetic and max 100 characters" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, firstnameError: "" }));
    }

    // Validate lastname
    if (!validateName(lastname)) {
      setError((prev) => ({ ...prev, lastnameError: "Last name must be alphabetic and max 100 characters" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, lastnameError: "" }));
    }

    // Validate email
    if (!validateEmail(email)) {
      setError((prev) => ({ ...prev, emailError: "Invalid email format" }));
      valid = false;
    } else {
      setError((prev) => ({ ...prev, emailError: "" }));
    }

    if (valid) {
      // Make API call here
      const res = await register({ firstname, lastname, email, password: "12345" });
      if (res.ok) {
        console.log(res.data);
        
        alert(res.data.message);
        setView(false); // Close the view after successful registration
      } else {
        console.log(res.data);
        
        alert(res?.message);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: "50px" }}>
      <form onSubmit={handleSignupSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              error={!!error.firstnameError}
              helperText={error.firstnameError}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              error={!!error.lastnameError}
              helperText={error.lastnameError}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error.emailError}
              helperText={error.emailError}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
