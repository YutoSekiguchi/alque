import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Session } from 'next-auth'
import SessionProvider from '../providers/session_provider'
import Header from './components/common/header/layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'アルクエ',
  description: '「この画像の元画像は何でしょう？」というように、投稿された画像から元画像を当てるサービスです。',
}

export default function RootLayout({
  session,
  children,
}: {
  session: Session | null | undefined,
  children: React.ReactNode
}) {
  return (
      <html lang="ja">
        <body className={inter.className}>
          <SessionProvider session={session}>
            <div className='flex'>
              <Header />
              <div className='ml-20'>
                {children}
              </div>
            </div>
          </SessionProvider>
        </body>
      </html>
  )
}
