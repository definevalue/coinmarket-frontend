import React from 'react';
import FeatherIcon from 'feather-icons-react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import ReCAPTCHA from "react-google-recaptcha";
import { Form, Input, Button, notification } from 'antd';

import { AuthWrapper } from './style';
import Heading from '../../../../components/heading/heading';
  
const options = data => {
  return {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
  };
};

const SignUp = () => {
  // const [state, setState] = useState({
  //   values: null,
  //   checked: null,
  // });
  
  // const [res, setRes] = useState(true);
  var verifyCallback = function (response) {
    console.log(response)
    
  };

  const handleSubmit = values => {
    // console.log(values); return;
    // values.token = token
    // console.log(values)
    fetch('/api/users/signup', options(values)).then(res => res.json()).then(res => {
      if (res.status === "success") {
        notification["success"]({
          message: 'Success',
          description:
            'signed.',
        });
      } else {
        notification["error"]({
          message: 'Error',
          description:
            res.message,
        });
      }
    });
  };

  return (
    <AuthWrapper>
      <div className="text-right">
        <Button className="" type="white"><NavLink to="/"><FeatherIcon icon="x" size="20"/></NavLink></Button>
      </div>
      <div className="auth-contents">
        <Form name="register" onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Sign Up 
          </Heading>
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your Full name!' }]}>
            <Input placeholder="Full name" />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input placeholder="name@example.com" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <div style={{ marginBottom: '10px' }}>
            <ReCAPTCHA
              sitekey={`6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`}
              onChange={verifyCallback}
            />
          </div>
          <Form.Item>
            <Button className="btn-create" htmlType="submit" type="primary" size="large" onSubmit={handleSubmit}>
              Create Account
            </Button>
          </Form.Item>
          <p className="auth-notice">
            Already have an account? 
            <NavLink to="/login">Sign In</NavLink>
          </p>
        </Form>
        
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
