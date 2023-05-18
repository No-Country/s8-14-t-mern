import { SwitchVerticalIcon, CreditCardIcon, HomeIcon, QrcodeIcon, UserIcon } from "@heroicons/react/outline";
import { TabList, Tab } from "@tremor/react";
import { useNavigate } from "react-router-dom";
export default function NavBar(): JSX.Element {
  const navigate = useNavigate()
  const openScreen = (value: string) => navigate(value)

  return (
    <TabList
      className="flex-1 fixed bottom-0 items-end justify-center w-screen bg-slate-200 space-x-0 overflow-visible h-[3.8rem]"
      defaultValue='/home'
      onValueChange={(value) => openScreen(value)}
    >
      <Tab
        className="flex-1 justify-center items-center p-0 my-auto border-none"
        value='/home'
        text=''
        icon={() =>
          <HomeIcon
            className="w-9 m-0 bg-slate-400 text-white p-1"
          />}
      />
      <Tab
        className="flex-1 justify-center items-center p-0 my-auto border-none"
        value='/activities'
        text=''
        icon={() =>
          <SwitchVerticalIcon
            className="w-9 m-0 bg-slate-400 text-white p-1"
          />}
      />
      <Tab
        className="flex-1 justify-center items-center bg-slate-300 rounded-full max-h-[4rem] max-w-[4rem] h-[4rem] w-[4rem] mb-1"
        value='/qr-code'
        text=''
        icon={() =>
          <QrcodeIcon
            className="w-14 m-0  p-1"
          />}
      />
      <Tab
        className="flex-1 justify-center items-center p-0 my-auto border-none"
        value='/cards'
        text=''
        icon={() =>
          <CreditCardIcon
            className="w-9 m-0 bg-slate-400 text-white p-1" />}
      />
      <Tab className="flex-1 justify-center items-center p-0 my-auto border-none"
        value='/profile'
        text=''
        icon={() =>
          <UserIcon
            className="w-9 m-0 bg-slate-400 text-white p-1" />}
      />
    </TabList>
  )
}