// page.tsx

"use client";

import React from "react";
import Greet from "./components/Hero";
import GamingSection from "./components/Section";

const HomePage: React.FC = () => {
  return (
    <section>
      <Greet />
      <GamingSection />
    </section>
  );
};

export default HomePage;
