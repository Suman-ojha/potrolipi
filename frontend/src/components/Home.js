import React,{useState} from "react";

import MyModal from "./MyModal";
const Home = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="main">
        <div className="btn">
          <button onClick={() => setShow(true)} className="me-2">Login</button>
          <button onClick={() => setShow(true)} className="me-2">Register</button>
        </div>
        <MyModal show={show} onHide={() => setShow(false)} />
        <h4>Welcome to Potrolipi</h4>
        <p>A place of happiness and stressfree Life</p>
      </div>
      
    </>
  );
};

export default Home;
