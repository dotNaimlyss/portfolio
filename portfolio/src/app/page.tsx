// page.tsx

"use client";

import React from "react";
import { ThemeProvider } from "./context/ThemeContext"; // Import the provider
import Greet from "./components/Hero";
import GamingSection from "./components/Section";

const HomePage: React.FC = () => {
  return (
    <ThemeProvider>
      <section>
        <Greet />
        <GamingSection />
      </section>
    </ThemeProvider>
  );
};

export default HomePage;
