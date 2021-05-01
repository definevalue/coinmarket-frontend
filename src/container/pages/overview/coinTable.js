import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { symbol } from 'prop-types';

const options = data => {
  return {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(data)
  };
};

const numberFormat = (value) => {
  return value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const CoinListTable = () => {
  const [coins, setCoins] = useState([]);
  const usersTableData = [];
  
  useEffect(() => {
    const data = {
      "start" : 1,
      "limit" : 100
    }
      const getCryptos = () => {
        fetch("/api/cryptos/getCryptos", options(data))
        .then(res => res.json())
        .then(res => {
            const arr = res.result.data.map((item) => {
              return {
                name: item.name !== undefined ? item.name : 'unknown',
                symbol: item.symbol !== undefined ? item.symbol : 'unknown',
                imageUrl: item.id + '.png',
                price: item.quote.USD !== undefined ? "$" + numberFormat(item.quote.USD.price) : '',
                percent_change_7d: item.quote.USD !== undefined ? numberFormat(item.quote.USD.percent_change_7d) + '%' : '',
                percent_change_1h: item.quote.USD !== undefined ? numberFormat(item.quote.USD.percent_change_1h) + '%' : '',
                volume_24h: item.quote.USD !== undefined ? numberFormat(item.quote.USD.volume_24h) : '',
                market_cap: item.quote.USD !== undefined ? "$" + numberFormat(item.quote.USD.market_cap) : '',
              };
            });
            setCoins(arr);
        });
      };
      getCryptos();
    }, []);

  coins.map((user, index) => {
    const { name, symbol, imageUrl, price, percent_change_7d, percent_change_1h, volume_24h, market_cap} = user;

    return usersTableData.push({
      key: index,
      user: (
        <div className="user-info">
          <figure>
            <img style={{ width: '40px' }} src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${imageUrl}`} alt="" />
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
      market_cap: market_cap,
      action: (
        <div className="table-actions">
          <>
            <Button className="btn-icon" type="primary" to="#" shape="circle" >
              <Link key="id" to={`/detail/${symbol}`}><FeatherIcon icon="eye" size={16} /></Link>
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
      title: 'Market Cap',
      dataIndex: 'market_cap',
      key: 'market_cap',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            // rowSelection={rowSelection}
            dataSource={usersTableData}
            columns={usersTableColumns}
            pagination={{
              defaultPageSize: 100,
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
