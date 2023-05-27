import HeaderBackButton from '@/components/HeaderBackButton'
import { Card, Col, Flex, Grid, Icon, Subtitle, TextInput, Title, Text } from '@tremor/react'
import { FilmIcon, SearchIcon, ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import { ComponentType, SVGProps } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface ListItemType {
  title: string;
  ListIcon: ComponentType<SVGProps<SVGSVGElement>>;
}


const CATEGORY_ITEMS: ListItemType[] = [
  {
    title: "Entrenamiento",
    ListIcon: FilmIcon
  },
  {
    title: "Compras",
    ListIcon: ShoppingBagIcon
  },
  {
    title: "Supermercado",
    ListIcon: ShoppingCartIcon
  }
]


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



export default function BenefitPage() {
  return (
    <div className='p-1 w-96'>
      <HeaderBackButton title="Beneficios"/>
      <Grid numColsSm={12} className='mt-8'>
        <Col numColSpan={12} className='flex justify-center'>
          <TextInput icon={SearchIcon} placeholder='Busco un veneficio' className='bg-slate-300 p-2' />
        </Col>

        <Col numColSpan={11} className='mt-10'>
          <Title className='mb-6'> Selecinar la categoria</Title>
          <Flex className='justify-around my-4 '>
            {CATEGORY_ITEMS.map((item, index) => (
              <div className='flex flex-col items-center'>
                <Card key={index} className='w-16 h-16 flex justify-center bg-slate-600'>
                  <Icon icon={item.ListIcon} />
                </Card>
                <Subtitle className='w-full text-center'>
                  {item.title}
                </Subtitle>
              </div>
            ))}
          </Flex>
        </Col>
        <Col numColSpan={12} className='mt-10'>
          <Title  className='mb-6'> Lo mas frecuente</Title>
          <div>

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
          </div>
        </Col>
      </Grid>
    </div>
  )
}
