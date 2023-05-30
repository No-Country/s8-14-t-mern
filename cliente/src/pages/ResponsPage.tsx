import { useLocation } from "react-router-dom";
import Buttonc from "@/components/Buttonc";
import { Bold, Col, Grid, Icon, Text, Title } from "@tremor/react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";

interface Props {
  backmsg: string;
}

export default function ResponsPage({ backmsg }: Props): JSX.Element {
  const { state } = useLocation();
  const status = 201;

  return (
    <Grid
      numColsSm={12}
      className="w-full h-screen flex flex-col items-center justify-center"
    >
      <Col numColSpan={12}>
        {status === 201 ? (
          <Icon size="xl" icon={CheckCircleIcon} />
        ) : (
          <Icon color="red" size="xl" icon={XCircleIcon} />
        )}
      </Col>
      <Col numColSpan={12} className="flex justify-center">
        <Text className="w-3/4 mb-5 text-center text-3xl">
          {backmsg}
          {state?.msg}
        </Text>
      </Col>
      <Buttonc styled={true} action="volver" href="/home">
        Volver a inicio
      </Buttonc>
    </Grid>
  );
}
