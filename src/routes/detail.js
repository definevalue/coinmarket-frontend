import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Switch } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Detail from '../container/detail';

const DetailRoutes = (data) => {
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
