import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// axios.defaults.withCredentials=true
const User = () => {
  const [user, setUser] = useState();

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

  
  return (
    <div>
      {user && <h1> Welcome {user.firstName} to potrolipi.</h1>}
      <p>users..</p>
    </div>
  )
}

export default User