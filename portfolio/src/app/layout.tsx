import type { Metadata } from 'next'
import './globals.css'

export const metadata : Metadata = {
  title: "Thurein Tun's Portfolio",
  description: "Portfolio of Thurein Tun, a passionate developer skilled in Node.js, JavaScript, Python, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title className='text-red-500'>Portfolio</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
