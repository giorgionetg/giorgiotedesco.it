import { container } from "assets/jss/nextjs-material-kit.js";

import imagesStyles from "assets/jss/nextjs-material-kit/imagesStyles.js";

const completedStyle = {
  section: {
    padding: "70px 0"
  },
  container: {
    ...container,
    textAlign: "justify !important"
  },
  specificStyle: {
    textAlign: "left !important"
  },
  ...imagesStyles
};

export default completedStyle;
