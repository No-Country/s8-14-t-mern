import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, Grid, Col, Text } from "@tremor/react";
import 'swiper/css';
import beneficios1 from '../assets/beneficio1.svg'
import beneficios2 from '../assets/beneficio2.svg'
import { Link } from 'react-router-dom';

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
      <Grid numCols={1} className='mt-14'>
        <Col className='w-full p-4'>
          <Col className='w-full justify-between flex'>
            <p className='font-medium'>Beneficios</p>
            <Link to={"/benefit"} className=' text-primary font-medium text-sm'>Ver todos</Link>
          </Col>
          <Swiper
            className='select-none z-0'
            spaceBetween={20}
            slidesPerView={'auto'}
            slideClass='max-w-fit'
          >

            {benefit.map((card, index) => (
              <SwiperSlide key={`benefit-home-${index}`} className='max-w-fit'>
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
