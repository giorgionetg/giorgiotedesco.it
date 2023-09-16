import React from "react";

import classNames from "classnames";

import Header from "components/Header/Header.js";
import GTheaderLinks from "components/Header/GTheaderLinks.js";

//import CookieConsent from "components/CookieConsent/CookieConsent.js";
import CookieConsent from "react-cookie-consent";
import Button from "components/CustomButtons/Button.js";

import Parallax from "components/Parallax/Parallax.js";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Footer from "components/Footer/Footer.js";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/components.js";

let contStyle = {
  paddingTop: "3em",
  paddingBottom: "2em",
};

let btnStyle = {
  background: "#00acc1",
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: 400,
  paddingBottom: "12px",
  paddingTop: "12px",
  paddingLeft: "30px",
  paddingRight: "30px",
  textTransform: "uppercase",
};

const newstyles = {
  ...styles,
  contStyle,
  btnStyle,
};

const useStyles = makeStyles(newstyles);

export default function Layout(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Header
        brand="Giorgio Tedesco"
        rightLinks={<GTheaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
      />

      <Parallax image={require("assets/img/" + props.image)}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>{props.title}</h1>
                <h3 className={classes.subtitle}>{props.description}</h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main)}>
        {/* <CookieConsent /> buttonStyle={{ background: "#00acc1", color: "#ffffff", fontSize: "16px", fontWeight: 800 }} */}

        <CookieConsent
          location="bottom"
          buttonText="I allow all Cookies"
          cookieName="CookieConsent"
          style={{ background: "#ff9800", fontSize: "16px", fontWeight: 600 }}
          buttonStyle={btnStyle}
          expires={365}
        >
          This website uses technical cookies to enhance the user experience.{" "}
          <br />
          <p style={{ fontWeight: 400 }}>
            I don't like to use your data. I will use only Technical Cookies to
            store your choice.
          </p>
          <Button as="link" href="/privacy">
            Read more about Privacy and Cookies used here
          </Button>
        </CookieConsent>

        <div className={classNames(classes.container, classes.contStyle)}>
          {props.children}
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
}
