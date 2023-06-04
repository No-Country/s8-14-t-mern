import { Text } from "@tremor/react";
import { Link } from "react-router-dom";
import 'swiper/css';

import plus from '../assets/plus.svg';
import airplane from '../assets/airplane.svg';
import dolar from '../assets/dolar.svg';
import recharge from '../assets/recharge.svg';

interface ActionItem {
  title: string;
  href: string;
  icon: string;
}

const ACTION_ITEMS: ActionItem[] = [
  { title: "Agregar dinero", href: "/addFunds", icon: plus },
  { title: "Transferir dinero", href: "/newTransfer/receiver", icon: airplane },
  { title: "Ver cotizaciones", href: "/cripto", icon: dolar },
  { title: "Hacer una recarga ", href: "/Recharge", icon: recharge }
]


const PanelHome = (): JSX.Element => {
  return (
    <div className='flex justify-center'>
      <div className='
      absolute
      top-32
        w-[22rem] 
        h-28
        flex 
        gap-2
        justify-center 
        items-center
        bg-white
        rounded-lg
        shadow-md
        '
      >

        {ACTION_ITEMS.map((info) => (
          <Link to={info.href}>
            <div className='w-20  h-24 flex flex-col items-center '
            >
              <div className='
                h-12 
                w-12 
                flex 
                justify-center 
                text-[#3B1B80]
                bg-[#F5F2FF]
                rounded-full '>
                <img className='w-6' src={info.icon} alt="" />
              </div>
              <Text className='text-center text-sm text-black mt-2'>{info.title}</Text>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PanelHome;