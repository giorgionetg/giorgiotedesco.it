import React, { useEffect, useState } from 'react';

import { NextSeo } from 'next-seo';
import Layout from '../components/Layout/Layout';

import HomeSection from '../pages-sections/LandingPage-Sections/HomeSection';
import TweetSection from '../pages-sections/LandingPage-Sections/TweetSection';

// https://gaia.blockstack.org/hub/1NsfK4B23SFDj1xqh85FANqnrFG1zKU2BU/status.json

export default function Components() {
  const [blockstack, setBlockstack] = useState([
    {
      id: 0,
      emotion: '',
      sentence: '',
      datetime: 0,
    },
  ]);

  useEffect(() => {
    // localhost:   https://gaia.blockstack.org/hub/1NsfK4B23SFDj1xqh85FANqnrFG1zKU2BU/status.json
    // prod:        https://gaia.blockstack.org/hub/1N3qdhpi671XKMaayJ2hnuB85MbciL9RQC/status.json

    fetch(
      'https://gaia.blockstack.org/hub/1N3qdhpi671XKMaayJ2hnuB85MbciL9RQC/status.json',
    )
      .then((res) => res.json())
      .then((data) => setBlockstack(data.posts.sort((a, b) => b.datetime - a.datetime)));
  }, []);

  return (
    <div>
      <NextSeo
        title="Giorgio Tedesco | Just a web developer"
        description="a personal Giorgio Tedesco's website used to share my interests on web developing, 3D Graphic, Cryptocurrencies (Bitcoin & Altcoin), Artificial Inteligence, Deep Learning."
        canonical="https://www.giorgiotedesco.it"
        openGraph={{
          type: 'website',
          url: 'https://www.giorgiotedesco.it',
          title: 'Giorgio Tedesco',
          description: 'Just a web developer',
          images: [
            {
              url: 'https://www.giorgiotedesco.it/_next/static/images/andras-vas-Bd7gNnWJBkU-unsplash-61553867678a3db4ae1acd2767d06321.jpg',
              alt: 'Andras Vas - Unsplash',
            },
          ],
        }}
      />

      <Layout
        title="Just a web developer"
        description="Based in Rome (Italy) and born in Brazil!"
        image="andras-vas-Bd7gNnWJBkU-unsplash.jpg"
      >
        <HomeSection />
        <TweetSection posts={blockstack} />
      </Layout>
    </div>
  );
}
