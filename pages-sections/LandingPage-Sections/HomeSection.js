import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import Link from 'next/link';

// @material-ui/icons
import Chat from '@material-ui/icons/Chat';
import Person from '@material-ui/icons/Person';
import Apps from '@material-ui/icons/Apps';
import Fingerprint from '@material-ui/icons/Fingerprint';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import InfoArea from 'components/InfoArea/InfoArea.js';

import Button from 'components/CustomButtons/Button.js';

import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';

import styles from 'assets/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js';

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={12} md={8}>
              <h2 className={classes.title}>GiorgioTedesco.it</h2>
              <h5 className={classes.description}>
                This is a space I use to share <b>my interests</b>, studies,
                skills and CV.
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
                    title='About Me'
                    description='In this section you can find my updated skills, jobs and CV/Resume'
                    icon={Person}
                    iconColor='warning'
                    vertical
                  />
                  <Button color='warning' as='link' href='/about-me'>
                    Read More
                  </Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <InfoArea
                    title='Apps & DApps'
                    description={
                      <div>
                        A space where to play my WebApps & DApps freely.{' '}
                        <b>HARDCORE WIP</b>
                      </div>
                    }
                    icon={Apps}
                    iconColor='success'
                    vertical
                  />
                  <Button color='success' as='link' href='/web-apps'>
                    Read More
                  </Button>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <InfoArea
                    title='The Blog'
                    description='My experiences on Web Developing, Cryptocurrencies, and 3D Coding'
                    icon={ChromeReaderModeIcon}
                    iconColor='info'
                    vertical
                  />
                  <Button as='link' href='/the-blog' color='info'>
                    Read More
                  </Button>
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
