
import '../styles/main.css';
import '../styles/accueil.css'
import '../styles/details.css'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      document.title = 'S GG : Unleash Your Strategy: The Ultimate League of Legends Stuff and Damage Simulator ';
    }
    // Ajoutez d'autres conditions pour d'autres pages si nécessaire
  }, [router.pathname]);


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
      <footer>
        <div className="footer-container">
          <p>&copy; 2023 Placeholder</p>
        </div>
      </footer>
    </>
  )
}

export default MyApp
