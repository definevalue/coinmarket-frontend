import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import { NavLink } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/actionCreator';
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

const SignIn = () => {
  // const [key, setKey] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(state => state.auth.loading);
  const isSigned = useSelector(state => state.auth.isSigned);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isSigned === true)
      history.push("/");
  }, [isSigned, history])
  
  const handleSubmit = (values) => {
    fetch('/api/users/login', options(values))
    .then(res => res.json())
    .then(res => {
      if (res.status === 'success') {
        Cookies.set("isSigned", true);
        Cookies.set("jwt", res.token);
        Cookies.set("signedUser", JSON.stringify(res.data));
        notification["success"]({
          message: 'Success',
          description:
            "Welcome Signin!",
        });
        const data = {
          isSigned: true,
          signedUser: res.data
        }
        return dispatch(login(data));
      } else {
        notification["error"]({
          message: 'Error',
          description:
            res.message,
        });
      }
    })
  };

  return (
    <AuthWrapper>
      <div className="text-right">
        <Button className="" type="white"><NavLink to="/"><FeatherIcon icon="x" size="20"/></NavLink></Button>
      </div>
      
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Sign in 
          </Heading>
          <Form.Item
            name="username"
            rules={[{ message: 'Please input your username or Email!', required: true }]}
            initialValue="bill"
            label="Username"
          >
            <Input />
          </Form.Item>
          <Form.Item name="password" initialValue="123123" label="Password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
          
            <Button className="btn-signin" htmlType="submit" type="primary" size="large" onSubmit={handleSubmit}>
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </Form.Item>
          <p className="auth-notice">
            Don&rsquo;t have an account? <NavLink to="register">Sign up now</NavLink>
          </p>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
