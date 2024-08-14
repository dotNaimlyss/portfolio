import React from 'react';
import Layout from './layout';

type Project = {
  title: string;
  description: string;
  link?: string; // Optional, if you want to link to the live project or GitHub repo
};

const projects: Project[] = [
  {
    title: 'Item Management Android App',
    description: 'An Android application for item management with features like user registration, login, item creation, management, and delegation via SMS. Integrated with Firebase Authentication and Google Cloud for database integration.',
    link: 'https://github.com/dotNaimlyss/item-management-app', // Example GitHub link
  },
  {
    title: 'Next.js Developer Portfolio',
    description: 'A portfolio website built using Next.js, showcasing skills and projects with a minimalistic black-and-white theme.',
    link: 'https://github.com/dotNaimlyss/portfolio', // Example GitHub link
  },
  {
    title: 'Machine Learning Model',
    description: 'A machine learning model developed to predict housing prices based on various features. Implemented using Python and TensorFlow.',
    link: 'https://github.com/dotNaimlyss/ml-housing-price-predictor', // Example GitHub link
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
