import React, { useState, useEffect } from "react";
import { AdvertSlider } from '../styled';
import { notification } from "antd";
import Slider from "react-slick";
import Axios from 'axios';

import { Cards } from '../../components/cards/frame/cards-frame';

const Advert = () => {
  const [advertList, setAdvertList] = useState([]);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    Axios.get("/api/cryptos/getAdvertList")
    .then( res => {
      if ( res.data.status === 'success' ) {
        setAdvertList(res.data.data)
      } else {
        notification["success"]({
          message: 'Success',
          description:
            "Welcome Signin!",
        });
      }
    })
    .catch( err => {
      notification["success"]({
        message: 'Success',
        description:
          "Welcome Signin!",
      });
    })
  }, []);

  return (
    <>
      <AdvertSlider>
        <div>
          <Slider {...settings}>
            {advertList.map( (item, index) => {
              return (
                <div className='advertItem' key={index}>
                  <Cards title={item.title} style={{ innerHeight: '100px' }}>
                    <h4>{item.content}</h4>
                  </Cards>
                </div>
              );
            })}
          </Slider>
        </div>
      </AdvertSlider>
    </>
  );
}

export default Advert;