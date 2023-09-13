


import Link from "next/link";

import classNames from "classnames";

import Parallax from "components/Parallax/Parallax.js";
import Header from "components/Header/Header.js";
import GTheaderLinks from "components/Header/GTheaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Badge from 'components/Badge/Badge.js';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { NextSeo } from 'next-seo';
import { ArticleJsonLd } from 'next-seo';

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/components.js";
import { cardTitle } from "assets/jss/nextjs-material-kit.js";
import cardBodyStyle from "assets/jss/nextjs-material-kit/components/cardBodyStyle.js";
import imagesStyles from "assets/jss/nextjs-material-kit/imagesStyles.js";
import badgeStyle from "assets/jss/nextjs-material-kit/components/badgeStyle.js"

import myimage from "assets/img/giorgio-tedesco-images/giorgio-tedesco-low-res.jpg";

let gridStyle = {
    paddingTop: "3em",
    paddingBottom: "1em"
}

const newstyles = {
  ...styles,
  imagesStyles,
  cardBodyStyle,
  cardTitle,
  badgeStyle,
  gridStyle
};

const useStyles = makeStyles(newstyles);

import mdLoader from 'myContentLoader/mdLoader.js';
import mdCryptoLoader from 'myContentLoader/mdCryptoLoader.js';

export default function singlePost({ seoData, seoUrl, articleContent }) {
  const classes = useStyles();

  console.log({ seoData, articleContent })
  let seoTitle = seoData.title + ' | Giorgio Tedesco | Just a web developer.';
  let seoDescription = seoData.description;
  let url = 'https://www.giorgiotedesco.it/the-blog/on-web-development/' + seoUrl;
  return (
    <div>
      <Header
        brand="Giorgio Tedesco"
        rightLinks={<GTheaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
      />

      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={url}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
          url: url,
          type: 'article',
          article: {
            publishedTime: seoData.datePublished,
            modifiedTime: seoData.datePublished,
            section: seoData.category,
            authors: [
              'https://www.giorgiotedesco.it/about-me',
            ],
            tags: seoData.tags,
          },
          images: [
            {
              url: 'https://www.giorgiotedesco.it' + require("assets/img/" + seoData.image),
              alt: 'Unsplash',
            },
          ],
        }}
      />
      <ArticleJsonLd
        url={url}
        title={seoTitle}
        images={['https://www.giorgiotedesco.it' + require("assets/img/" + seoData.image)]}
        datePublished={seoData.datePublished}
        dateModified={seoData.datePublished}
        authorName={['Giorgio Tedesco']}
        publisherName="Giorgio Tedesco"
        description={seoDescription}
      />

      <Parallax image={require("assets/img/" + seoData.image)}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>{seoData.title}</h1>
                <h3 className={classes.subtitle}>
                  {seoData.description}
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main)}>
        <div className={classes.container}>
          <GridContainer className={classes.gridStyle}>
            <GridItem sm={12} md={8}>
              <ReactMarkdown plugins={[gfm]} children={articleContent} />
            </GridItem>
            <GridItem sm={12} md={4}>
              <Card style={{width: "20rem", marginLeft: "auto", marginRight: "auto"}}>
                <CardHeader color="warning">about the Author</CardHeader>
                <img style={{height: "auto", width: "100%", display: "block"}} className={classes.imgCardTop} src={myimage} rel="nofollow" alt="Giorgio Tedesco" />
                <CardBody >
                  <h4 className={classes.cardTitle}>Giorgio Tedesco</h4>
                  <p>Just a web developer</p>
                  <Button as='link' href='/about-me' fullWidth={true}>Read More</Button>
                  <p><small>There is a why my photo is low res. I'm working in a little web game!</small></p>
                </CardBody>
              </Card>
              <br /><br />
              <Card style={{width: "20rem", marginLeft: "auto", marginRight: "auto"}}>
                  <CardHeader color="info">Related Arguments</CardHeader>
                  {/* <img style={{height: "auto", width: "100%", display: "block"}} className={classes.imgCardTop} src={myimage} rel="nofollow" alt="Giorgio Tedesco" /> */}
                  <CardBody >
                    <h4 className={classes.cardTitle}>TAGS</h4>
                    { seoData.tags.map((item) => {
                      return(<Badge color='info'>{item}</Badge>)
                    }) }
                  </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>

      <Footer />

    </div>
  )
}


export async function getStaticPaths () {
  let post = await mdLoader('on-web-development');
  let paths = [];
  for (let c = 0; c < post.length; c++) {
    let res = post[c].split('.', 1);
    paths.push({ params: { slug: res[0] } });
  }

  return {
      paths: paths,
      fallback: false
    };

}

export async function getStaticProps (context) {

    let data = await mdCryptoLoader('on-web-development/' + context.params.slug + '.md');

    console.log(data);
    let seoData = data.data;
    seoData.datePubblished = data.data.datePublished.toString();
    seoData.dateModified = data.data.dateModified.toString();
    let seoUrl = context.params.slug;
    let articleContent = data.content;

  return {
    props: { seoData, seoUrl, articleContent }, revalidate: 1
  }

}
