import { HomeIcon, QrcodeIcon, UserIcon, TrendingUpIcon, ReceiptTaxIcon } from "@heroicons/react/outline";
import { HomeIcon as HomeSolid, UserIcon as UserSolid } from "@heroicons/react/solid";
import { TabList, Tab } from "@tremor/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function NavBar(): JSX.Element {
  const [value, setValue] = useState<string>("/home")
  const navigate = useNavigate()
  const openScreen = (value: string) => navigate(value)
  return (
    <TabList
      className="flex-1 fixed bottom-0 items-end justify-center w-screen bg-white space-x-0 overflow-visible h-[70px] border-t"
      defaultValue='/home'
      onValueChange={(value) => {
        openScreen(value)
        setValue(value)
      }}
      color="violet"
    >
      <Tab
        className="flex brightness-50  flex-col justify-center items-center p-0 my-auto border-none w-1/5"
        value='/home'
        text='Inicio'
        icon={() =>
          value === "/home" ?
            < HomeSolid
              className="w-9 m-0 p-1"
            />
            :
            < HomeIcon
              className="w-9 m-0 p-1"
            />
        }
      />
      <Tab
        className="flex brightness-50 flex-col justify-center items-center p-0 my-auto border-none w-1/5"
        value='/transactions'
        text='Actividad'
        icon={() =>
          <TrendingUpIcon
            className="w-9 m-0 p-1"
          />}
      />
      <Tab
        className="flex text-white flex-col justify-center items-center bg-primary rounded-full aspect-square mb-5 w-1/5 max-w-[70px]"
        value='/scanner'
        text=''
        icon={() =>
          <QrcodeIcon
            className="w-9 m-0  p-1"
          />}
      />
      <Tab
        className="flex brightness-50 flex-col justify-center items-center p-0 my-auto border-none w-1/5"
        value='/benefit'
        text='Beneficios'
        icon={() =>
          <ReceiptTaxIcon
            className="w-9 m-0 p-1" />}
      />
      <Tab className="flex brightness-50 flex-col justify-center items-center p-0 my-auto border-none w-1/5"
        value='/profile'
        text='Perfil'
        icon={() =>
          value === "/profile" ?
            <UserSolid
              className="w-9 m-0 p-1"
            />
            :
            <UserIcon
              className="w-9 m-0 p-1" />}
      />
    </TabList>
  )
}