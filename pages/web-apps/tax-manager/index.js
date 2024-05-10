import Layout from '@/Layout/Layout';
import TaxManager from '@/TaxManager/TaxManager';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import styles from '../../../assets/jss/nextjs-material-kit/pages/components';

const useStyles = makeStyles(styles);

export default function Index() {
  const classes = useStyles();
  return (
    <Layout
      title='Tax Manager'
      description={
        <>
          <h3 className={classes.subtitle}>
            Useful tools for CEOs, Managers and Cryptoinvestors
          </h3>
        </>
      }
      image='scott-graham-OQMZwNd3ThU-unsplash.jpg'
    >
      <br />
      <TaxManager />
    </Layout>
  );
}
