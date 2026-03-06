import "./globals.css"
import { Merriweather } from "next/font/google"
import { Be_Vietnam_Pro } from "next/font/google";

// const beVietnam = Be_Vietnam_Pro({
//   subsets: ["vietnamese"],
//   weight: ["400","600","700"],
// });

const merri = Merriweather({
  subsets: ["latin"],
  weight: ["300","400","700","900"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={merri.className}>
        {children}
      </body>
    </html>
  )
}