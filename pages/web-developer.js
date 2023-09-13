import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Layout from "components/Layout/Layout.js";

import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";


import HomeSection from "pages-sections/LandingPage-Sections/HomeSection.js";
import TweetSection from "pages-sections/LandingPage-Sections/TweetSection.js";

import { NextSeo } from 'next-seo';

import styles from "assets/jss/nextjs-material-kit/pages/components.js";

const useStyles = makeStyles(styles);
import useSWR from 'swr'
//https://gaia.blockstack.org/hub/1NsfK4B23SFDj1xqh85FANqnrFG1zKU2BU/status.json


export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [blockstack, setBlockstack] = useState([{id:0,emotion:'',sentence:'', datetime:0}]);

  useEffect(() => {
    // localhost:   https://gaia.blockstack.org/hub/1NsfK4B23SFDj1xqh85FANqnrFG1zKU2BU/status.json
    // prod:        https://gaia.blockstack.org/hub/1N3qdhpi671XKMaayJ2hnuB85MbciL9RQC/status.json

    fetch('https://gaia.blockstack.org/hub/1N3qdhpi671XKMaayJ2hnuB85MbciL9RQC/status.json')
      .then(res => res.json())
      .then(data => setBlockstack(data.posts.sort((a,b) => { return b.datetime - a.datetime})))
  }, []);


  return (
    <div>

      <NextSeo
        title="Giorgio Tedesco | Just a web developer"
        description="a personal Giorgio Tedesco's website used to share my interests on web developing, 3D Graphic, Cryptocurrencies (Bitcoin & Altcoin), Artificial Inteligence, Deep Learning."
        canonical="https://www.giorgiotedesco.it"
        openGraph={{
          type: 'website',
          url: 'https://www.giorgiotedesco.it',
          title: 'Giorgio Tedesco',
          description: 'Just a web developer',
          images: [
            {
              url: 'https://www.giorgiotedesco.it/_next/static/images/andras-vas-Bd7gNnWJBkU-unsplash-61553867678a3db4ae1acd2767d06321.jpg',
              alt: 'Andras Vas - Unsplash',
            }
          ],
        }}
      />

      <Layout title='Just a web developer' description='Based in Rome (Italy) and born in Brazil!' image='andras-vas-Bd7gNnWJBkU-unsplash.jpg'>
        <HomeSection />
        <TweetSection posts={blockstack} />
      </Layout>
    </div>
  );
}
