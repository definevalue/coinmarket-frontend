import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import MainLayout from '../layout/MainLayout';
import Detail from '../container/detail';

const DetailRoutes = (data) => {
    // console.log(data.match.params.id)
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
            <Detail dataId={data.match.params.id}/>
            </Suspense>
        </Switch>
    );
};

export default MainLayout(DetailRoutes);
