import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import Button from "../components/Button";
import Channel from "../components/Channel/Index";
import SignMethods from "../components/SignMethods";
import MainChat from "../components/mainChat";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyB1huIOk0WpvYCbSb1xqd4RBD3Dt8PYe-s",
    authDomain: "random-people-a5f14.firebaseapp.com",
    projectId: "random-people-a5f14",
    storageBucket: "random-people-a5f14.appspot.com",
    messagingSenderId: "425238964552",
    appId: "1:425238964552:web:1e1a0b21a05a6fced02b7d",
  });
} else {
  firebase.app(); // if already initialized, use that one
}

const auth = firebase.auth();
const db = firebase.firestore();

export default function Home() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(() => auth.currentUser);
  const [docs, setDocs] = useState();

  const db = firebase.firestore();
  const query = db.collection("Messages").orderBy("createdAt").limit(100);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    // Cleanup subscription
    return unsubscribe;
  }, [initializing]);

  useEffect(() => {
    // Subscribe to query with onSnapshot
    const unsubscribe = query.onSnapshot((querySnapshot) => {
      // Get all documents from collection - with IDs
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // Update state
      setDocs(data);
    });

    // Detach listener
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // Set language to the default browser preference
    firebase.auth().useDeviceLanguage();
    // Start sign in process
    try {
      await firebase.auth().signInWithPopup(provider);
      document.querySelector("aside").style.display = "none";
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const closeMenu = () => {
    document.querySelector("aside").style.display = "none";
  };

  return (
    <div className="main-content">
      <Head>
        <title>Random Chatty</title>
        <meta name="description" content="talk with random people!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignMethods {...user}>
        {user && (
          <button className="button" onClick={closeMenu}>
            <Image
              alt="Close"
              src="https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Cross-256.png"
              width={25}
              height={25}
            />
          </button>
        )}
        {user ? (
          <>
            <Button onClick={signOut}>
              <Image
                alt="Sign out"
                src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2/128/social-circle-google-plus-2-256.png"
                width={25}
                height={25}
              />
              <p>Sign out</p>
            </Button>
          </>
        ) : (
          <>
            <Button onClick={signInWithGoogle}>
              <Image
                alt="SignIn with Google"
                src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2/128/social-circle-google-plus-2-256.png"
                width={25}
                height={25}
              />

              <p> Sign in with Google</p>
            </Button>
          </>
        )}

        <article>
          <nav>
            <ul>
              <li>
                <Link href="https://epeixoto.me">
                  <a className="github" style={{ backgroundColor: "#EDAE49" }}>
                    <Image
                      alt="Euller Peixoto personal Website"
                      src="https://cdn4.iconfinder.com/data/icons/internet-security-flat-2/32/Internet_Security_Browser_webpage_website_web_page-256.png"
                      width={25}
                      height={25}
                    />
                    <p>Go to Author&apos;s Website</p>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="https://github.com/MoranggNormal/random-people">
                  <a className="github" style={{ backgroundColor: "#191919" }}>
                    <Image
                      alt="Source code on Github"
                      src="https://cdn1.iconfinder.com/data/icons/picons-social/57/github_rounded-256.png"
                      width={25}
                      height={25}
                    />
                    <p>View Source Code</p>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="https://www.linkedin.com/in/euller-peixoto">
                  <a className="github" style={{ backgroundColor: "#30638E" }}>
                    <Image
                      alt="Euller Peixoto LinkedIn profile"
                      src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Linkedin_unofficial_colored_svg-256.png"
                      width={25}
                      height={25}
                    />
                    <p>Contact on LinkedIn</p>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="https://www.facebook.com/euller.peixoto.18">
                  <a
                    target="_blank"
                    className="github"
                    style={{ backgroundColor: "#1876f0" }}
                  >
                    <Image
                      alt="Euller Peixoto Facebook profile"
                      src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/facebook-256.png"
                      width={25}
                      height={25}
                    />
                    <p>Contact on Facebook</p>
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </article>

        <footer>
          Made with
          <span>
            <Image
              alt="Heart icon"
              src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-256.png"
              width={17}
              height={17}
            />
          </span>
          by Euller Peixoto
        </footer>
      </SignMethods>

      {user && <MainChat>{user && <Channel user={user} />}</MainChat>}
    </div>
  );
}
