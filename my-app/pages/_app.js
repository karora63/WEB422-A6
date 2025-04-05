import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import { SWRConfig } from 'swr';
import { useState } from 'react';

// Fetcher function for SWR
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export default function MyApp({ Component, pageProps }) {
  const [error, setError] = useState(null);

  return (
    <SWRConfig
      value={{
        fetcher,
        onError: (err) => setError(err), // Global error handler
      }}
    >
      <Layout>
        {error ? (
          <div className="alert alert-danger">{error.message}</div> // Show global error message
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </SWRConfig>
  );
}
