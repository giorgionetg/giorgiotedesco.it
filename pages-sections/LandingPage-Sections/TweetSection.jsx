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

import Button from "components/CustomButtons/Button.js";
import Badge from "components/Badge/Badge.js";

import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";

import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";

import styles from "assets/jss/nextjs-material-kit/pages/landingPageSections/tweetStyle.js";
import { cardTitle } from "assets/jss/nextjs-material-kit.js";

const useStyles = makeStyles({ styles, cardTitle });

export default function ProductSection(props) {
  const classes = useStyles();

  let blockstack = props.posts;

  return (
    <div>
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <h2 className={classes.title}>My latest Announcements</h2>
              <h5 className={classes.description}>
                From a DApp I made with BlockStack
              </h5>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <br />
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <GridContainer>
                {blockstack.map((post) => {
                  //var date = new Date(unix_timestamp * 1000);
                  let date = new Date(post.datetime).toDateString();
                  let time =
                    new Date(post.datetime).getHours() +
                    ":" +
                    new Date(post.datetime).getMinutes();
                  return (
                    <>
                      <GridItem xs={12} sm={12} md={6}>
                        <Card>
                          <CardHeader color="info">
                            <b>{post.emotion}</b>
                            <br />
                            {date} at {time}
                          </CardHeader>
                          <CardBody>
                            <i>Giorgio Tedesco</i> says:
                            <p>
                              <b>{post.sentence}</b>
                            </p>
                          </CardBody>
                        </Card>
                      </GridItem>
                    </>
                  );
                })}

                <GridItem xs={12} sm={12} md={6}>
                  <Button
                    as="link"
                    href="/web-apps/messages/?giorgionetg.id.blockstack"
                  >
                    READ MORE
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
