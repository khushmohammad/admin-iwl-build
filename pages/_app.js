import "../styles/globals.css";
import { persistor, store, wrapper } from "../store";
import { Provider } from "react-redux";
import "../public/assets/scss/socialv.scss";
import "../public/assets/scss/customizer.scss";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { SSRProvider } from "react-bootstrap";
import { PersistGate } from "redux-persist/integration/react";
import "react-datepicker/dist/react-datepicker.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <title>Integrating with love</title>
      </Head>

      <SSRProvider>
        <SessionProvider session={session}>
          {/* <Provider store={store}> */}
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
          {/* </Provider> */}
        </SessionProvider>
      </SSRProvider>
    </>
  );
}

// export default MyApp;
export default wrapper.withRedux(MyApp);
