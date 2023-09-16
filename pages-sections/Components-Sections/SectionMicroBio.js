import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/nextjs-material-kit/pages/componentsSections/completedStyle.js";

const useStyles = makeStyles(styles);

// import image from "assets/img/giorgio-tedesco-images/giorgio-tedesco-01.jpg";
import image from "assets/img/giorgio-tedesco-images/giorgio-tedesco-low-res.jpg";

export default function SectionMicroBio() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <h2 className={classes.specificStyle}>
              Giorgio Tedesco{" "}
              <sup>
                <small>
                  <i>just a web developer</i>
                </small>
              </sup>
            </h2>
            <h3>Let me talk about my hobbies and skills.</h3>
            <br />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem justify="center" xs={12} sm={12} md={4}>
            <img
              src={image}
              alt="Giorgio Tedesco"
              className={
                classes.imgRaised +
                " " +
                classes.imgRounded +
                " " +
                classes.imgFluid
              }
            />
            <br />
            <br />
            <small>
              There is a reason for low res (I'm working in a little web game)!
            </small>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <h4>
              I'm a dedicated web developer with a passion that extends into
              various exciting realms. My journey began with a fascination for
              CG3D and Special Effects, and as I ventured into the world of
              academia, I delved into the art of coding, particularly mastering
              HTML, JS, and CSS.
            </h4>

            <h4>
              During my time at university, I honed my server-side skills,
              delving into PHP, APACHE, and MYSQL within a Linux environment,
              all as a self-taught enthusiast. Today, I find myself at the
              forefront of modern web technologies, proficient in ReactJs,
              NextJs, and even venturing into the realm of Solidity, Web3
              integration, and cryptocurrencies.
            </h4>

            <h4>
              Beyond web development, I've had the privilege of gaining hands-on
              experience with Artificial Intelligence, diving into the world of
              Machine Learning within the Python environment. I've even explored
              the potential of Google Colab, making the most of the resources
              available despite not having access to a high-powered Nvidia GPU.
            </h4>

            <h4>
              My journey as a web developer is characterized by a relentless
              pursuit of knowledge and innovation, and I'm excited to see where
              this ever-evolving field will take me next.
            </h4>
            <Button as="link" href="/web-apps/json-resume/viewer/" color="info">
              My CV / Resumé
            </Button>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
