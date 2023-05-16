import { ArrowsUpDownIcon, CreditCardIcon, HomeIcon, QrCodeIcon, UserIcon } from "@heroicons/react/24/solid";
import { TabList, Tab } from "@tremor/react";
import { useNavigate } from "react-router-dom";
type stylesType = {
  TabList: string
  tabs: string
  icons: string
  iconQr: string
}
export default function NavBar(): JSX.Element {
  const navigate = useNavigate()
  const openScreen = (value: string) => navigate(value)
  const styles: stylesType = {
    TabList: "flex-1 absolute bottom-0 w-screen bg-slate-200",
    tabs: "flex-1 justify-center items-center",
    icons: "w-9 m-0 bg-slate-400 text-white p-1",
    iconQr: "w-max m-0 bg-slate-300 rounded-full p-1"
  }
  return (
    <TabList className={styles.TabList} defaultValue='/home' onValueChange={(value) => openScreen(value)}>
      <Tab className={styles.tabs} value='/home' text='' icon={() => <HomeIcon className={styles.icons} />} />
      <Tab className={styles.tabs} value='/activities' text='' icon={() => <ArrowsUpDownIcon className={styles.icons} />} />
      <Tab className={styles.tabs} value='/qr-code' text='' icon={() => <QrCodeIcon className={styles.iconQr} />} />
      <Tab className={styles.tabs} value='/cards' text='' icon={() => <CreditCardIcon className={styles.icons} />} />
      <Tab className={styles.tabs} value='/user' text='' icon={() => <UserIcon className={styles.icons} />} />
    </TabList>
  )
}