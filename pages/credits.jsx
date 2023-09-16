import React from 'react';
import { NextSeo } from 'next-seo';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Layout from '../components/Layout/Layout';

export default function Privacy() {
  return (
    <div>
      <NextSeo
        title="Credits | Giorgio Tedesco"
        description="In this page I'm going to thanks Authors of Plugin/Photos/Framework."
        canonical="https://wwww.giorgiotedesco.it/credits"
      />

      <Layout
        title={<>Credits</>}
        description={<>Thanks a lot for your work</>}
        image="junior-moran-hrEJYRtBDrk-unsplash.jpg"
      >
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h3>About the Frameworks</h3>

            <h5>React | Next</h5>
            <p>
              I don't love to use Cookies, that's way I don't use Cookies,
              because I don't track your navigation. This is a static website
              made with ReactJs / NextJs.
            </p>

            <h5>Creative Tim | Material Kit</h5>
            <p>
              I don't love to use Cookies, that's way I don't use Cookies,
              because I don't track your navigation. This is a static website
              made with ReactJs / NextJs.
            </p>
            <br />
            <br />

            <h3>About the Media</h3>
            <h5>
              Thanks to
              <b>Andras Vas</b>
            </h5>
            <p>
              The media I used is in homepage and You can check at this
              <a
                href="https://unsplash.com/@wasdrew"
                target="_blank"
                rel="noreferrer"
              >
                url
              </a>
              {' '}
              to find other photos made by Andras
            </p>

            <h5>
              Thanks to
              <b>Headway</b>
            </h5>
            <p>
              The media I used is in about me and You can check at this
              <a
                href="https://unsplash.com/@headwayio"
                target="_blank"
                rel="noreferrer"
              >
                url
              </a>
              {' '}
              to find other photos made by Headway
            </p>

            <h5>
              Thanks to
              <b>Charles Deluvio</b>
            </h5>
            <p>
              The media I used is in Privacy and You can check at this
              <a
                href="https://unsplash.com/@charlesdeluvio"
                target="_blank"
                rel="noreferrer"
              >
                url
              </a>
              {' '}
              to find other photos made by Charles Deluvio
            </p>

            <h5>
              Thanks to
              <b>Junior Moran</b>
            </h5>
            <p>
              The media I used in this page and You can check at this
              <a
                href="https://unsplash.com/@jr_morannn"
                target="_blank"
                rel="noreferrer"
              >
                url
              </a>
              {' '}
              to find other photos made by Junior Moran
            </p>

            <br />
            <br />
          </GridItem>
        </GridContainer>
      </Layout>
    </div>
  );
}
