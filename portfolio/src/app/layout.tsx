'use client'
import React, { ReactNode, useEffect, useState } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Thurein Tun's Portfolio</title>
        <meta name="description" content="Portfolio of Thurein Tun, a passionate developer skilled in Node.js, JavaScript, Python, and more." />
      </head>
      <body>
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '2rem' }}>
          <header>
            <h1>Thurein Tun's Portfolio</h1>
            <nav>
              <a href="/">Home</a> | 
              <a href="/projects">Projects</a> | 
              <a href="/contact">Contact</a>
            </nav>
          </header>
          <main>
            <section>
              {isClient ? children : <p>Loading...</p>}
            </section>
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
