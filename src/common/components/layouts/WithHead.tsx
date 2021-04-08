import Head from "next/head"
import { ReactElement } from "react"

interface LayoutProps {
  children: ReactElement
  title: string
}

export const WithHead = (props: LayoutProps): ReactElement => {
  const { title = "poroia", children } = props

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main>{children}</main>
    </>
  )
}
