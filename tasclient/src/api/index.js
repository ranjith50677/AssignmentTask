let baseurl="http://localhost:7373/api/";

export const register=async(body)=>{
    const requestoption={
        method:"POST",
        mode:"cors",
        header:{
            "content-Type":"application/json"
        },
        body: JSON.stringify(body),
    }
    const response =await fetch (`${baseurl}user/create`,requestoption)
    if(!response.ok){
        let data=await response.json()
        return{data:data,ok:false}
    }
    let data=await response.json()
    return{data:data,ok:true}
}


export const login=async(body)=>{
    const requestoption={
        method:"POST",
        mode:"cors",
        header:{
           "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    }
    const response =await fetch (`${baseurl}user/login`,requestoption)
    if(!response.ok){
        let data=await response.json()
        return{data:data,ok:false}
    }
    let data=await response.json()
    return{data:data,ok:true}
}

export const getByid=async(id)=>{
    const requestoption={
        method:"GET",
        mode:"cors",
        header:{
            "content-type":"application/json"
        },
    }
    const response =await fetch (`${baseurl}user/getuser/:${id}`,requestoption)
    if(!response.ok){
        let data=await response.json()
        return{data:data,ok:false}
    }
    let data=await response.json()
    return{data:data,ok:true}
}


export const getAll=async(body)=>{
    const requestoption={
        method:"GET",
        mode:"cors",
        header:{
            "content-type":"application/json"
        },
        body: JSON.stringify(body),
    }
    const response =await fetch (`${baseurl}user/getalluser`,requestoption)
    if(!response.ok){
        let data=await response.json()
        return{data:data,ok:false}
    }
    let data=await response.json()
    return{data:data,ok:true}
}
export const profile=async()=>{
    let token=localStorage.getItem("token")
    const requestoption={
        method:"GET",
        mode:"cors",
        header:{
            "content-type":"application/json",
            // token:getToken
        },
       
    }
    const response =await fetch (`${baseurl}user/profile`,requestoption)
    if(!response.ok){
        let data=await response.json()
        return{data:data,ok:false}
    }
    let data=await response.json()
    return{data:data,ok:true}
}

export const updateuser=async(body,id)=>{
    const requestoption={
        method:"PUT",
        mode:"cors",
        header:{
            "content-type":"application/json"
        },
        body: JSON.stringify(body),
    }
    const response =await fetch (`${baseurl}user/update/:${id}`,requestoption)
    if(!response.ok){
        let data=await response.json()
        return{data:data,ok:false}
    }
    let data=await response.json()
    return{data:data,ok:true}
}