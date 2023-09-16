/*eslint-disable*/
import React from "react";
import Link from "next/link";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

import PersonIcon from "@material-ui/icons/Person";

// @material-ui/icons
import VisibilityIcon from '@material-ui/icons/Visibility';

import { Apps, CloudDownload } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import AppsIcon from '@material-ui/icons/Apps';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);



export default function GTheaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          as="link"
          href="/about-me"
          color="transparent"
          className={classes.navLink}
        >
          <PersonIcon className={classes.icons} /> ABOUT ME
        </Button>
      </ListItem>
      {/* <ListItem className={classes.listItem}>
        <Button
          as="link"
          href="/web-apps"
          color="transparent"
          className={classes.navLink}
        >
          <AppsIcon className={classes.icons} /> WEBAPPS
        </Button>
      </ListItem> */}
      <ListItem className={classes.listItem}>
        <Button
          as="link"
          href="/the-blog"
          color="transparent"
          className={classes.navLink}
        >
          <ChromeReaderModeIcon className={classes.icons} /> The Blog
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          as="link"
          href="/privacy"
          color="transparent"
          className={classes.navLink}
        >
          <VisibilityIcon className={classes.icons} /> PRIVACY
        </Button>
      </ListItem>

      <ListItem className={classes.listItem}>

        <Tooltip
          id="instagram-twitter"
          title="Follow me on twitter"
          placement={"top"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/giorgionetg"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
