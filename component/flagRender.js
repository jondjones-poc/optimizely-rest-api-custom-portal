import React from "react";
import { useRouter } from 'next/router'

const sdkKey = process.env.NEXT_PUBLIC_SDK_KEY;

const axios = require('axios');
axios.defaults.headers.common['Authorization'] = sdkKey;



const FeatureFlagComponent = ({ featureData }) => {

  const router = useRouter();

  const  toggleEnabledState = (url, router) => {
    axios.post(`https://api.optimizely.com/flags/v1/${url}`)
    .then(function (response) {
      console.log("Update Success", response);
      router.reload(window.location.pathname)
    }).catch(ex =>
      console.log("Update Failed", response)
    )
  };

  return (
    <div>
        {featureData?.map(({ name, enabled, environment, url}, index) => (
        <div key={index}>
            <h3>{name}={enabled} on {environment} <button onClick={() => toggleEnabledState(url, router)}>Toggle Status</button></h3>
        </div>)
        )}
    </div>
  );
}

export default FeatureFlagComponent;