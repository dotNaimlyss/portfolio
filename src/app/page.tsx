// page.tsx

"use client";

import React from "react";
import Greet from "./components/Hero";
import GamingSection from "./components/Section";
import HighlightsSection from "./components/HighlightsSection";

const HomePage: React.FC = () => {
  return (
    <section>
      <Greet />
      {/* <GamingSection /> */}
      <HighlightsSection />
    </section>
  );
};

export default HomePage;
