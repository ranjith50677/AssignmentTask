import React, { useEffect, useState } from 'react';
import CustomizedTables from '../component/table';
import { getAll } from '../api/index.js';
import { Box, Button } from '@mui/material';
// import Arrow from "@mui/icons-material/ArrowBackRounded";

import FullWidthGrid from '../component/from.js';

function Dashboard() {
const [tabledata,setTabledata]=useState([])
const [view,setView]=useState(false)
const [updataval,setUpdataval]=useState("")


const data=async()=>{
let res=await getAll()
console.log(res)
setTabledata(res.data)

}
useEffect(()=>{
  data()
},[])

  return (
    <>
    <div>
   {view===false?
   <> <Box sx={{ display: "flex", justifyContent: "end", alignItems: "end",padding:"30px" }}>
              <Button
                type="update"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "150px" }}
                onClick={()=>{setView(!view)}}
                >
                UpDate
              </Button>
            </Box>
     <div style={{padding:"10px"}}>
      <div style={{padding:"10px",backgroundColor:"gray",borderRadius:"10px"}}>
     <CustomizedTables tabledata={tabledata} setUpdataval={setUpdataval}   />
      </div>
     </div>
     </>:
     <div style={{padding:"20px"}}>
      <div style={{padding:"10px",backgroundColor:"gray",borderRadius:"10px"}}>
      <div style={{padding:"10px",backgroundColor:"gray",borderRadius:"10px",marginTop:"10px"}}>
      <div style={{cursor:"pointer",borderRadius:"50%",display:"flex",alignItems:"center","justifyContent":"center"}}>
      {/* <Arrow/> */}
      </div>
      </div>
     <FullWidthGrid setView={setView} view={view} updataval={updataval}/>
     </div>
     </div>
     }
  </div>
  </>
  );
}

export default Dashboard;
