import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
        <Html lang="fr">
            <Head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />

                <meta name="theme-color" content="#000000" />
                <link rel="apple-touch-icon" href="/logo192.png" />

                <link rel="manifest" href="/manifest.json" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet" />

                <meta name="description" content="Discover the ultimate simulator for stuff and damage of League of Legends characters. Optimize your gameplay strategy, test different stuff, and assess the impact on your favorite characters' damage. Start simulating now." />

                <meta name="keywords" content="League of Legends, damage simulator, stuff simulator, gameplay strategy, character optimization, League of Legends guide, LoL simulation tool, LoL Stuff, LoL damage, LoL character" />

                <meta name="robots" content="index, follow" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
      </Html>
    )
  }
}

export default MyDocument
