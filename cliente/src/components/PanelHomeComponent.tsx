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
      absolute
      top-36
        w-11/12 
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
              onClick={() => {
                navigate(info.href)
                console.log(info.href);

              }}
            >
              <Icon icon={info.ListIcon}
                className='
                h-12 
                w-12 
                flex 
                justify-center 
                text-[#3B1B80]
                bg-[#F5F2FF]
                rounded-full 
                '
              ></Icon>

              <Text className='text-center text-sm text-black mt-2'>{info.title}</Text>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PanelHome;