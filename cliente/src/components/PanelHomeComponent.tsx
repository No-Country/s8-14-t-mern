import { Swiper, SwiperSlide } from 'swiper/react';
import { Card, Grid, Col, Text, Icon } from "@tremor/react";
import 'swiper/css';
import {
  PlusIcon,
  PaperAirplaneIcon,
  OfficeBuildingIcon,
  ArrowsExpandIcon,
} from "@heroicons/react/outline";
import { ComponentType, SVGProps } from 'react';
import { Link, useNavigate } from "react-router-dom";


interface ActionItem {
  title: string;
  href: string;
  ListIcon: ComponentType<SVGProps<SVGSVGElement>>;
}

const ACTION_ITEMS: ActionItem[] = [
  { title: "Agregar dinero", href: "/addFunds", ListIcon: PlusIcon },
  { title: "Transferir dinero", href: "/newTransfer/receiver", ListIcon: PaperAirplaneIcon },
  { title: "Locales con QR", href: "/Location", ListIcon: OfficeBuildingIcon },
  { title: "Recarga ", href: "/Recharge", ListIcon: ArrowsExpandIcon }
]


const PanelHome = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-center'>
      <div className='
        w-80 
        h-24
        p-2
        flex 
        justify-center 
        bg-slate-200
        rounded-lg
        '
      >

        {ACTION_ITEMS.map((info) => (
          <Link to={info.href}>
            <div className='w-20 h-full flex flex-col items-center'
              onClick={() => {
                navigate(info.href)
                console.log(info.href);

              }}
            >
              <Icon icon={info.ListIcon}
                className='
                h-10 
                w-10 
                flex 
                justify-center 
                text-slate-900
                bg-slate-500 
                rounded-3xl 
                '
              ></Icon>

              <Text className='text-center'>{info.title}</Text>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PanelHome;