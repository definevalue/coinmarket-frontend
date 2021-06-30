import React from 'react';
import { Avatar, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { useHistory } from "react-router-dom";

import { InfoWraper, UserDropDwon } from './auth-info-style';
import { Popover } from '../../popup/popup';
import { logOut } from '../../../redux/authentication/actionCreator';
import Heading from '../../heading/heading';
import { Button} from '../../buttons/buttons';
import { setMooncoin } from '../../../redux/crypto/actionCreator';

const AuthInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isSigned, signedUser, isMooncoin, refresh } = useSelector(state => {
    return {
      isSigned: state.auth.isSigned,
      signedUser: state.auth.signedUser,
      refresh: state.crypto.refresh,
      isMooncoin: state.crypto.isMooncoin,
      // isSigned: false
    }
  });
  console.log(isMooncoin)

  const SignOut = e => {
    dispatch(logOut());
  };

  const changeMooncoin = values => {
    dispatch(setMooncoin(values))
  }

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          <img src={require('../../../static/img/avatar/chat-auth.png')} alt="" />
          <figcaption>
            <Heading as="h5">{signedUser.name}</Heading>
            <p>UI Expert</p>
          </figcaption>
        </figure>
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

  return (
    <InfoWraper>
      <div className="nav-author">
        {isSigned ? (
          <>
            <Popover placement="bottomRight" content={userContent} action="click">
              <Link to="#" className="head-example">
                <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
              </Link>
            </Popover>
            <Switch style={{ marginRight: 20, marginTop: 7 }} onChange={changeMooncoin}/>
          </>
        ) : (
          <>
          <Button 
            size="default"
            type="light"
            onClick={() => {
              history.push("/login")
            }}
          >
            Sign In
          </Button>
          <Button 
            size="default" 
            type="light" 
            style={{ marginLeft: '10px' }}
            onClick={() => {
              history.push("/register")
            }}
          >
            Sign Up
          </Button>
          </>
         )} 
        
      </div>
    </InfoWraper>
  );
};

export default AuthInfo;
