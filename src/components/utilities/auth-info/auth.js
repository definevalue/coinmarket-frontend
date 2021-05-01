import React from 'react';
import { Button } from '../../buttons/buttons';
import { NavLink } from 'react-router-dom';

const Auth = () => {
  return (
    <>
        <Button className="btn-today" type="white" outlined>
            <NavLink to="/login">Sign In</NavLink>
        </Button>
        <Button className="btn-primary" type="primary">
            <NavLink to="/register">Sign Up</NavLink>
        </Button>
        
    </>
  );
};

export default Auth;
