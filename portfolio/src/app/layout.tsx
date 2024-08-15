"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Head from "next/head"; // Import Head for managing metadata
import Link from "next/link";
import { usePathname } from "next/navigation";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname()
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>Thurein Tun's Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Thurein Tun, a passionate developer skilled in Node.js, JavaScript, Python, and more."
        />
      </Head>
      <body>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "2rem" }}>
          <header>
            <h1>Thurein Tun's Portfolio</h1>
            <nav>
              <Link href="/">Home</Link> |
              <Link className={`link ${pathname === '/projects' ? 'active' : ''}`} href="/projects">Projects</Link> |
              <Link href="/contact">Contact</Link>
            </nav>
          </header>
          <main>
            <section>{isClient ? children : <p>Loading...</p>}</section>
          </main>
          <footer>
            <p>&copy; 2024 Thurein Tun</p>
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;
