import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Login from "./Login";
import Register from "./Register";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
const MyModal = (props) => {
  // const [activeTab, setActiveTab] = useState("signup");

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
    
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body className="show-grid">
        
          <Tabs
            // defaultActiveKey="login"
            // onSelect={(e)=>setActiveTab(e.target.value)}
            // value={activeTab}
            className="mb-3"
          >
            <Tab eventKey="login" title="Login">
              <Login />
            </Tab>
            <Tab eventKey="signup" title="Register">
              <Register />
            </Tab>
          </Tabs>
       
      </Modal.Body>
      {/* <Modal.Footer className="foot">
        <Button onClick={props.onHide} className="md-2">Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default MyModal;
