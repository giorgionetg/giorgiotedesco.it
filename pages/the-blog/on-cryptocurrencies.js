
import Link from "next/link";

import classNames from "classnames";

import Layout from 'components/Layout/Layout.js'
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { NextSeo } from 'next-seo';

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/components.js";
import { cardTitle } from "assets/jss/nextjs-material-kit.js";
import cardBodyStyle from "assets/jss/nextjs-material-kit/components/cardBodyStyle.js";
import imagesStyles from "assets/jss/nextjs-material-kit/imagesStyles.js";

import Quote from "components/Typography/Quote.js";

let gridStyle = {
    paddingTop: "2em",
    paddingBottom: "1em"
}

let mainStyle = {
  paddingBottom: "3em"
}

const newstyles = {
  ...styles,
  imagesStyles,
  cardBodyStyle,
  cardTitle,
  gridStyle,
  mainStyle
};

const useStyles = makeStyles(newstyles);

import mdLoader from 'myContentLoader/mdLoader.js';
import mdCryptoLoader from 'myContentLoader/mdCryptoLoader.js';

export default function onCryptocurrencies({ postListCryptocurrencies, categoryList }) {
  const classes = useStyles();
  return (
    <div>

      <NextSeo
        title="On Cryptocurrencies Blog | Giorgio Tedesco | Just a web developer."
        description="This website section is on Bitcoin and Cryptocurrencies like Ethereum and Xrp too."
        canonical="https://www.giorgiotedesco.it/the-blog/on-cryptocurrencies"
      />

      <Layout title='On Bitcoin and Cryptocurrencies' description='Understanding Bitcoin, Ethereum and Xrp' image='dmitry-demidko-OG3A-ilG8AY-unsplash.jpg'>

        <GridContainer className={classes.gridStyle}>
          <GridItem sm={12} md={3} className={classes.mainStyle}>
            <Quote text={(<h5>Your keys, your money</h5>)} author="anonymous" />
          </GridItem>
          <GridItem sm={12} md={3} className={classes.mainStyle}>
            <Quote text={(<h5>No one wants to be the first, no one wants to be the last</h5>)} author="Ivan on Tech" />
          </GridItem>
          <GridItem sm={12} md={3} className={classes.mainStyle}>
            <Quote text={(<h5>When Lambo!</h5>)} author="Folks" />
          </GridItem>
          <GridItem sm={12} md={3} className={classes.mainStyle}>
            <Quote text={(<h5>Scarcity, Stock To Flow</h5>)} author="PlanB" />
          </GridItem>
          {postListCryptocurrencies.map((item) => {
            let linking = '/the-blog/on-cryptocurrencies/' + item.slug;
            //return <li><Link href={linking}>{item.title}</Link></li>

            return (
              <GridItem sm={12} md={4}>
                <Card style={{width: "20rem", marginLeft: "auto", marginRight: "auto"}}>
                  <CardHeader color="warning">On Cryptocurrencies</CardHeader>
                  {/* <img class="card-img-top" src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=200&q=30" rel="nofollow" alt="Card image cap" /> */}
                  <CardBody >
                    <h4 className={classes.cardTitle}>{item.title}</h4>
                    <p>{item.description}</p>
                    <Button as='link' href={linking} fullWidth={true}>Read More</Button>
                  </CardBody>
                </Card>
              </GridItem>
            )
          })}
        </GridContainer>
      </Layout>
    </div>
  );
}

export async function getStaticProps(context) {

  let posts = await mdLoader('on-cryptocurrencies');
  let paths = [];
  for (let c = 0; c < posts.length; c++) {
    let res = posts[c].split('.', 1);
    paths.push(res[0]);
  }

  let categoryList = [
    { slug: 'on-cryptocurrencies', title: 'The Blog on Cryptocurrencies' },
    { slug: 'on-3d-computer-graphic-and-blender', title: 'The Blog on Computer Graphic 3D and Blender' },
    { slug: 'on-artificial-intelligence', title: 'The Blog on Artificial Intelligence' }
  ];

  let postListCryptocurrencies = [];

  for (let p = 0; p < paths.length; p++) {
    let data = await mdCryptoLoader('on-cryptocurrencies/' + paths[p] + '.md');
    console.log(data.datePublished)
    data.datePublished = JSON.stringify(data.datePublished);
    data.dateModified = JSON.stringify(data.dateModified);
    postListCryptocurrencies.push({ slug: paths[p], ...data.data });
  }

  return {
    props: { postListCryptocurrencies, categoryList }, // will be passed to the page component as props
  }
}
