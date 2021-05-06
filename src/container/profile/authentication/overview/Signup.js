import React, { useState } from 'react';
import FeatherIcon from 'feather-icons-react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { Form, Input, Button, notification } from 'antd';
import { AuthWrapper } from './style';
import Heading from '../../../../components/heading/heading';
// import Recaptcha from 'react-gcaptcha';
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha
} from 'react-google-recaptcha-v3';

  
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
  const [state, setState] = useState({
    values: null,
    checked: null,
  });
  const handleSubmit = values => {
    values.token = token
    // console.log(values)
    fetch('/api/users/signup', options(values)).then(res => res.json()).then(res => {
      if (res.success === "success") {
        notification["success"]({
          message: 'Success',
          description:
            'signed.',
        });
      } else {
        notification["error"]({
          message: 'Error',
          description:
            'wrong.',
        });
      }
    });
  };
  const [token, setToken] = useState();
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
          <GoogleReCaptchaProvider reCaptchaKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI">
            <GoogleReCaptcha onVerify={res => {
            setToken(res);
          }} />
          </GoogleReCaptchaProvider>
          {/* <Recaptcha
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          render="explicit"
          onloadCallback={loaded}
          verifyCallback={callback}
          /> */}

          <Form.Item>
            <Button className="btn-create" htmlType="submit" type="primary" size="large" onSubmit={handleSubmit}>
              Create Account
            </Button>
          </Form.Item>
          <p className="auth-notice">
            Already have an account? 
            <NavLink to="/login">Sign In</NavLink>
          </p>
          <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login signin-social">
            <li>
              <a className="google-signup" href="/">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign up with Google</span>
              </a>
            </li>
            <li>
              <a className="facebook-sign" href="/">
                <FacebookOutlined />
              </a>
            </li>
            <li>
              <a className="twitter-sign" href="/">
                <TwitterOutlined />
              </a>
            </li>
          </ul>
        </Form>
        
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
