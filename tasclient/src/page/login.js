import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment
} from '@mui/material';
import { login, register } from '../api/index.js';
import { useNavigate } from 'react-router-dom';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailsingup, setEmailsingup] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [passwordsingup, setPasswordsingup] = useState('');
  const [changepage, setChangepage] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passworderror, setPasswordError] = useState('');
  const [signupEmailError, setSignupEmailError] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const navigate=useNavigate()

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z]*$/;
    return regex.test(name) && name.length <= 100;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('please enter password ');
      return;
    } else {
      setPasswordError('');
    }


    const apicall=async()=>{
      try {    
        let res=await login({
          email:email,
          password:password
        });
        console.log("Login Response:", res);
        if(res?.ok){
          localStorage.setItem("token", JSON.stringify(res.data.token));                
          toast.success("Login Sucessfully");
          navigate("/");
        } else {
          toast.error(res?.data?.message || "Login failed");
        }
      } catch (error) {
        console.log("API Error:", error);
        toast.error("An error occurred. Please try again.");
      }
    }
  if(!emailError||!passworderror){
     apicall()
} 

  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();
    if(!firstname){
      setFirstnameError('please Enter First name');
    } else if (!validateName(firstname)) {
      setFirstnameError('First name must be alphabetic and max 100 characters');
      return;
    } else {
      setFirstnameError('');
    }

    if(!lastname){
      setLastnameError('please Enter Last name ');
    } else if (!validateName(lastname)) {
      setLastnameError('Last name must be alphabetic and max 100 characters');
      return;
    } else {
      setLastnameError('');
    }

    if(!emailsingup){
      setSignupEmailError('please Enter email ');
    }else if (!validateEmail(emailsingup)) {
      setSignupEmailError('Invalid email format');
      return;
    } else {
      setSignupEmailError('');
    }
    if(!passwordsingup){
      setPasswordError('please Enter passwor ');
    } else {
      setPasswordError('');
    }

  const apicall=async()=>{
    try {    
      let res=await register({
        firstname:firstname,
        lastname:lastname,
        email:emailsingup,
        password:passwordsingup})
      console.log(res)

      if(res.ok){
       toast.success(res.data.message)
       setChangepage(!changepage)
      }
      if(!res.ok){
        return toast.error(res?.data?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  if(firstname && lastname && email && password){
     apicall()
} 

  };

  return (
    <div style={{
      marginTop: "-22px",
      backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdeMrtXbj94ZWlC2Gh45_h7YJ5lF66OEbO9Q&s")', // Add your image path here
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh', // Full height of the viewport
    }}
  >
   
    <Container component="main" maxWidth="xs" sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: "center",
      // mt: 8,
    }}>
      {changepage === false ? (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor:"rgb(226 219 219 / 72%)",
          height: "67vh",
          justifyContent: "center",
          borderRadius: "10px",
          mt: 8,
        }}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "450px", paddingLeft: "50px", paddingRight: "50px" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passworderror}
              helperText={passworderror}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ?  <MdVisibility />: <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography component="h1" variant="contained" sx={{
              fontSize: "15px",
              // color: "blue"
            }}
             >
              have an account<span style={{color:"blue",cursor: "pointer",
              fontSize: "15px",}}  onClick={() => setChangepage(true)}> Sing Up</span>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "150px" }}
                onClick={handleSubmit}>
                Sign In
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: "600px",
          backgroundColor:"rgb(226 219 219 / 72%)",
          justifyContent: "center",
          borderRadius: "10px",
          mt: 8,
        }}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignupSubmit} noValidate sx={{ mt: 1, width: "450px", paddingLeft: "50px", paddingRight: "50px" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="First Name"
              name="firstname"
              autoComplete="first name"
              autoFocus
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              error={!!firstnameError}
              helperText={firstnameError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              error={!!lastnameError}
              helperText={lastnameError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="signup-email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={emailsingup}
              onChange={(e) => setEmailsingup(e.target.value)}
              error={!!signupEmailError}
              helperText={signupEmailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="signup-password"
              autoComplete="current-password"
              value={passwordsingup}
              onChange={(e) => setPasswordsingup(e.target.value)}
              error={!!passworderror}
              helperText={passworderror}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ?  <MdVisibility />: <MdVisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
           
            <Typography component="h1" variant="contained" sx={{
              cursor: "pointer",
              fontSize: "15px",
              color: "blue"
            }}
             >
               have an account<span style={{color:"blue",cursor: "pointer",
              fontSize: "15px",}}  onClick={() => setChangepage(false)}> Sing In</span>

            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "150px" }}
                onClick={handleSignupSubmit}
                >
                Sign Up

              </Button>
            </Box>
          </Box>
        </Box>
      )}
    <ToastContainer
  position="top-right"
  autoClose={3000}
 
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>
    </Container>
    </div>
  );
};

export default Login;
