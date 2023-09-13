
import Link from "next/link";

import Layout from 'components/Layout/Layout.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import Badge from 'components/Badge/Badge.js'

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//<d3fc-svg id="x-axis" style="width: 10vw; height: 6vw"></d3fc-svg>


export default function Viewer (  ) {

  return(
    <>
      <Layout title='Mr Wolf of Keyboards' description={(<Button disabled color='info'>Play the Game!</Button>)} image='scott-graham-OQMZwNd3ThU-unsplash.jpg'>

      <GridContainer justify="left">
        <GridItem xs={12} sm={12} md={12}>
          <h3>Graph</h3>
          <d3fc />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <h3>Wallet</h3>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <h3>Orders & Actions</h3>
        </GridItem>
      </GridContainer>
      </Layout>
    </>
  )

}
