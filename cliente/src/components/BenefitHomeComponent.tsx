import { Grid, Col, Text } from "@tremor/react";
import 'swiper/css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useBenefice from '@/hooks/useBenefice';
import TheBestComponent from './TheBestComponent';



const Benefits = (): JSX.Element => {

  const { getBestBenefits, TheBests } = useBenefice()

  useEffect(() => {
    getBestBenefits();
  }, [])

  const styles = {
    backgroundSize: 'fit-content',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <>
      <Grid numCols={1} className='mt-20'>
        <Col className='w-full'>
          <Col className='w-full flex  justify-between items-end px-5'>
            <Text className='text-base font-semibold  text-black'>Beneficios</Text>
            <Text className='text-sm font-medium  text-primary-600'>
              <Link to={"/benefit"}>
                Ver todos
              </Link>
            </Text>
          </Col>

          <TheBestComponent Benefice={TheBests} />
        </Col>
      </Grid>
    </>
  );
};

export default Benefits;
