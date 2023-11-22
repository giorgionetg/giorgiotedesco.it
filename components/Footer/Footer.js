/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import Button from "components/CustomButtons/Button";

import styles from "assets/jss/nextjs-material-kit/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            {/*<ListItem className={classes.inlineBlock}>
              <a
                as='link'
                href="/webapps-n-dapps"
                className={classes.block}
              >
                WebApps & DApps
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                as='link'
                href="/the-blog/on-cryptocurrencies"
                className={classes.block}
              >
                On Cryptocurrencies
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                as='link'
                href="/the-blog/on-3d-computer-graphic-and-blender"
                className={classes.block}
              >
                On CG3D (Blender)
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                as='link'
                href="/the-blog/on-artificial-intelligence"
                className={classes.block}
              >
                On AI (ML, DL)
              </a>
            </ListItem> */}

            <ListItem className={classes.inlineBlock}>
              <a as="link" href="/privacy" className={classes.block}>
                Privacy
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a as="link" href="/credits" className={classes.block}>
                Credits
              </a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()}, made with{" "}
          <Favorite className={classes.icon} />
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
};
