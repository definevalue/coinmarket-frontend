import React from 'react';
import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

const Detail = ({dataId}) => {
  return (
    <>
      <PageHeader
        ghost
        title="Detail/"
      />
      <Main>
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Cards headless>
              <div style={{ minHeight: 'calc(100vh - 320px)' }}>
                <Col xs={24}>
                <TradingViewWidget
                    symbol={`${dataId}`}
                    theme={Themes.LIGHT}
                    locale="en"
                    autosize
                />
                </Col>
              </div>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Detail;
