import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

const Dashboard = lazy(() => import('../container/dashboard'));

const DashboardRoutes = () => {
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
