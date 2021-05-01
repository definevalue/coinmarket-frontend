import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import MainLayout from '../layout/MainLayout';

const Dashboard = lazy(() => import('../container/dashboard'));

const DashboardRoutes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Suspense
                fallback={
                    <div className="spin">
                        <Spin />
                    </div>
                }
            >
            <Route path="/" component={Dashboard} />
            </Suspense>
        </Switch>
    );
};

export default MainLayout(DashboardRoutes);
