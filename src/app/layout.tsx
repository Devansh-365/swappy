import './globals.css'
import type { Metadata } from 'next'
import { Inter, Quicksand } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Swappy',
  description: `The platform for IT talents, whether you're a freelancer or an employee!`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
