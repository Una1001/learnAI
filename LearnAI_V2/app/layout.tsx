import type { Metadata } from 'next'
import { Nunito, Noto_Sans_TC } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito',
});

const notoSansTC = Noto_Sans_TC({ 
  subsets: ["latin"],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-tc',
});

export const metadata: Metadata = {
  title: '時空冒險導師 | AI 智慧教育平台',
  description: '讓歷史活過來！與歷史人物對話，開啟你的時空冒險之旅',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW" className={`${nunito.variable} ${notoSansTC.variable}`}>
      <body className="font-sans antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
