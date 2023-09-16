import React from 'react';

import { NextSeo } from 'next-seo';
import SectionMicroBio from '../pages-sections/Components-Sections/SectionMicroBio';

import Layout from '../components/Layout/Layout';

export default function AboutMe() {
  return (
    <div>
      <NextSeo
        title="About Me | Giorgio Tedesco"
        description="the skills of Giorgio Tedesco as a webdeveloper, CV/Resume and a little Bio"
        canonical="https://wwww.giorgiotedesco.it/about-me"
      />

      <Layout
        title="about Giorgio Tedesco"
        description="just a web developer"
        image="headway-5QgIuuBxKwM-unsplash.jpg"
      >
        <SectionMicroBio />
      </Layout>
    </div>
  );
}
