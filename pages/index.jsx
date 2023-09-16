import React from 'react';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout/Layout';
import HomeSection from '../pages-sections/LandingPage-Sections/HomeSection';

export default function Components() {
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
        image="epicRealismV5-homepage.png"
      >
        <HomeSection />
      </Layout>
    </div>
  );
}
