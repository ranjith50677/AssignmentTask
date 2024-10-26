// import React, { useState } from 'react';
// import Papa from 'papaparse';
// import { Button, Container, Typography, Box } from '@mui/material';

// const CsvUploader = () => {
//   const [data, setData] = useState([]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       Papa.parse(file, {
//         header: true, // Use the first row as header
//         skipEmptyLines: true,
//         complete: (results) => {
//           setData(results.data); // results.data is an array of objects
//         },
//         error: (error) => {
//           console.error("Error parsing CSV:", error);
//         }
//       });
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         CSV File Upload
//       </Typography>
//       <Box mb={2}>
//         <input
//           type="file"
//           accept=".csv"
//           id="csv-upload"
//           style={{ display: 'none' }}
//           onChange={handleFileChange}
//         />
//         <label htmlFor="csv-upload">
//           <Button variant="contained" component="span">
//             Upload CSV
//           </Button>
//         </label>
//       </Box>
//       {data.length > 0 && (
//         <Box>
//           <Typography variant="h6">Parsed Data:</Typography>
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default CsvUploader;

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, TextField } from '@mui/material';
import { profile } from '../api';

export default function FullWidthGrid({setView,view,updataval}) {
  const [email, setEmail] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [erro, setErro] = React.useState({
    firstnameerror:"",
    lastnamerror:"",
    emailerror:"",
  });



React.useEffect(()=>{
const response=()=>{
  let res=profile()
}
},[])



const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateName = (name) => {
  const regex = /^[a-zA-Z]*$/;
  return regex.test(name) && name.length <= 100;
};

const handleSignupSubmit = (event) => {
  event.preventDefault();
  
  if (!validateName(firstname)) {
    setErro((pre)=>({...pre,firstnameerro:"First name must be alphabetic and max 100 characters"}));
  } else {
    setErro((pre)=>({...pre,firstnameerro:" "}));
  }

  if (!validateName(lastname)) {
    setErro((pre)=>({...pre,lastanmeerro:"last name must be alphabetic and max 100 characters"}));
    return;
  } else {
    setErro((pre)=>({...pre,lastnamerror:""}));
  }

  if (!validateEmail(email)) {
      setErro((pre)=>({...pre,emailerror:"Invalid email format"}));
  } else {
  setErro((pre)=>({...pre,emailerror:""}));
    }
}

  
// const apicall=async()=>{
//   try {    
//     let res=await register({
//       firstname:firstname,
//       lastname:lastname,
//       email:emailsingup,
//       password:passwordsingup})
//     console.log(res)
//     setEmail("")
//     setPassword("")
//     if(res.ok){
//       return alert(res.message)
//     }
//     if(!res.ok){
//       return alert(res?.message)
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }
// if(!emailError||!passworderror){
//    apicall()
// } 

// };

  return (
    <Box sx={{ flexGrow: 1 ,padding:"50px"}}>
      
      <Grid container spacing={2}>
        <Grid item xs={6} md={6} sx={{padding:"20px"}} >
          {/* <Item>xs=6 md=8</Item> */}
          <TextField
              margin="normal"
              required
              fullWidth
              name="fristname"
              label="fristname"
              type="fristname"
              id="fristname"
              autoComplete="current-fristname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
        </Grid>
        <Grid item xs={6} md={6} sx={{padding:"20px"}}>
          {/* <Item>xs=6 md=4</Item> */}
          <TextField
              margin="normal"
              required
              fullWidth
              name="lastname"
              label="lastname"
              type="lastname"
              id="lastname"
              autoComplete="current-lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
        </Grid>
        <Grid item xs={6} md={6} sx={{padding:"20px"}}>
          {/* <Item>xs=6 md=4</Item> */}
          <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="email"
              type="email"
              id="email"
              autoComplete="current-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
        </Grid>
        <Grid item xs={6} md={6} sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Button
                type="update"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "150px" }}
                onClick={()=>setView(!view)}
                >
               Submit
              </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
