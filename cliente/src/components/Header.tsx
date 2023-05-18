import {Card, Metric, Text, Icon } from "@tremor/react"
import { BellIcon, EyeIcon } from "@heroicons/react/outline"

export default function Header(): JSX.Element {
    return(
        <Card>
            <div className="flex  items-center">
            <Card className="bg-black w-10" ></Card>
            <Text className="ms-5">Hola irene</Text>
            <Icon className="absolute top-4 right-0 h-16 w-16 " size="md" icon={BellIcon} />
            </div>
            <div className="flex flex-col items-center">
                <Text>Total disponible</Text>
            <div className="flex items-center">
                <Metric>$ 120.000</Metric>
                <Icon className=''size="md" icon={EyeIcon} />
                </div>
            </div>
        </Card>
    )
}