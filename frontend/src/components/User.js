import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from 'axios'
// axios.defaults.withCredentials=true
const User = () => {
  const history=useNavigate();
  const [user, setUser] = useState();
  const logout=async()=>{
    const res=await fetch("http://localhost:5000/user/logout",{
      method:"GET",
      mode:"cors",
      credentials:"include",
      headers:{
        "Content-type":"application/json"
      }
    })
    const data=res.json();
    return data;
  }
  const sendRequest = async () => {
    // const token = Cookies.getItem('jwt');
    const res = await fetch("http://localhost:5000/user", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${Cookies.getItem('jwt')}`,
      },
    });
    const data = await res.json(); // wait for the Promise to resolve
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
    });
  }, []);
  const handelLogout=(e)=>{
    try {
      logout();
      history('/');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <div className="box">
      <div className="header">
        {user && (
          <>
          <h1>
            Welcome {user.firstName} {user.lastName} to potrolipi.
          </h1>
          <p>{user.email}</p>
          </>
        )}
        <button className="btn" onClickCapture={handelLogout}>Logout</button>
      </div>
      
        <div className="search_bar">
          <input type="text" className="search-input" />
          <button className="btn">Search</button>
        </div>
      </div>
    </>
  );
};

export default User;
