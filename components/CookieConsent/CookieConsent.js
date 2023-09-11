import React from 'react';
import Link from "next/link";

import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
//import Button from "@material-ui/core/Button";
import Button from "components/CustomButtons/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import styles from "assets/jss/nextjs-material-kit/components/headerCookieStyle.js";

const useStyles = makeStyles(styles);

export default function CookieConsent(props) {
  const classes = useStyles();

  const { color, rightLinks, leftLinks, brand, fixed, absolute } = props;

  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed
  });

  return(
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <List component="nav">
            <ListItem><strong>Privacy</strong>:</ListItem>
            <ListItem><i>Please, take care about latest UE GDPO/GDPR rules on this website.</i></ListItem>
            <ListItem><strong><Button type="button" color="warning" as='link' href="/privacy">Read More</Button></strong></ListItem>
          </List>
        </div>

        <List>
          <ListItem><Button type="button" color="success">I Allow!</Button></ListItem>
        </List>

      </Toolbar>
    </AppBar>
  );

}

CookieConsent.defaultProp = {
  color: "#ff5e00"
};
