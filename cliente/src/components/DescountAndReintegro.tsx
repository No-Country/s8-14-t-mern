import { Col, Text, Title } from '@tremor/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Benefice } from '@/hooks/useBenefice';

// Esto no tiene que estar
import clarologo from '../assets/claro-logo.png';

type typeProp = {
  title: string
  Benefice: Benefice[] | undefined
}

export default function DescountAndReintegro({ title, Benefice }: typeProp) {
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
          <SwiperSlide key={index} className='max-w-fit h-32  ml-2'>
            <div className="w-[110px] h-[103px] rounded-xl shadow-md border bg-white ">
              <div className='h-11  border-primary rounded-t-xl bg-primary-50 flex justify-center items-center'>
                <Text className='text-xl font-bold text-primary'>{benefice.description}</Text>
              </div>
              <div className='h-16 rounded-b-xl w-full flex justify-center items-center '>
                <img src={clarologo} className='text-center' alt="" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Col>
  )
}
