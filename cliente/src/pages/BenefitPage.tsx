import { ComponentType, SVGProps, useEffect, useRef, useState } from 'react';
import HeaderBackButton from '@/components/HeaderBackButton'
import { Card, Col, Icon, Text, TextInput, Title } from '@tremor/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useBenefice from '@/hooks/useBenefice';
import { FilmIcon, SearchIcon, ShoppingBagIcon, ShoppingCartIcon, GlobeIcon } from '@heroicons/react/outline'

import DescountAndReintegro from '@/components/DescountAndReintegro';
import TheBestComponent from '@/components/TheBestComponent';

interface ListItemType {
  category: string;
  ListIcon: ComponentType<SVGProps<SVGSVGElement>>;
}


const CATEGORY_ITEMS: ListItemType[] = [
  {
    category: "diversion",
    ListIcon: FilmIcon
  },
  {
    category: "shopping",
    ListIcon: ShoppingBagIcon
  },
  {
    category: "compras",
    ListIcon: ShoppingCartIcon
  },
  {
    category: "viajes",
    ListIcon: GlobeIcon
  }
]

export default function BenefitPage() {

  const { handdleCategory, TheBest, Refound, Descount } = useBenefice();
  function OnCategory(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    handdleCategory(event.currentTarget.id)
  }

  useEffect(() => {
    handdleCategory('compras')
  }, [])

  return (
    <div>
      <HeaderBackButton title="Beneficios" />
      <div>

        <Col numColSpan={12} className='flex justify-center mt-4'>
          <div className=' p-1  outline outline-1 outline-black rounded-md'>
            <TextInput icon={SearchIcon} placeholder='Buscá un beneficio' className=' border-none bg-primary-50 p-2 w-[320px] text-[14px]' />
          </div>
        </Col>

        <Col className='p-4'>
          <Title className='mb-4'>Busca por categoria</Title>
          <div className='flex justify-center  w-full gap-9'>
            {CATEGORY_ITEMS.map((item, index) => (
              <div key={index} className='w-20 h-auto flex items-center justify-center  '>
                <button className=' h-16  w-16  text-center  text-[#3B1B80] bg-secondary-200 rounded-xl'>
                  <Icon id={item.category} icon={item.ListIcon} className='text-[#3B1B80]' onClick={OnCategory} />
                </button>
              </div>
            ))}
          </div>
        </Col>
        
        <Col className=' h-full z-10'>
          {Refound?.length !== 0 && <DescountAndReintegro title="Reintegros" Benefice={Refound} />}
          {Descount?.length !== 0 && <DescountAndReintegro title="Descuentos" Benefice={Descount} />}
          {TheBest?.length !== 0 && <TheBestComponent title='Los mejores descuentos & reitegros' Benefice={TheBest} />}
        </Col>
      </div>
    </div>
  )
}
