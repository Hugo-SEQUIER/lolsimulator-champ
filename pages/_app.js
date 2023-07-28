import "../styles/main.css";
import "../styles/accueil.css";
import "../styles/details.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      document.title =
        "LoL Simulator : Unleash Your Strategy: The Ultimate League of Legends Stuff and Damage Simulator ";
    }
    // Ajoutez d'autres conditions pour d'autres pages si nécessaire
  }, [router.pathname]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
      <footer>
        <div className="footer-container">
          <p>&copy; 2023 Hugo SEQUIER. All rights reserved.</p>
          <div className="footer-link">
            <Link href={"about"}>About</Link>
            <Link href={"privacy"}>Privacy Policy</Link>
            <Link href={"release"}>Release</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MyApp;
