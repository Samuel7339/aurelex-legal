
import type { Metadata } from 'next'
import React from 'react'
import './styles.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getSiteSettings } from '@/lib/payload/globals'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()

  const firmName = settings.firmName || ' Aurelex Legal'

  const favicon =
    settings.favicon && typeof settings.favicon === 'object'
      ? settings.favicon
      : null

  return {
    title: {
      default:
        settings.defaultSEO?.title ||
        `${firmName} | Legal Services`,
      template: `%s | ${firmName}`,
    },
    description:
      settings.defaultSEO?.description ||
      'Trusted legal guidance and strategic legal solutions for what matters most.',

      icons: favicon?.url
      ? {
          icon: favicon.url,
        }
      : undefined,
  }
}

export default async function RootLayout(props: {
  children: React.ReactNode
}) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        <Breadcrumbs/>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
