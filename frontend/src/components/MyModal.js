import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Login from "./Login";
import Register from "./Register";
import { Container, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
const MyModal = (props) => {
  const [key, setKey] = useState("login");
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body className="show-grid">
        <Container>
          <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
            <Tab eventKey="login" title="login">
                <Login/>
            </Tab>
            <Tab eventKey="signup" title="signup">
                <Register/>
            </Tab>
          </Tabs>
        </Container>
      </Modal.Body>
      <Modal.Footer className="foot">
        <Button onClick={props.onHide} className="md-2">Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
