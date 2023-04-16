import React, { useState } from "react";
import axios from "axios";
import '../styles/register.css'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const history=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [inputs,setInputs]=useState({
  //   email:"",
  //   password:""
  // })
  
  // const handelChange = (e)=> {
  //   setInputs((prev)=>({
  //     ...prev,
  //     [e.target.name]:e.target.value
  //   }))
  // }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
   
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    };

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omitPF
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'applic
        },
        body: JSON.stringify(data),
      });
      const conRes = await res.json();
      if (res.status !== 200) throw new Error(conRes);
      
      console.log(conRes);
      history('/user');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit =async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(`http://localhost:5000/login`, {
  //       email,
  //       password
  //     });
  //     console.log(response.data); // do something with the response data
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   console.log( email, password);
  //   setEmail('');
  //   setPassword('')
  // };

  return (
    <div className="form">
      <div className="form-body">
       
       
        <div className="email">
          
          <input
            type="email"
            id="email"
            name="email"
            className="form__input"
            value={email}
            onChange={(e) => handleInputChange(e)}
            placeholder="Email"
          />
        </div>
        <div className="password">
         
          <input
            className="form__input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder="Password"
          />
        </div>
       
      </div>
      <div className="footer">
        <button onClick={ sendRequest} variant="contained" type="submit" className="btn">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
