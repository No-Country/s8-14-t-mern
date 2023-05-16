import { ReactElement, ComponentType } from "react";
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

interface ListItemType {
  title: string;
  href: string;
  ListIcon: ComponentType<React.SVGProps<SVGSVGElement>>;
}

const MENU_ITEMS: ListItemType[] = [
  { title: "Mis datos", href: "/home", ListIcon: UserIcon },
  { title: "Invitar amigos", href: "/home", ListIcon: MailIcon },
  { title: "Chateá con nosotros", href: "/home", ListIcon: ChatIcon },
  {
    title: "Preguntas frecuentes  ",
    href: "/home",
    ListIcon: QuestionMarkCircleIcon,
  },
  { title: "Cerrar sesión", href: "/home", ListIcon: LogoutIcon },
];

function ProfilePage(): ReactElement {
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
            <ListItem key={i} {...item} />
          ))}
        </ul>
      </main>
    </>
  );
}

function ListItem({ title, href, ListIcon }: ListItemType) {
  const navigate = useNavigate();
  return (
    <li
      className="flex gap-6 items-center pr-8 py-6 cursor-pointer"
      onClick={() => navigate(href)}
    >
      <ListIcon className="text-[#AA9D9D] w-6 h-6" />
      <Text className="text-black text-base flex-grow">{title}</Text>
      <ChevronRightIcon className="text-[#AA9D9D] w-6 h-6 " />
    </li>
  );
}

export default ProfilePage;
