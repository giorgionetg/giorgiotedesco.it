import React, { Component } from "react";
import Router from "next/router";
import Link from "next/link";

import SectionMicroBio from "pages-sections/Components-Sections/SectionMicroBio.js";

import Layout from 'components/Layout/Layout.js'

import { NextSeo } from 'next-seo';

export default class AboutMe extends Component {

  render() {
    return (
      <div>

        <NextSeo
          title="About Me | Giorgio Tedesco"
          description="the skills of Giorgio Tedesco as a webdeveloper, CV/Resume and a little Bio"
          canonical="https://wwww.giorgiotedesco.it/about-me"
        />

        <Layout title='about Giorgio Tedesco' description='just a web developer' image='headway-5QgIuuBxKwM-unsplash.jpg'>
          <SectionMicroBio />
        </Layout>
      </div>
    );
  }
}
