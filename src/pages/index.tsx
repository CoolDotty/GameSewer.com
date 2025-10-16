import React from 'react';
import Head from 'next/head';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content="0; url=/2025" />
        <title>Redirecting...</title>
      </Head>
      <div
        style={{
          backgroundColor: 'black',
          color: 'lime',
        }}
      >
        <p style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
          Redirecting to <a href="/2025">/2025</a>...
        </p>
      </div>
    </>
  );
};

export default Home;
