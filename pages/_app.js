import "../styles/style.scss";
import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import firebase from "../firebase/firebase";
import { Spin } from "antd";

function MyApp({ Component, pageProps }) {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(async () => {
    await firebase.isInitialized();
    setFirebaseInitialized(true);
  }, []);

  return (
    <>
      {!firebaseInitialized ? (
        <div className="fullscreenflexmiddle">
          <Spin />
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
