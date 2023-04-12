import React from "react";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
// import MyModal from "./components/MyModal";
import User from "./components/User";
// import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <>
      {/* <Home /> */}

      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route exact path="/user" element={<User />} />
        {/* <Route exact path="*" element={<ErrorPage />} /> */}
      </Routes>
    </>
  );
};

export default App;
