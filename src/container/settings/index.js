import React from 'react';
import { Row, Col, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import axios from 'axios';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
const LogMng = () => {
  const props = {
    name: 'advertFile',
    action: '/api/settings/uploadAdvert',
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload: file => {
      if (file.type !== 'text/xml') {
        message.error(`${file.name} is not a xml file`);
      } 
      return file.type === 'text/xml' ? true : false;
    },
    onChange: info => {
      if ( info.file.status === 'done' ) {
        if (info.file.response.status === 'success') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.response.status === 'fail') {
          message.error(`${info.file.response.message}`);
        }
      }
    },
    showUploadList: false
  };

  const mooncoinProps = {
    name: 'mooncoinFile',
    action: '/api/settings/uploadMoonCoin',
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload: file => {
      if (file.type !== 'text/xml') {
        message.error(`${file.name} is not a xml file`);
      } 
      return file.type === 'text/xml' ? true : false;
    },
    onChange: info => {
      if ( info.file.status === 'done' ) {
        if (info.file.response.status === 'success') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.response.status === 'fail') {
          message.error(`${info.file.response.message}`);
        }
      }
    },
    showUploadList: false
  };

  return (
    <>
      <PageHeader />
      <Main>
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Cards title={`Advert Content Upload`}>
              <Upload {...props}>
                <Button className="btn-outlined" size="large" type="light" outlined>
                  <UploadOutlined /> Upload
                </Button>
              </Upload>
            </Cards>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col lg={24} xs={24}>
            <Cards title={`Moon Coins Upload`}>
              <Upload {...mooncoinProps}>
                <Button className="btn-outlined" size="large" type="light" outlined>
                  <UploadOutlined /> Upload
                </Button>
              </Upload>
            </Cards>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default LogMng;
