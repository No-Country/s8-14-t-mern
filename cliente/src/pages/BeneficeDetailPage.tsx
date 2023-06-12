import HeaderBackButton from '@/components/HeaderBackButton';
import useBenefice from '@/hooks/useBenefice';
import { Button, Card, Col, Grid, Icon, Subtitle, TextInput, Title } from '@tremor/react';
import React, { ComponentType, SVGProps, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import {
  QrcodeIcon,
  LocationMarkerIcon,
  CalendarIcon,
  CheckCircleIcon
} from "@heroicons/react/outline";
import Buttonc from '@/components/Buttonc';
import Loader from '@/components/Loader';
import { UserBeneficeHandler, userBeneficeHandler } from '@/services/benefices';
import { useUserData } from '@/context/UserContext';

export default function BeneficeDetailPage() {
  const { id } = useParams();
  const { getBeneficeByID, Benefice } = useBenefice();
  const [isProcessing, setisProcessing] = useState(false)
  const [isActive, setisActive] = useState(false)

  useEffect(() => {
    if (id) {
      getBeneficeByID(id)
    }
  }, [id])

  interface ListItemType {
    title: string;
    subtitle: string;
    ListIcon: ComponentType<SVGProps<SVGSVGElement>>;
  }

  const MENU_ITEMS_DESCUENTOS: ListItemType[] = [
    {
      title: "Medio de pago",
      subtitle: "Usando el QR con tu saldo de Pigmeo.",
      ListIcon: QrcodeIcon
    },
    {
      title: "Vigencia",
      subtitle: "Desde el 14 de Mayo del 2023 hasta el 01 de Enero del 2024.",
      ListIcon: CalendarIcon
    },
  ]

  const MENU_ITEMS: ListItemType[] = [

    ...MENU_ITEMS_DESCUENTOS,
    {
      title: "Sucursales",
      subtitle: "Palermo y Recoleta.",
      ListIcon: LocationMarkerIcon,

    },
  ];

  const MENU = Benefice?.typeBenefice === "reintegros" ? MENU_ITEMS_DESCUENTOS : MENU_ITEMS

  const { user } = useUserData()
  async function OnActivate() {
    setisProcessing(true)
    if (user.id && Benefice?.id) {
      const { data } = await userBeneficeHandler(
        {
          idUser: user.id,
          active: true,
          idBenefice: Benefice?.id
        }
      )
      if (data.msg === "Beneficio agregado con exito") {
        setisProcessing(false)
        setisActive(true)
      }

    }
  }

  return (
    <div>
      {
        isActive &&
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Col numColSpan={12} className="bg-white flex flex-col  items-center gap-7 rounded-lg w-[334px] h-[328px] p-12 border border-primary-400">
            <div className='w-full text-center flex  flex-col justify-center items-center'>
              <Title className="text-lg font-bold">Reintegro activado</Title>
              <CheckCircleIcon className="w-20 h-20 text-green-500" />
              <p>¡Ya está disponible para que lo aproveches!</p>
            </div>
            <Link to={'/recharge'}>
              <button className="w-56 h-11 rounded-xl bg-primary border-bg-primary hover:bg-primary-700 relative text-white">
                Ir a recargas
              </button>
            </Link>
          </Col>
        </div>
      }
      <HeaderBackButton title={`${Benefice?.typeBenefice}`} />
      <Grid className='p-4 flex flex-col items-center gap-3'>
        <Col numColSpan={12} className='flex justify-center mt-6'>
          <div className='h-28 w-[312px] bg-primary-50 relative rounded-md'>
            <img src={Benefice?.image_1} className='absolute left-3 top-5' alt="" />
            <img src={Benefice?.image_2} className="absolute right-5 mt-0" alt="" />
            <Title className='absolute left-5 mt-16 font-bold'>{Benefice?.description}</Title>
          </div>
        </Col>


        <Col numColSpan={12} className='w-full mt-6'>
          {
            MENU.map((info, index) => (
              <div className={` ${index !== 2 ? "border-b-2" : "border-none"} w-full h-20 my-3`} key={index}>
                <div className='flex gap-0'>

                  <div className='w-1/5 flex justify-center items-start'>
                    <Icon icon={info.ListIcon}></Icon>
                  </div>

                  <div className=' h-16 w-full'>

                    < Title className='text-base font-medium'>
                      {info.title}
                    </Title>
                    <Subtitle className='text-[14px] font-normal'>
                      {info.subtitle}
                    </Subtitle>
                  </div>
                </div>
              </div>
            ))
          }
        </Col>

        {
          Benefice?.typeBenefice === "reintegros" &&
          <Col numColSpan={12} className='mt-10'>
            <button className="w-80 h-11 rounded-xl bg-primary border-bg-primary hover:bg-primary-700 text-white"
              onClick={OnActivate}
            >
              {isProcessing &&
                <Loader />
              }
              {!isProcessing &&
                <>
                  Activar
                </>
              }
            </button>
          </Col>
        }

      </Grid>
    </div >
  )
}
