import React, { Suspense } from 'react';
import { Row, Col, Spin } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import CoinListTable from './coinTable';

const Dashboard = () => {
  return (
    <>
      <PageHeader
        ghost
        title="Coin List"
      />
      <Main>
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Cards headless>
              <div style={{ minHeight: 'calc(100vh - 320px)' }}>
                <Col xs={24}>
                <Suspense
                    fallback={
                      <div className="spin">
                        <Spin />
                      </div>
                    }
                  >
                  <CoinListTable />
                  </Suspense>
                </Col>
              </div>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Dashboard;
