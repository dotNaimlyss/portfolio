// app/projects/page.tsx
"use client";

import React from "react";
import { ThemeProvider } from "../context/ThemeContext";

const ProjectsPage: React.FC = () => {
  const projects = [
    {
      title: "Mustream Project",
      description: "A music streaming application...",
      link: "https://github.com/dotNaimlyss/mustream",
    },
    {
      title: "Python Online Library Project",
      description: "A Python-based online library system...",
      link: "https://github.com/dotNaimlyss/Python-Online-Library-Project",
    },
    // Add more projects as needed
  ];

  return (
    <ThemeProvider>
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Projects
        </h2>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {project.description}
              </p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 dark:text-blue-400 hover:underline mt-4 block"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </ThemeProvider>
  );
};

export default ProjectsPage;
