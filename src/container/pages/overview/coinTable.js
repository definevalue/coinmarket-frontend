import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';

const options = data => {
  return {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
  };
};

const CoinListTable = () => {
  const [coins, setCoins] = useState([]);
  const api_key = process.env.REACT_APP_API_KEY
  const usersTableData = [];

  const data = {
    "start" : 1,
    "limit" : 100
  }

  useEffect(() => {
      fetch("/api/cryptos/getCryptos", options(data))
      .then(res => res.json())
      .then(res => {
          const arr = res.result.data.map((item) => {
            console.log(item.quote.USD.percent_change_7d)
            return {
              name: item.name !== undefined ? item.name : 'unknown',
              symbol: item.sympbol !== undefined ? item.sympbol : 'unknown',
              imageUrl: '',
              price: item.quote.USD !== undefined ? item.quote.USD.price : '',
              percent_change_7d: item.quote.USD !== undefined ? item.quote.USD.percent_change_7d + '%' : '',
              percent_change_1h: item.quote.USD !== undefined ? item.quote.USD.percent_change_1h + '%' : '',
              volume_24h: item.quote.USD !== undefined ? item.quote.USD.volume_24h : '',
            };
            
          });
          setCoins(arr);
      })
    }, [])

  coins.map((user, index) => {
    const { name, imageUrl, price, percent_change_7d, percent_change_1h, volume_24h} = user;

    return usersTableData.push({
      key: index,
      user: (
        <div className="user-info">
          <figure>
            <img style={{ width: '40px' }} src={`https://www.cryptocompare.com${imageUrl}`} alt="" />
          </figure>
          <figcaption>
            <Heading className="user-name" as="h6">
              {name}
            </Heading>
          </figcaption>
        </div>
      ),
      price: price,
      percent_change_7d: percent_change_7d,
      percent_change_1h: percent_change_1h,
      volume_24h: volume_24h,
      status: <span className={`status-text ${status}`}>{status}</span>,
      action: (
        <div className="table-actions">
          <>
            <Button className="btn-icon" type="primary" to="#" shape="circle">
              <FeatherIcon icon="eye" size={16} />
            </Button>
          </>
        </div>
      ),
    });
  });

  const usersTableColumns = [
    {
      title: 'name',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Price($)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Change(week)',
      dataIndex: 'percent_change_7d',
      key: 'percent_change_7d',
    },
    {
      title: 'Change(hour)',
      dataIndex: 'percent_change_1h',
      key: 'percent_change_1h',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  const rowSelection = {
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            rowSelection={rowSelection}
            dataSource={usersTableData}
            columns={usersTableColumns}
            pagination={{
              defaultPageSize: 20,
              total: usersTableData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
};

export default CoinListTable;
