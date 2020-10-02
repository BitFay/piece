import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Banner1 from './banner1';
import Banner2 from './banner2';
import Banner3 from './banner3';

SwiperCore.use([Autoplay]);

const useStyles = makeStyles(() => ({
  swiper: {
    // height: '160px',
    // minHeight: '448px'
  },
}));

export default () => {

  const classes = useStyles();

  return (
    <Swiper
      // spaceBetween={50}
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className={classes.swiper}
      slidesPerView={1}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide><Banner1/></SwiperSlide>
      <SwiperSlide><Banner2/></SwiperSlide>
      <SwiperSlide><Banner3/></SwiperSlide>
    </Swiper>
  );
};
