
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

export default function onCryptocurrencies({ postList, categoryList }) {
  const classes = useStyles();
  return (
    <div>

      <NextSeo
        title="The Blog of Giorgio Tedesco | Just a web developer."
        description="This website section is landing page of blog."
        canonical="https://www.giorgiotedesco.it/the-blog"
      />

      <Layout title='The Blog' description='made by Giorgio Tedesco' image='patrick-fore-0gkw_9fy0eQ-unsplash.jpg'>

        <GridContainer className={classes.gridStyle}>
          {postList.map((item) => {
            let linking = '/the-blog/' + item.category + '/' + item.slug;
            //return <li><Link href={linking}>{item.title}</Link></li>
            let category;
            switch (item.category) {
              case 'on-cryptocurrencies':
                  category = (<CardHeader color="warning">On Cryptocurrencies</CardHeader>)
                break;
              case 'on-web-development':
                  category = (<CardHeader color="primary">On Web Development</CardHeader>)
                break;
              default:

            }

            return (
              <GridItem sm={12} md={4}>
                <Card style={{width: "20rem", marginLeft: "auto", marginRight: "auto"}}>
                  { category }

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

  let cryptoposts = await mdLoader('on-cryptocurrencies');
  let webposts = await mdLoader('on-web-development');
  //let posts = cryptoposts.concat(webposts);

  let cryptopaths = [];
  for (let c = 0; c < cryptoposts.length; c++) {
    let res = cryptoposts[c].split('.', 1);
    cryptopaths.push(res[0]);
  }

  let webpaths = [];
  for (let c = 0; c < webposts.length; c++) {
    let res = webposts[c].split('.', 1);
    webpaths.push(res[0]);
  }

  let categoryList = [
    { slug: 'on-cryptocurrencies', title: 'The Blog on Cryptocurrencies' },
    { slug: 'on-3d-computer-graphic-and-blender', title: 'The Blog on Computer Graphic 3D and Blender' },
    //{ slug: 'on-artificial-intelligence', title: 'The Blog on Artificial Intelligence' }
  ];

  let postList = [];

  for (let p = 0; p < cryptopaths.length; p++) {
    let data = await mdCryptoLoader('on-cryptocurrencies/' + cryptopaths[p] + '.md');
    console.log(data.datePublished)
    data.datePublished = JSON.stringify(data.datePublished);
    data.dateModified = JSON.stringify(data.dateModified);
    postList.push({ slug: cryptopaths[p], ...data.data });
  }

  for (let p = 0; p < webpaths.length; p++) {
    let data = await mdCryptoLoader('on-web-development/' + webpaths[p] + '.md');
    console.log(data.datePublished)
    data.datePublished = JSON.stringify(data.datePublished);
    data.dateModified = JSON.stringify(data.dateModified);
    postList.push({ slug: webpaths[p], ...data.data });
  }

  postList.sort(function(a, b) {
    var c = new Date(a.datePublished);
    var d = new Date(b.datePublished);
    return d-c;
  });

  return {
    props: { postList, categoryList }, // will be passed to the page component as props
  }
}
