import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import Image from 'next/image'

const sdkKey = process.env.NEXT_PUBLIC_SDK_KEY;
const projectId = process.env.NEXT_PUBLIC_DEFAULT_PROJECT_ID;

const axios = require('axios');
axios.defaults.headers.common['Authorization'] = sdkKey;

export default function Home() {

  const [flagData, setFlagData] = useState([]);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {

    let environmentData = '';

    // Get Project Data
    axios.get(`https://api.optimizely.com/v2/projects/${projectId}`)
    .then(function (response) {
      setProjectName(response.data.name)
    });

    axios.get(`https://api.optimizely.com/v2/environments?project_id=${projectId}`)
    .then(function (response) {
      environmentData = response.data.map(x => {
        return {
          name: x.name,
          datafile: JSON.stringify(x.datafile)
        };
      });
      setFlagData(environmentData);
    });

  },[]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <Image src="/logo.png" alt="me" width="250" height="64" />

        <h1>
          Environments for {projectName}:
        </h1>

        <div>
          {flagData.map(({ name, datafile }, index) => (
            <div key={index}> {name} <br /> {datafile} </div>
          ))}
        </div>

      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
