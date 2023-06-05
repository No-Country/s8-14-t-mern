import { ReactElement, ComponentType, SVGProps } from "react";
import { useNavigate } from "react-router-dom";

import { Title, Text } from "@tremor/react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import {
  UserIcon,
  MailIcon,
  ChatIcon,
  QuestionMarkCircleIcon,
  LogoutIcon,
} from "@heroicons/react/outline";

import HeaderBackButton from "@/components/HeaderBackButton";

import { useUserData } from "@/context/UserContext";

interface ListItemType {
  title: string;
  href?: string;
  ListIcon: ComponentType<SVGProps<SVGSVGElement>>;
}

const MENU_ITEMS: ListItemType[] = [
  { title: "Mis datos", href: "/personalData", ListIcon: UserIcon },
  { title: "Invitar amigos", href: "/home", ListIcon: MailIcon },
  { title: "Chateá con nosotros", href: "/home", ListIcon: ChatIcon },
  {
    title: "Preguntas frecuentes  ",
    href: "/home",
    ListIcon: QuestionMarkCircleIcon,
  },
  { title: "Cerrar sesión", ListIcon: LogoutIcon },
];

function ProfilePage(): ReactElement {
  const navigate = useNavigate();
  const { deleteUserData, user } = useUserData();

  const logout = () => {
    deleteUserData();
  };

  return (
    <>
      <HeaderBackButton title="Perfil" />
      <div className="flex items-end justify-center bg-primary overflow-hidden">
        <div
          className="rounded-t-[50%] min-w-[150%] pt-10 bg-background
       flex flex-col gap-5 items-center justify-estartnd relative mt-20"
        >
          <img
            src={user?.avatar}
            className="w-20 h-20 rounded-full absolute -top-14 object-cover"
          />
          <Title className="text-black text-lg relative">
            {user?.firstName}
            {user?.lastname}
          </Title>
          <ul className="flex flex-col gap-0 px-4 w-screen  [&>li:not(:last-child)]:border-b-2">
            {MENU_ITEMS.map((item, i) => (
              <ListItem
                key={i}
                {...item}
                fnClick={item?.href ? () => navigate(item?.href || "") : logout}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

interface ListItemprops extends ListItemType {
  fnClick: () => void;
}

function ListItem({ title, ListIcon, fnClick }: ListItemprops): ReactElement {
  return (
    <li
      className="flex gap-8 items-center px-4 py-6 cursor-pointer"
      onClick={fnClick}
    >
      <ListIcon className="text-primary-600 w-6 h-6" />
      <Text className="text-blakc  text-md flex-grow">{title}</Text>
      <ChevronRightIcon className="text-primary-600 w-6 h-6 " />
    </li>
  );
}

export default ProfilePage;
