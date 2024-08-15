import React from 'react';
import Layout from '../layout';

type Project = {
  title: string;
  description: string;
  link?: string; // Optional, if you want to link to the live project or GitHub repo
};

const projects: Project[] = [
  {
    title: 'Mustream Project',
    description: 'A music streaming application that allows users to stream and manage music playlists. Built with [list technologies and features you used].',
    link: 'https://github.com/dotNaimlyss/mustream',
  },
  {
    title: 'Python Online Library Project',
    description: 'A Python-based online library system where users can search for books, borrow, and manage their loans. It includes features like [mention key features or technologies].',
    link: 'https://github.com/dotNaimlyss/Python-Online-Library-Project',
  },
  // Add more projects as needed
];

const ProjectsPage: React.FC = () => {
  return (
    <Layout>
      <h2>Projects</h2>
      <div>
        {projects.map((project, index) => (
          <div key={index} style={{ marginBottom: '2rem' }}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.link && (
              <p>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProjectsPage;
