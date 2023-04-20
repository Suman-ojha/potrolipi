import React, { useEffect, useState } from "react";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";
// import toast from 'react-hot-toast';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Updateuser = () => {
  const initialValues = { firstName: "", lastName: "", email: "" };
  const history = useNavigate();
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [inputs, setInputs] = useState(initialValues);
  const [inputsError, setInputsError] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const handelChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    // setInputs((inputs) => ({
    //   ...inputs,
    //   [e.target.name]: e.target.value,
    // }));
  };

  // const handleInputChange = (e) => {
  //   const { id, value } = e.target;

  //   if (id === "email") {
  //     setEmail(value);
  //   }
  //   if (id === "password") {
  //     setPassword(value);
  //   }

  // };
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "email is required...";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email";
    }
    // const passwordRegex = /(?=.*[0-9])/;
    // if (!values.password) {
    //   errors.password = "password is required...";
    // } else if (values.password.length < 7) {
    //   errors.password = "Password must be 8 characters long.";
    // } else if (!passwordRegex.test(values.password)) {
    //   errors.password = "Invalid password. Must contain one number.";
    // }

    return errors;
  };
  const sendRequest = async (e) => {
    e.preventDefault();

    const data = {
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      email: inputs.email,
    };

    try {
      const res = await fetch("http://localhost:5000/user", {
        method: "PUT",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omitPF
        headers: {
          "content-Type": "application/json",
          // 'Content-Type': 'applic
        },
        body: JSON.stringify(data),
      });
      const conRes = await res.json();

      if (res.status !== 200) {
        toast.error("Login Error !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        throw new Error(conRes);
      } else {
        toast.success("Login Success !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(conRes);
        history("/user");
      }

      // setEmail('');
      // setPassword('');
    } catch (error) {
      console.log(error);
    }
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    setInputsError(validate(inputs));
    setisSubmit(true);
    sendRequest(e);
    setInputs(initialValues)
  };
  useEffect(() => {
    console.log(InputEvent);
    if (Object.keys(inputsError).length === 0 && isSubmit) {
      console.log(inputs);
    }
  }, [inputsError]);

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
    <>
      <form onSubmit={handelSubmit}>
        <div className="form">
          <div className="form-body">
            <div className="firstName">
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form__input"
                value={inputs.firstName}
                onChange={(e) => handelChange(e)}
                placeholder="FirstName"
              />
            </div>
            <div className="lastName">
              <input
                className="form__input"
                type="text"
                id="lastName"
                name="lastName"
                value={inputs.lastName}
                onChange={(e) => handelChange(e)}
                placeholder="LastName"
              />
            </div>

            <div className="email">
              <input
                type="email"
                id="email"
                name="email"
                className="form__input"
                value={inputs.email}
                onChange={(e) => handelChange(e)}
                placeholder="Email"
              />
            </div>
            <p className="text-danger">{inputsError.email}</p>
          </div>
          <div className="footer">
            <button variant="contained" type="submit" className="btn">
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Updateuser;
