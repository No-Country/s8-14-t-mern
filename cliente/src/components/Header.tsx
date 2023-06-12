import { useState } from "react";

import { Card, Metric, Text, Icon } from "@tremor/react";
import { BellIcon, EyeIcon } from "@heroicons/react/outline";
import { useUserData } from "@/context/UserContext";

export default function Header(): JSX.Element {
  const { user } = useUserData();
  const [showBalance, setShowBalance] = useState(true);

  const handleClickShowBalance = () => setShowBalance((show) => !show);

  return (
    <Card className="h-[11.75rem] bg-gradient-to-r from-[#661EC2] from-0% to-[#240860] to-100% rounded-none">
      <div className="flex  items-center">
        <div className="w-9 h-8 bg-white rounded-md text-center text-[#1205A4] mt-3 grid place-items-center uppercase">
          {user?.firstName && user.firstName.slice(0, 2)}
        </div>
        <Icon
          className="absolute top-4 right-0 h-16 w-16 text-white"
          size="md"
          icon={BellIcon}
        />
      </div>
      <div className="flex flex-col items-center">
        <Text className="text-white">Total disponible</Text>
        <div className="flex items-center">
          <Metric className="text-white">
            {showBalance
              ? `$ ${user?.balance?.toLocaleString()}`
              : "**********"}
          </Metric>
          <button onClick={handleClickShowBalance}>
            <Icon className="text-white" size="md" icon={EyeIcon} />
          </button>
        </div>
      </div>
    </Card>
  );
}
