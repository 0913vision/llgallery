import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '사랑의빛교회 사진첩 (테스트)',
  description: '사랑의빛교회 사진첩입니다.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='navbar'>
          <div className="navbar__logo">
            사랑의빛교회
          </div>
          <ul className='navbar__menu'>
            <li><Link href="/">로그인</Link></li>
          </ul>
        </div>
        {children}
        <div className='bottom-navbar'>
          <ul className='bottom-navbar__menu'>
            <BottomNavMenuItem src='next.svg' value='메뉴1' href="/"/>
            <BottomNavMenuItem src='next.svg' value='업로드' href="/upload"/>
          </ul>
        </div>
      </body>
    </html>
  )
}

function BottomNavMenuItem({src, value, href}) {
  return (
    <li><Link href={href}>
      <div className='bottom-navbar__menu-item'>
        <img src={src}/>
        <span>{value}</span>
      </div>
    </Link></li>
  )
}