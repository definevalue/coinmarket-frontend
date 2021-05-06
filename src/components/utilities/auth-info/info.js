import React from 'react';
import { Avatar,Switch } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, UserDropDwon } from './auth-info-style';
import { Popover } from '../../popup/popup';
import { logOut } from '../../../redux/authentication/actionCreator';
import Heading from '../../heading/heading';
import Auth from './auth';

const AuthInfo = () => {
  const { isLoggedIn } = useSelector(state => {
    return {
      isLoggedIn: state.auth.login,
    };
  });
  const dispatch = useDispatch();
  // const [state, setState] = useState({
  //   flag: 'english',
  // });

  const SignOut = e => {
    e.preventDefault();
    dispatch(logOut());
  };

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          <img src={require('../../../static/img/avatar/chat-auth.png')} alt="" />
          <figcaption>
            <Heading as="h5">Aleksandr</Heading>
          </figcaption>
        </figure>
        <ul className="user-dropdwon__links">
          <li>
            <Link to="#">
              <FeatherIcon icon="user" /> Profile
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="bell" /> Help
            </Link>
          </li>
        </ul>
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

  return (
    <InfoWraper>
      {!isLoggedIn ? 
        <Auth /> : 
        <div className="nav-author">
          <Popover placement="bottomRight" content={userContent} action="click">
            <Link to="#" className="head-example">
              <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
            </Link>
          </Popover>
          <Switch defaultChecked style={{ marginRight: 20, marginTop: 8 }} />
        </div>
      }
    </InfoWraper>
  );
};

export default AuthInfo;
