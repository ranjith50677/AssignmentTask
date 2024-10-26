import React from 'react';
import {
  Container,
  Box,
  Avatar,
  Typography,
  Button,
  Paper,
  Grid,
} from '@mui/material';
import { BiEdit } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import imageavatar from "../assets/imageavatar.jpg"

 
const Profile = ({profileData}) => { 
    console.log(profileData,"pro");
    

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      {/* <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}> */}
        <Box display="flex" flexDirection="column" alignItems="center" marginBottom="10%">
          {/* Avatar */}
          <Avatar
            src={imageavatar}
             alt="Profile Picture"
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          {/* User Info */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {profileData?.firstname} {profileData?.lastname}
          </Typography>
         
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
           <a style={{fontWeight:"bold"}}> Email:</a>{profileData?.email}
            
          </Typography>
          
        </Box>
      
       
      {/* </Paper> */}
    </Container>
  );
};

export default Profile;
