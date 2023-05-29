import { ReactElement } from "react";
import { Link } from "react-router-dom";

import { Text, Title } from "@tremor/react";
import {  ChevronRightIcon } from "@heroicons/react/solid"; 

import HeaderBackButton from "@/components/HeaderBackButton";

interface ListItemType {
  title: string;
  href: string;
}

const MENU_ITEMS: ListItemType[] = [
  { title: "Por transferencia bancaria", href: "/addFunds/transfer" },
  { title: "En efectivo", href: "/addFunds/cash" },
];

function AddFunsMenuPage(): ReactElement {
  return (
    <>
      <HeaderBackButton title="Agregar dinero" />
      <div className="px-5 my-10">
        <Title>¿A quién deseas enviarle dinero?</Title>
        <ul className="mt-10 flex flex-col gap-3">
          {MENU_ITEMS.map((item, i) => (
            <ListItem key={i} {...item} />
          ))}
        </ul>
      </div>
    </>
  );
}

function ListItem({ title, href }: ListItemType): ReactElement {
  return (
    <li>
      <Link
        className="flex gap-6 items-center pr-8 py-6 px-4 rounded-lg cursor-pointer bg-primary-50"
        to={href}
      >
        <Text className="text-[#262727]  text-base flex-grow">{title}</Text>
        <ChevronRightIcon className="text-primary w-6 h-6 " />
      </Link>
    </li>
  );
}

export default AddFunsMenuPage;
