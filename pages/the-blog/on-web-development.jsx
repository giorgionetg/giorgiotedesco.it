import { NextSeo } from 'next-seo';
import { makeStyles } from '@material-ui/core/styles';
import Quote from '../../components/Typography/Quote';
import mdLoader from '../../myContentLoader/mdLoader';
import mdCryptoLoader from '../../myContentLoader/mdCryptoLoader';
import Button from '../../components/CustomButtons/Button';

import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';

import styles from '../../assets/jss/nextjs-material-kit/pages/components';
import { cardTitle } from '../../assets/jss/nextjs-material-kit';
import cardBodyStyle from '../../assets/jss/nextjs-material-kit/components/cardBodyStyle';
import imagesStyles from '../../assets/jss/nextjs-material-kit/imagesStyles';

import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer';
import Layout from '../../components/Layout/Layout';

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

export default function OnCryptocurrencies({
  postListCryptocurrencies,
}) {
  const classes = useStyles();
  return (
    <div>
      <NextSeo
        title="On Web Development Blog | Giorgio Tedesco | Just a web developer."
        description="This website section is on web development and new technologies applied to this context."
        canonical="https://www.giorgiotedesco.it/the-blog/on-web-development"
      />

      <Layout
        title="On Web Development"
        description="Understanding Websites works"
        image="dmitry-demidko-OG3A-ilG8AY-unsplash.jpg"
      >
        <GridContainer className={classes.gridStyle}>
          <GridItem sm={12} md={3} className={classes.mainStyle}>
            <Quote text={<h5>Your keys, your money</h5>} author="anonymous" />
          </GridItem>
          <GridItem sm={12} md={3} className={classes.mainStyle}>
            <Quote
              text={(
                <h5>
                  No one wants to be the first, no one wants to be the last
                </h5>
              )}
              author="Ivan on Tech"
            />
          </GridItem>
          <GridItem sm={12} md={3} className={classes.mainStyle}>
            <Quote text={<h5>When Lambo!</h5>} author="Folks" />
          </GridItem>
          <GridItem sm={12} md={3} className={classes.mainStyle}>
            <Quote text={<h5>Scarcity, Stock To Flow</h5>} author="PlanB" />
          </GridItem>
          {postListCryptocurrencies.map((item) => {
            const linking = `/the-blog/on-web-development/${item.slug}`;
            // return <li><Link href={linking}>{item.title}</Link></li>

            return (
              <GridItem sm={12} md={4}>
                <Card
                  style={{
                    width: '20rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <CardHeader color="warning">On Cryptocurrencies</CardHeader>
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
  const posts = await mdLoader('on-web-development');
  const paths = [];
  for (let c = 0; c < posts.length; c += 1) {
    const res = posts[c].split('.', 1);
    paths.push(res[0]);
  }

  const categoryList = [
    { slug: 'on-cryptocurrencies', title: 'The Blog on Cryptocurrencies' },
    {
      slug: 'on-3d-computer-graphic-and-blender',
      title: 'The Blog on Computer Graphic 3D and Blender',
    },
    // { slug: 'on-artificial-intelligence', title: 'The Blog on Artificial Intelligence' }
  ];

  const postListCryptocurrencies = [];

  for (let p = 0; p < paths.length; p += 1) {
    const data = await mdCryptoLoader(`on-web-development/${paths[p]}.md`);
    data.datePublished = JSON.stringify(data.datePublished);
    data.dateModified = JSON.stringify(data.dateModified);
    postListCryptocurrencies.push({ slug: paths[p], ...data.data });
  }

  return {
    props: { postListCryptocurrencies, categoryList },
  };
}
