import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, Grid, Col, Text } from "@tremor/react";
import 'swiper/css';
import beneficios1 from '../assets/beneficio1.svg'
import beneficios2 from '../assets/beneficio2.svg'

const benefit = [
  {
    company: "Coto",
    benefit: "8% descount",
    img: beneficios1
  },
  {
    company: "Mc Donal",
    benefit: "28% descount",
    img: beneficios2
  },
  {
    company: "Burger King",
    benefit: "18% descount",
    img: beneficios2
  },
  {
    company: "Vea Supermarket",
    benefit: "18% descount",
    img: beneficios1
  },
  {
    company: "Vea Supermarket",
    benefit: "18% descount",
    img: beneficios2
  }
]

const Benefits = (): JSX.Element => {

  return (
    <>
      <Grid numCols={1} className='mt-20'>
        <Col className='w-full'>
          <Col className='w-full flex  justify-between items-end px-5'>
            <Text className='text-base font-semibold  text-black'>Beneficios</Text>
            <Text className='text-sm font-medium  text-primary-600'>Ver todos</Text>
          </Col>
          <Swiper
            className='select-none pl-4'
            spaceBetween={20}
            slidesPerView={'auto'}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            slideClass='max-w-fit'
          >

            {benefit.map((card) => (
              <SwiperSlide className='max-w-fit'>
                <div className='w-52 h-28'>
                  <img className='w-full h-full' src={card.img} alt="" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
      </Grid>
    </>
  );
};

export default Benefits;
