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
      <Grid numCols={1} className='mt-14'>
        <Col className='w-full p-4'>
          <Col className='w-full justify-between flex'>
            <Text className='text-lg  text-[#000]'>Beneficios</Text>
            <Text className='text-sm  text-[#3B1B80]'>Ver todos</Text>
          </Col>
          <Swiper
            className='select-none'
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
