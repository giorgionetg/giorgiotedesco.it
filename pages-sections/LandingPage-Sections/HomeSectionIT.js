import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Link from "next/link";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import Person from "@material-ui/icons/Person";
import Apps from "@material-ui/icons/Apps";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import Button from 'components/CustomButtons/Button.js';

import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';

import styles from "assets/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div>
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>Parliamo di</h2>
            <h5 className={classes.description}>
              <Link href='/about-me'><b>GiorgioTedesco.it</b></Link> è un sito (di <b>Giorgio Tedesco</b> .. strano?!) e uno spazio personale dove condivido i <b>miei interessi</b>, i miei studi e non solo le mie competenze, ma anche il mio CV.
            </h5>
          </GridItem>
        </GridContainer>
      </div>
    </div>
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <InfoArea
                  title="Riguardo me"
                  description="In questa sezione troverai le mie competenze, i miei lavori e il CV/Resume"
                  icon={Person}
                  iconColor="warning"
                  vertical
                />
                <Button color='warning' as='link' href='/it/riguardo-me'>Entra</Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <InfoArea
                  title="Apps & DApps"
                  description={(<div>Questo è uno spazio dove puoi trovare le mie WebApps e Dapps. <b>HARDCORE WIP</b></div>)}
                  icon={Apps}
                  iconColor="success"
                  vertical
                />
                <Button disabled>Entra</Button>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <InfoArea
                  title="The Blog"
                  description="Condivido e parlo di Web Developing, Criptovalute and Bitcoin, ma anche Grafica 3D"
                  icon={ChromeReaderModeIcon}
                  iconColor="info"
                  vertical
                />
                <Button as='link' href='/it/il-blog' color='info'>Entra</Button>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </div>
    </div>
    </div>
  );
}
