import classNames from 'classnames';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { NextSeo, ArticleJsonLd } from 'next-seo';

import { makeStyles } from '@material-ui/core/styles';
import mdLoader from '../../../myContentLoader/mdLoader';
import mdCryptoLoader from '../../../myContentLoader/mdCryptoLoader';

import styles from '../../../assets/jss/nextjs-material-kit/pages/components';
import { cardTitle } from '../../../assets/jss/nextjs-material-kit';
import cardBodyStyle from '../../../assets/jss/nextjs-material-kit/components/cardBodyStyle';
import imagesStyles from '../../../assets/jss/nextjs-material-kit/imagesStyles';
import badgeStyle from '../../../assets/jss/nextjs-material-kit/components/badgeStyle';

import myimage from '../../../assets/img/giorgio-tedesco-images/giorgio-tedesco-low-res.jpg';
import Badge from '../../../components/Badge/Badge';

import CardBody from '../../../components/Card/CardBody';
import CardHeader from '../../../components/Card/CardHeader';
import Card from '../../../components/Card/Card';
import Button from '../../../components/CustomButtons/Button';
import Footer from '../../../components/Footer/Footer';
import GridItem from '../../../components/Grid/GridItem';
import GridContainer from '../../../components/Grid/GridContainer';
import GTheaderLinks from '../../../components/Header/GTheaderLinks';
import Header from '../../../components/Header/Header';
import Parallax from '../../../components/Parallax/Parallax';

const gridStyle = {
  paddingTop: '3em',
  paddingBottom: '1em',
};

const newstyles = {
  ...styles,
  imagesStyles,
  cardBodyStyle,
  cardTitle,
  badgeStyle,
  gridStyle,
};

const useStyles = makeStyles(newstyles);

export default function SinglePost({ seoData, seoUrl, articleContent }) {
  const classes = useStyles();

  const seoTitle = `${seoData.title} | Giorgio Tedesco | Just a web developer.`;
  const seoDescription = seoData.description;
  const url = `https://www.giorgiotedesco.it/the-blog/on-web-development/${seoUrl}`;
  return (
    <div>
      <Header
        brand="Giorgio Tedesco"
        rightLinks={<GTheaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: 'white',
        }}
      />

      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={url}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
          url,
          type: 'article',
          article: {
            publishedTime: seoData.datePublished,
            modifiedTime: seoData.datePublished,
            section: seoData.category,
            authors: ['https://www.giorgiotedesco.it/about-me'],
            tags: seoData.tags,
          },
          images: [
            {
              // eslint-disable-next-line global-require
              url: `https://www.giorgiotedesco.it${require(
                `assets/img/${seoData.image}`,
              )}`,
              alt: 'Unsplash',
            },
          ],
        }}
      />
      <ArticleJsonLd
        url={url}
        title={seoTitle}
        images={[
          `https://www.giorgiotedesco.it${require(
            `assets/img/${seoData.image}`,
          )}`,
        ]}
        datePublished={seoData.datePublished}
        dateModified={seoData.datePublished}
        authorName={['Giorgio Tedesco']}
        publisherName="Giorgio Tedesco"
        description={seoDescription}
      />

      <Parallax image={require(`assets/img/${seoData.image}`)}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>{seoData.title}</h1>
                <h3 className={classes.subtitle}>{seoData.description}</h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main)}>
        <div className={classes.container}>
          <GridContainer className={classes.gridStyle}>
            <GridItem sm={12} md={8}>
              <ReactMarkdown plugins={[gfm]}>{articleContent}</ReactMarkdown>
            </GridItem>
            <GridItem sm={12} md={4}>
              <Card
                style={{
                  width: '20rem',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <CardHeader color="warning">about the Author</CardHeader>
                <img
                  style={{ height: 'auto', width: '100%', display: 'block' }}
                  className={classes.imgCardTop}
                  src={myimage}
                  alt="Giorgio Tedesco"
                />
                <CardBody>
                  <h4 className={classes.cardTitle}>Giorgio Tedesco</h4>
                  <p>Just a web developer</p>
                  <Button as="link" href="/about-me" fullWidth>
                    Read More
                  </Button>
                  <p>
                    <small>
                      There is a why my photo is low res. I'm working in a
                      little web game!
                    </small>
                  </p>
                </CardBody>
              </Card>
              <br />
              <br />
              <Card
                style={{
                  width: '20rem',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <CardHeader color="info">Related Arguments</CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>TAGS</h4>
                  {seoData.tags.map((item) => (
                    <Badge color="info">{item}</Badge>
                  ))}
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const post = await mdLoader('on-web-development');
  const paths = [];
  for (let c = 0; c < post.length; c += 1) {
    const res = post[c].split('.', 1);
    paths.push({ params: { slug: res[0] } });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const data = await mdCryptoLoader(
    `on-web-development/${context.params.slug}.md`,
  );

  const seoData = data.data;
  seoData.datePubblished = data.data.datePublished.toString();
  seoData.dateModified = data.data.dateModified.toString();
  const seoUrl = context.params.slug;
  const articleContent = data.content;

  return {
    props: { seoData, seoUrl, articleContent },
    revalidate: 1,
  };
}
