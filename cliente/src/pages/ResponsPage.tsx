import { useLocation } from "react-router-dom";
import Buttonc from "@/components/Buttonc";
import { Col, Grid, Icon, Text } from "@tremor/react";
import { CheckCircleIcon, } from "@heroicons/react/solid";


export default function ResponsPage(): JSX.Element {
  const { state } = useLocation();
  return (
    <Grid
      numColsSm={12}
      className="w-full h-screen flex flex-col gap-8 items-center justify-center"
    >
      <Col numColSpan={12}>
        <Icon className='text-[#00C070] text-3xl ' size="xl" icon={CheckCircleIcon}
        />
      </Col>
      <Col numColSpan={12} className="flex justify-center">
        <Text className="w-72 mb-5 text-center font-semibold text-3xl">
          {state?.msg}
        </Text>
      </Col>
      <Buttonc styled={true} action="volver" href="/home">
        Volver a inicio
      </Buttonc>
    </Grid>
  );
}
