import { NextSeo } from 'next-seo';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/Layout/Layout';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Button from '../../components/CustomButtons/Button';

import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';

import styles from '../../assets/jss/nextjs-material-kit/pages/components';
import { cardTitle } from '../../assets/jss/nextjs-material-kit';
import cardBodyStyle from '../../assets/jss/nextjs-material-kit/components/cardBodyStyle';
import imagesStyles from '../../assets/jss/nextjs-material-kit/imagesStyles';

import mdLoader from '../../myContentLoader/mdLoader';
import mdCryptoLoader from '../../myContentLoader/mdCryptoLoader';

const gridStyle = {
  paddingTop: '2em',
  paddingBottom: '1em',
};

const mainStyle = {
  paddingBottom: '3em',
};

const newstyles = {
  ...styles,
  imagesStyles,
  cardBodyStyle,
  cardTitle,
  gridStyle,
  mainStyle,
};

const useStyles = makeStyles(newstyles);

export default function OnCryptocurrencies({ postList }) {
  const classes = useStyles();
  return (
    <div>
      <NextSeo
        title="The Blog of Giorgio Tedesco | Just a web developer."
        description="This website section is landing page of blog."
        canonical="https://www.giorgiotedesco.it/the-blog"
      />

      <Layout
        title="The Blog"
        description="made by Giorgio Tedesco"
        image="patrick-fore-0gkw_9fy0eQ-unsplash.jpg"
      >
        <GridContainer className={classes.gridStyle}>
          {postList.map((item) => {
            const linking = `/the-blog/${item.category}/${item.slug}`;
            // return <li><Link href={linking}>{item.title}</Link></li>
            let category;
            switch (item.category) {
              case 'on-cryptocurrencies':
                category = (
                  <CardHeader color="warning">On Cryptocurrencies</CardHeader>
                );
                break;
              case 'on-web-development':
                category = (
                  <CardHeader color="primary">On Web Development</CardHeader>
                );
                break;
              default:
            }

            return (
              <GridItem sm={12} md={4}>
                <Card
                  style={{
                    width: '20rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  {category}

                  {/* <img class="card-img-top" src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=200&q=30" rel="nofollow" alt="Card image cap" /> */}
                  <CardBody>
                    <h4 className={classes.cardTitle}>{item.title}</h4>
                    <p>{item.description}</p>
                    <Button as="link" href={linking} fullWidth>
                      Read More
                    </Button>
                  </CardBody>
                </Card>
              </GridItem>
            );
          })}
        </GridContainer>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const cryptoposts = await mdLoader('on-cryptocurrencies');
  const webposts = await mdLoader('on-web-development');
  // let posts = cryptoposts.concat(webposts);

  const cryptopaths = [];
  for (let c = 0; c < cryptoposts.length; c += 1) {
    const res = cryptoposts[c].split('.', 1);
    cryptopaths.push(res[0]);
  }

  const webpaths = [];
  for (let c = 0; c < webposts.length; c += 1) {
    const res = webposts[c].split('.', 1);
    webpaths.push(res[0]);
  }

  const categoryList = [
    { slug: 'on-cryptocurrencies', title: 'The Blog on Cryptocurrencies' },
    {
      slug: 'on-3d-computer-graphic-and-blender',
      title: 'The Blog on Computer Graphic 3D and Blender',
    },
    // { slug: 'on-artificial-intelligence', title: 'The Blog on Artificial Intelligence' }
  ];

  const postList = [];

  for (let p = 0; p < cryptopaths.length; p += 1) {
    const data = await mdCryptoLoader(
      `on-cryptocurrencies/${cryptopaths[p]}.md`,
    );
    data.datePublished = JSON.stringify(data.datePublished);
    data.dateModified = JSON.stringify(data.dateModified);
    postList.push({ slug: cryptopaths[p], ...data.data });
  }

  for (let p = 0; p < webpaths.length; p += 1) {
    const data = await mdCryptoLoader(`on-web-development/${webpaths[p]}.md`);
    data.datePublished = JSON.stringify(data.datePublished);
    data.dateModified = JSON.stringify(data.dateModified);
    postList.push({ slug: webpaths[p], ...data.data });
  }

  postList.sort((a, b) => {
    const c = new Date(a.datePublished);
    const d = new Date(b.datePublished);
    return d - c;
  });

  return {
    props: { postList, categoryList }, // will be passed to the page component as props
  };
}
