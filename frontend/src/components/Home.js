import React from "react";
import Login from "./Login";
import Register from "./Register";
const Home = () => {
  return (
    <>
      <div className="main">
        <div className="btn">
          <button id="login">Login</button>
          <button id="register">Register</button>
        </div>
        <h4>Welcome to Potrolipi</h4>
        <p>A place of happiness and stressfree Life</p>
      </div>
      
    </>
  );
};

export default Home;
