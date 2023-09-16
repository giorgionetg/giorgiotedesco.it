import classNames from 'classnames';

import { NextSeo } from 'next-seo';
import { makeStyles } from '@material-ui/core/styles';
import Parallax from '../../components/Parallax/Parallax';
import GTheaderLinks from '../../components/Header/GTheaderLinks';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/CustomButtons/Button';

import Header from '../../components/Header/Header';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';

import styles from '../../assets/jss/nextjs-material-kit/pages/components';
import { cardTitle } from '../../assets/jss/nextjs-material-kit';
import cardBodyStyle from '../../assets/jss/nextjs-material-kit/components/cardBodyStyle';
import imagesStyles from '../../assets/jss/nextjs-material-kit/imagesStyles';

const gridStyle = {
  paddingTop: '3em',
  paddingBottom: '1em',
};

const newstyles = {
  ...styles,
  imagesStyles,
  cardBodyStyle,
  cardTitle,
  gridStyle,
};

const useStyles = makeStyles(newstyles);

export default function OnCryptocurrencies({ postListCryptocurrencies }) {
  const classes = useStyles();
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
        title="APP, Web App and DApp | Giorgio Tedesco | Just a web developer."
        description="Some useful or not web App."
        canonical="https://www.giorgiotedesco.it/the-blog/on-cryptocurrencies"
      />

      <Parallax
        image={require('../../assets/img/charles-deluvio-pjAH2Ax4uWk-unsplash.jpg')}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Web App and DApp</h1>
                <h3 className={classes.subtitle}>
                  You can choose to login and save data on BlockStack (Gaia) or
                  in your browser (LocalStorage).
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main)}>
        <div className={classes.container}>
          <GridContainer className={classes.gridStyle}>
            {postListCryptocurrencies.map((item) => {
              const linking = `/web-apps/${item.slug}`;
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
                    <CardHeader color="info">{item.type}</CardHeader>
                    {/* <img class="card-img-top" src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=200&q=30" rel="nofollow" alt="Card image cap" /> */}
                    <CardBody>
                      <h4 className={classes.cardTitle}>{item.title}</h4>
                      <p>{item.description}</p>
                      <Button as="link" href={linking} fullWidth>
                        Go To
                      </Button>
                    </CardBody>
                  </Card>
                </GridItem>
              );
            })}
          </GridContainer>
        </div>
      </div>

      {/* <ul>
        {categoryList.map((item) => {
          let linking = '/the-blog/' + item.slug;
          return <li><Link href={linking}>{item.title}</Link></li>
        })}
      </ul> */}

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  // let posts = await mdLoader('on-cryptocurrencies');
  // let paths = [];
  /* for (let c = 0; c < posts.length; c++) {
    let res = posts[c].split('.', 1);
    paths.push(res[0]);
  }

  let categoryList = [
    { slug: 'on-cryptocurrencies', title: 'The Blog on Cryptocurrencies' },
    {
      slug: 'on-3d-computer-graphic-and-blender',
      title: 'The Blog on Computer Graphic 3D and Blender'
    },
    { slug: 'on-artificial-intelligence', title: 'The Blog on Artificial Intelligence' }
  ]; */

  const postListCryptocurrencies = [];

  /* postListCryptocurrencies.push({
    title: 'QR Code Generator',
    slug: 'tools/qr-code-generator',
    description: 'An easy QR Code Generator for all'
  })

  postListCryptocurrencies.push({
    title: 'Hex To Binary and viceversa',
    slug: 'hex-to-binary-n-viceversa',
    description: 'An easy QR Code Generator for all'
  }) */

  postListCryptocurrencies.push({
    title: 'JSON CV Viewer',
    slug: 'json-resume/viewer',
    type: 'tool',
    description: 'Try to find me!',
  });

  postListCryptocurrencies.push({
    title: 'Who am I?',
    slug: 'games/who-am-i',
    type: 'game',
    description: 'Try to find me!',
  });

  /* for (let p = 0; p < paths.length; p++) {
    let data = await mdCryptoLoader('on-cryptocurrencies/' + paths[p] + '.md');
    console.log(data.datePublished)
    data.datePublished = JSON.stringify(data.datePublished);
    data.dateModified = JSON.stringify(data.dateModified);
    postListCryptocurrencies.push({ slug: paths[p], ...data.data });
  } */

  return {
    props: { postListCryptocurrencies }, // will be passed to the page component as props
  };
}
