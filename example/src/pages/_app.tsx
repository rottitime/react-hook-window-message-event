import Head from 'next/head'
import { ReactNode } from 'react'
import { AppProps } from 'next/app'
import { NextPage } from 'next'

interface MyAppProps extends AppProps {
  Component: NextPage & {
    getLayout?: (page: ReactNode) => ReactNode
  }
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <>{getLayout(<Component {...pageProps} />)}</>
    </>
  )
}
