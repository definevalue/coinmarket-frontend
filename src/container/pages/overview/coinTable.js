import React, { useState, useEffect } from 'react';
import { Table, Spin } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { Link } from 'react-router-dom';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { Tag } from '../../../components/tags/tags';
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
  const [state, setState] = useState({
    values: {},
  });
  const [coins, setCoins] = useState([]);
  const [totalCnt, setTotalCnt] = useState([]);
  const usersTableData = [];
  const pageSize = 100;
  
  const getCryptos = (start, limit, sortCol, sortDir) => {
    fetch("/api/cryptos/getCryptos", options({ start, limit, sortCol, sortDir }))
    .then(res => res.json())
    .then(res => {
      
      setTotalCnt(res.result.status.total_count);
      const arr = res.result.data.map((item) => {
          return {
            name: item.name !== undefined ? item.name : 'unknown',
            symbol: item.symbol !== undefined ? item.symbol : 'unknown',
            imageUrl: item.id + '.png',
            price: item.quote.USD !== undefined ? "$" + numberFormat(item.quote.USD.price) : '',
            percent_change_7d: item.quote.USD !== undefined ? numberFormat(item.quote.USD.percent_change_7d) : '',
            percent_change_1h: item.quote.USD !== undefined ? numberFormat(item.quote.USD.percent_change_1h) : '',
            volume_24h: item.quote.USD !== undefined ? numberFormat(item.quote.USD.volume_24h) : '',
            market_cap: item.quote.USD !== undefined ? "$" + numberFormat(item.quote.USD.market_cap) : '',
          };
        });
        setCoins(arr);
    });
  };

  useEffect(() => {
      getCryptos(1, pageSize, 'market_cap', 'desc');
    }, []);

  coins.map((user, index) => {
    const { name, symbol, imageUrl, price, percent_change_7d, percent_change_1h, volume_24h, market_cap} = user;

    return usersTableData.push({
      key: index,
      name: name,
      symbol: symbol,
      crypto: (
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
      percent_change_7d: percent_change_7d * 1 > 0 ? <Tag color="#87d068">{percent_change_7d}%</Tag> : <Tag color="#f50">{percent_change_7d}%</Tag>,
      percent_change_1h: percent_change_1h * 1 > 0 ? <Tag color="#87d068">{percent_change_1h}%</Tag> : 
      <Tag color="#f50">{percent_change_1h}%</Tag>,
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
      dataIndex: 'crypto',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Price($)',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['descend'],
    },
    {
      title: 'Change(week)',
      dataIndex: 'percent_change_7d',
      key: 'percent_change_7d',
      sorter: (a, b) => a.percent_change_7d - b.percent_change_7d,
      sortDirections: ['descend'],
    },
    {
      title: 'Change(hour)',
      dataIndex: 'percent_change_1h',
      key: 'percent_change_1h',
      sorter: (a, b) => a.percent_change_1h - b.percent_change_1h,
      sortDirections: ['descend'],
    },
    {
      title: 'Market Cap',
      dataIndex: 'market_cap',
      key: 'market_cap',
      sorter: (a, b) => a.market_cap - b.market_cap,
      sortDirections: ['descend'],
    },
    {
      title: 'Detail',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
      sorter: (a, b) => a.name - b.name,
      sortDirections: ['descend'],
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    // return (    
    //   <Spin size="large" />
    // )
    const { current, pageSize } = pagination;
    const sortCol = sorter.columnKey != undefined ? sorter.columnKey : "market_cap";
    const sortDir = sorter.order !== undefined && sorter.order === "descend" ? "desc" : "asc";
    getCryptos((current - 1) * pageSize + 1 , pageSize, sortCol, sortDir);
  }

  return (
    <Cards headless>

      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          
          <Table
            className="table-responsive"
            // rowSelection={rowSelection}
            dataSource={usersTableData}
            columns={usersTableColumns}
            pagination={{
              defaultPageSize: pageSize,
              total: totalCnt,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
            onChange={onChange}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
};

export default CoinListTable;
