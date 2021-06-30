import React, { Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Spin } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import CoinListTable from './coinTable';
import AdvertSlider from './advertSlider';
import { setBlur } from '../../redux/themeLayout/actionCreator';

const options = data => {
  return {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
  };
};


const Dashboard = () => {
  const { isBlur } = useSelector(state => {
    return {
      isBlur : state.ChangeLayoutMode.isBlur,
    };
  });
  const dispatch = useDispatch();
  const setUserLog = () => {
    fetch('/api/users/setLog', options({"page" : "dashboard"})).then(res => res.json()).then(res => {
        if (res.logCnt === 1) {
          dispatch(setBlur("blur"))
        } else {
          dispatch(setBlur("noblur"))
        }
    });
  }
  const handleClickOutside = ( event ) => {
    dispatch(setBlur("noblur"))
  };
  useEffect(() => {
    setUserLog();
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  
  return (
    <>
      <Main>
      <Row gutter={25} className="advert">
        <Col xs={24} sm={24}>
          <AdvertSlider />
        </Col>
      </Row>
        <Row gutter={25} className={isBlur}>
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
