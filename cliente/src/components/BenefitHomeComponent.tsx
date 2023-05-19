import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, Grid, Col, Text } from "@tremor/react";
import 'swiper/css';

const benefit = [
  {
    company: "Coto",
    benefit: "8% descount"
  },
  {
    company: "Mc Donal",
    benefit: "28% descount"
  },
  {
    company: "Burger King",
    benefit: "18% descount"
  },
  {
    company: "Vea Supermarket",
    benefit: "18% descount"
  },
  {
    company: "Vea Supermarket",
    benefit: "18% descount"
  }
]

const Benefits = (): JSX.Element => {

  return (
    <>
      <Grid numCols={1} className='gap-2'>
        <Col className='w-full justify-between flex p-2'>
          <Text className='text-2xl'>Beneficios</Text>
          <Text className='text-lg'>Ver todos</Text>
        </Col>
        <Col className='w-full p-2'>
          <Swiper
            className='select-none'
            spaceBetween={-80}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >

            {benefit.map((card) => (
              <SwiperSlide>
                <Card
                  className="w-64 h-auto mt-2"
                  decoration="left"
                  decorationColor="indigo"
                >
                  <Text>{card.company}</Text>
                  <Text>{card.benefit}</Text>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
          </Col>
      </Grid>
    </>
  );
};

export default Benefits;
