
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'

import Layout from "components/Layout/Layout.js";
import TweetSection from "pages-sections/LandingPage-Sections/TweetSection.js";

import { appConfig } from '../../../assets/constants';
import { UserSession } from '@stacks/auth';
const userSession = new UserSession({ appConfig });
import { Storage } from '@stacks/storage';
const storage = new Storage({ userSession });

const fetchPosts = async (user) => {
  const tasksJSON = await storage.getFile('status.json', {
    decrypt: false,
    username: user,
  });
  console.log(tasksJSON)
  return JSON.parse(tasksJSON)
}


export default function singlePost(props) {

  const { query } = useRouter()
  let toCheck = Object.keys(query);
  let username = toCheck[0];

  const [blockstack, setBlockstack] = useState([]);

  useEffect(() => {
    fetchPosts(username).then((res) => {

      setBlockstack(res.posts.sort((a,b) => { return b.datetime - a.datetime}));
    }).catch(err => setBlockstack([{id:0, emotion: 'Attention', sentence: 'This user doesn\'t exists or isn\'t regisered'}]))
  }, []);


  return (
    <>
      <Layout title="Messages" description={ (<>a mini DApp for <b>{username}</b></>)} image='philipp-katzenberger-iIJrUoeRoCQ-unsplash.jpg'>
        <TweetSection posts={blockstack}/>
      </Layout>
    </>
  );
}
