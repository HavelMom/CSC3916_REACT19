// src/components/register.js
import React, { useState } from 'react';
import { submitRegister }    from '../actions/authActions';
import { useDispatch }       from 'react-redux';
import { useNavigate }       from 'react-router-dom';
import { Form, Button }      from 'react-bootstrap';

function Register() {
  const [details, setDetails] = useState({
    name: '',
    username: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateDetails = e => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };

  
  const register = async e => {
    e.preventDefault();
    try {
      await dispatch(submitRegister(details));
      navigate('/signin');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <Form 
        onSubmit={register}                               
        className="register-form bg-dark text-light p-4 rounded"
      >
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={details.name}
            onChange={updateDetails}
          />
        </Form.Group>

        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Username</Form.Label>                
          <Form.Control
            type="text"                                   
            placeholder="Enter username"
            value={details.username}
            onChange={updateDetails}
            autoComplete="username"
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={details.password}
            onChange={updateDetails}
            autoComplete="new-password"
          />
        </Form.Group>

        <Button type="submit">Register</Button>       
      </Form>
    </div>
  );
}

export default Register;
