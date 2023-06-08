import React from 'react'
import { Card, Col, Text, Title } from '@tremor/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Benefice } from '@/hooks/useBenefice';

// Esto no tiene que estar
import clarologo from '../assets/claro-logo.png';

type typeProp = {
  title?: string
  Benefice: Benefice[] | undefined
}

const styles = {
  backgroundSize: 'fit-content',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};


export default function TheBestComponent({ title, Benefice }: typeProp) {
  return (

    <Col numColSpan={12} className=' mx-2'>
      <Title className='ml-2 mb-4'>{title}</Title>
      <Swiper
        className='select-none'
        spaceBetween={20}
        slidesPerView={'auto'}
        slideClass='max-w-fit'
      >


        {Benefice && Benefice.map((benefice, index) => (
            <SwiperSlide key={index} className='max-w-fit h-32 ml-2'>
              <div
                key={index}
                className={`w-[180px] h-[78px] rounded-lg shadow-md border bg-primary-50  flex  items-center justify-center `}
                style={{
                  ...styles,
                  backgroundImage: `url(${benefice.image_1})`
                }}
              >
                <div className='flex  flex-col items-center gap-5'>
                  <Text className={`font-bold  text-1xl text-primary flex justify-start  ${(benefice.category === "viajes") ? 'text-white' : "text-black"}  w-[150px]`}>{benefice.description.substring(0, 4)}</Text>
                  <Text className={`font-normal text-sm 
                ${(benefice.category === "viajes") ? 'text-white' : "text-black"}  flex justify-end  w-[150px]`}>{benefice.description.substring(4)}</Text>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </Col>
  )
}
