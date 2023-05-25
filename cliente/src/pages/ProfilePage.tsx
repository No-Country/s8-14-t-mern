import { ReactElement, ComponentType, SVGProps } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Title, Subtitle, Text } from "@tremor/react";
import { XIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  UserIcon,
  MailIcon,
  ChatIcon,
  QuestionMarkCircleIcon,
  LogoutIcon,
} from "@heroicons/react/outline";

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
  const { deleteUserData } = useUserData();

  const logout = () => {
    deleteUserData();
  };

  return (
    <>
      <header className="bg-[#898181] pt-[1.625rem] pr-[1.75rem] pb-[2.125rem] pl-8 flex justify-between">
        <div className="flex gap-4 items-center pt-1">
          <img
            src="https://picsum.photos/200"
            className="w-[4.125rem] h-[4.125rem] rounded-full"
          />
          <div>
            <Title className="text-white text-base">Pablo Gómez</Title>
            <Subtitle className="text-white text-sm">32.456.433</Subtitle>
          </div>
        </div>
        <Link to="/home">
          <XIcon className="text-black h-7 w-7" />
        </Link>
      </header>
      <main className="py-5">
        <ul className="flex flex-col gap-0 pl-8 [&>li:not(:last-child)]:border-b-2">
          {MENU_ITEMS.map((item, i) => (
            <ListItem
              key={i}
              {...item}
              fnClick={item?.href ? () => navigate(item?.href || "") : logout}
            />
          ))}
        </ul>
      </main>
    </>
  );
}

interface ListItemprops extends ListItemType {
  fnClick: () => void;
}

function ListItem({ title, ListIcon, fnClick }: ListItemprops): ReactElement {
  return (
    <li
      className="flex gap-6 items-center pr-8 py-6 cursor-pointer"
      onClick={fnClick}
    >
      <ListIcon className="text-[#AA9D9D] w-6 h-6" />
      <Text className="text-[#262727]  text-base flex-grow">{title}</Text>
      <ChevronRightIcon className="text-[#AA9D9D] w-6 h-6 " />
    </li>
  );
}

export default ProfilePage;
