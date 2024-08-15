"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ProjectsPage: React.FC = () => {
  const pathname = usePathname();

  const projects = [
    {
      title: 'Mustream Project',
      description: 'A music streaming application...',
      link: 'https://github.com/dotNaimlyss/mustream',
    },
    {
      title: 'Python Online Library Project',
      description: 'A Python-based online library system...',
      link: 'https://github.com/dotNaimlyss/Python-Online-Library-Project',
    },
    // Add more projects as needed
  ];

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
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Contacts</h2>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <div key={index} className="p-6 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-gray-700">{project.title}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-4 block"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </main>
      <footer>
        <p>&copy; 2024 Thurein Tun</p>
      </footer>
    </div>
  );
};

export default ProjectsPage;
