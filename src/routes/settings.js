import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

const Settings = lazy(() => import('../container/settings'));

// const NotFound = () => {
//   return <Redirect to="/" />;
// };

const FrontendRoutes = () => {
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route exact path="/settings" component={Settings} />
      </Suspense>
    </Switch>
  );
};

export default MainLayout(FrontendRoutes);
