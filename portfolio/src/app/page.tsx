"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HomePage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
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
        <section>{isClient ? <p>Welcome to my portfolio!</p> : <p>Loading...</p>}</section>
      </main>
      <footer>
        <p>&copy; 2024 Thurein Tun</p>
      </footer>
    </div>
  );
};

export default HomePage;
