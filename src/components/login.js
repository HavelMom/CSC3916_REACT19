// src/components/login.js
import React, { useState }       from 'react';
import { submitLogin }           from '../actions/authActions';
import { useDispatch }           from 'react-redux';
import { useNavigate }           from 'react-router-dom';
import { Form, Button }          from 'react-bootstrap';

function Login() {
  const [details, setDetails] = useState({
    username: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateDetails = e => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };

  const login = async e => {
    e.preventDefault();
    try {
      await dispatch(submitLogin(details));
      navigate('/movielist');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <Form 
        onSubmit={login}                                    
        className="login-form bg-dark text-light p-4 rounded"
      >
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
            autoComplete="current-password"
          />
        </Form.Group>

        <Button type="submit">Sign In</Button>       
      </Form>
    </div>
  );
}

export default Login;
