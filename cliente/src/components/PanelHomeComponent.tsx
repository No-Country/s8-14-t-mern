import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, Grid, Col, Text } from "@tremor/react";
import 'swiper/css';


const panelfunction = ["Agregar dinero", "Transferir dinero", "Locales con QR", "Recarga"]

const PanelHome = (): JSX.Element => {

  return (
    <>
          <Swiper
            className='select-none'
            spaceBetween={20}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >

            {panelfunction.map((card) => (
              <SwiperSlide>
                <Card
                  className="w-28 h-20 mt-2 border-2 border-b-lime-500"
                >
                  <Text>{card}</Text>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
    </>
  );
};

export default PanelHome;
