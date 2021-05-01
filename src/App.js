import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import store from './redux/store';
import Dashboard from './routes/dashboard';
import Detail from './routes/detail';
import Auth from './routes/auth';
import './static/css/style.css';
import config from './config/config';

const { theme } = config;
const NotFound = () => {
  return <Redirect to="/" />;
};

const ProviderConfig = () => {
  const { rtl, isLoggedIn, topMenu, darkMode } = useSelector(state => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
    };
  });

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={{ ...theme, rtl, topMenu, darkMode }}>
        <Router basename={process.env.PUBLIC_URL} history={history}>
          <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/register" component={Auth} />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/" component={Dashboard} />
            <Route exact path="*" component={NotFound} />
            {/* <Redirect to="/login" /> */}
          </Switch>
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default hot(App);
