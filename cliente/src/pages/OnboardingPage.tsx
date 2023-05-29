import Buttonc from '@/components/Buttonc'
import { Col, Grid } from '@tremor/react'
import React, { ReactElement } from 'react'


export default function OnboardingPage(): ReactElement {
  return (
    <Grid>
      <Col>
      </Col>
      <Col>
        <div>botones</div>
        <Buttonc styled={true} >Siguiente</Buttonc>
        <Buttonc styled={false} >Saltar</Buttonc>
      </Col>
    </Grid>
  )
}

