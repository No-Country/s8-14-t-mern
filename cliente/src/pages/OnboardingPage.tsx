import Buttonc from '@/components/Buttonc'
import { Button, Col, Grid, Icon, Subtitle, Text } from '@tremor/react'
import React, { ComponentType, ReactElement, SVGProps, useState } from 'react'
import {
  PaperAirplaneIcon,
  QrcodeIcon,
  TrendingUpIcon

} from "@heroicons/react/outline";

import transferencias from '../assets/transferenciasOnboarding.svg'
import pagos from '../assets/PagosOnboarding.svg'
import movimientos from '../assets/MovimientosOnboarding.svg'
import { useNavigate } from 'react-router-dom';

interface Onboarding {
  image: string;
  title: string;
  subtitle: string;
  ListIcon: ComponentType<SVGProps<SVGSVGElement>>;
}

const ONBOARDING: Onboarding[] = [
  {
    image: transferencias,
    title: "Transferí dinero",
    subtitle: "Enviá dinero desde tu cuenta Pigmeo a cualquier persona de manera segura.",
    ListIcon: PaperAirplaneIcon,
  },

  {
    image: pagos,
    title: "Pagá con QR",
    subtitle: "Pagá en los locales adheridos con QR y obtené descuentos increíbles.",
    ListIcon: QrcodeIcon,
  },
  {
    image: movimientos,
    title: "Controlá tus movimientos",
    subtitle: "Realizá un seguimiento de tu actividad para controlar tus movimientos.",
    ListIcon: TrendingUpIcon,
  }

];
export default function OnboardingPage(): ReactElement {

  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate()

  const handleCarousel = () => {
    if (currentSlide === 2) navigate('/auth/register')
    setCurrentSlide(currentSlide + 1)
  }

  return (
    <Grid>
      <Col>
        <div className='flex w-full overflow-hidden'>
          <div className={`w-full flex flex-col items-center gap-6 `}>
            <div className='w-full mb-5 flex flex-col items-center relative'>
              <img className='w-full' src={ONBOARDING[currentSlide].image} alt="" />
              <Icon size="lg" className='absolute top-3/4 mt-16 bg-slate-200 rounded-full text-[#3B1B80]' icon={ONBOARDING[currentSlide].ListIcon} />
            </div>
            <div className='w-full flex flex-col items-center text-center '>
              <Text className='w-80 text-2xl text-[#3B1B80]'>{ONBOARDING[currentSlide].title}</Text>
              <Subtitle className='w-5/5 text-lg text-black' >{ONBOARDING[currentSlide].subtitle}</Subtitle>
            </div>
          </div>
        </div>
      </Col>


      <Col className='w-full flex justify-center h-14 gap-4'>
        <input type="radio" name='onboarding' value={currentSlide} checked={currentSlide === 0}/>
        <input type="radio" name='onboarding' value={currentSlide} checked={currentSlide === 1}/>
        <input type="radio" name='onboarding' value={currentSlide} checked={currentSlide === 2}/>
      </Col>

      <Col>

        <Grid className='w-full flex justify-center my-4'>
          <Button className={"w-80 h-11 rounded-3xl bg-primary border-bg-primary hover:bg-primary-700"}
            onClick={handleCarousel}
          >
            {(currentSlide < 2) ? "Siguiente" : "Crear mi cuenta"}
          </Button >
        </Grid>

        <Buttonc
          styled={false}
          href={(currentSlide < 2) ? "/auth/register" : "/auth/login"}
        >{(currentSlide < 2) ? "Saltar" : "Ya tengo cuenta"}</Buttonc>
      </Col>
    </Grid>
  )
}
