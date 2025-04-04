import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "@/navigationbar/Layout";
import RouteGuard from "@/navigationbar/RouteGuard";
import { SWRConfig } from "swr";


export default function App({ Component, pageProps }) {
  return (
    <RouteGuard>
      <Layout>
        <SWRConfig
          value={{
            fetcher: async (url) => {
              const res = await fetch(url);
              if (!res.ok) {
                const error = new Error(
                  "An error occurred while fetching the data."
                );
                throw error;
              }
              return res.json();
            },
          }}>
          <Component {...pageProps} />
        </SWRConfig>
      </Layout>
    </RouteGuard>
  );
}