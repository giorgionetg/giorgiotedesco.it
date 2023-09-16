import React from 'react';

import { NextSeo } from 'next-seo';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Layout from '../components/Layout/Layout';

export default function Privacy() {
  return (
    <div>
      <NextSeo
        title="Giorgio Tedesco | GDPR and Privacy Settings"
        description="In this page you can set your preferences on Cookies."
        canonical="https://wwww.giorgiotedesco.it/privacy"
      />

      <Layout
        title={(
          <>
            GDPO & Privacy
            <br />
            Management Tool.
          </>
        )}
        description={(
          <>
            Please take care the website is
            <br />
            {' '}
            a personal space.
            <sup>
              <small>I love Privacy.</small>
            </sup>
          </>
        )}
        image="charles-deluvio-pjAH2Ax4uWk-unsplash.jpg"
      >
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h3>Things to know</h3>
            <p>
              I don't love to use Cookies, that's way I don't use Cookies,
              because I don't track your navigation. This is a static website
              made with ReactJs / NextJs.
            </p>
            <h4>
              <strong>
                <sup>*</sup>
                While I don't like to use cookies, to store your choice on "I
                allow all Cookies", I have to save in to the browser at Cookie
                Name: CookieConsent. Anyway this website is in Working progress,
                there are some libraries and links from
                {' '}
                <i>
                  Google Fonts
                </i>
                {' '}
                and
                {' '}
                <i>Material Icon</i>
                {' '}
                that are loaded from providers.
                They could track you.
              </strong>
            </h4>
            <br />
            <br />
          </GridItem>
        </GridContainer>
      </Layout>
    </div>
  );
}
