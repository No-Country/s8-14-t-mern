import { Link } from 'react-router-dom';
import { Col, Text, Title } from '@tremor/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Benefice } from '@/hooks/useBenefice';


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
        {(Benefice?.length === 0)
          ?
          <>
            <div className='w-full h-20  ml-2 flex justify-center items-center'>
              <h1 className='text-center '>  NO HAY POR EL MOMENTO</h1>
            </div>
          </>
          :
          Benefice && Benefice.map((benefice, index) => (
            <SwiperSlide key={index} className='max-w-fit h-32  ml-2'>
              <Link to={`/benefice/${benefice.id}`}>
                <div className="w-[110px] h-[103px] rounded-xl shadow-md border bg-white ">
                  <div className='h-11  border-primary rounded-t-xl bg-primary-50 flex justify-center items-center'>
                    <Text className='text-xl font-bold text-primary'>{benefice.description.substring(0, 4)}</Text>
                  </div>
                  <div className='h-16 rounded-b-xl w-full flex justify-center items-center '>
                    {
                      benefice.category !== "viajes" &&
                      <img src={benefice.image_1} className='text-center w-16' alt="" />
                    }
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </Col>
  )
}
