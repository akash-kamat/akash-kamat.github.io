import { useState } from 'react';
import './WorkApp.css';

interface Project {
    id: string;
    name: string;
    type: 'folder' | 'file';
    description: string;
    tech: string[];
    github?: string;
    live?: string;
    icon: string;
}

const projects: Project[] = [
    {
        id: '1',
        name: 'E-Commerce Platform',
        type: 'folder',
        description: 'A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        github: 'https://github.com',
        live: 'https://example.com',
        icon: '📁',
    },
    {
        id: '2',
        name: 'Task Management App',
        type: 'folder',
        description: 'Real-time collaborative task management application with drag-and-drop functionality.',
        tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
        github: 'https://github.com',
        live: 'https://example.com',
        icon: '📁',
    },
    {
        id: '3',
        name: 'AI Chat Bot',
        type: 'folder',
        description: 'Intelligent chatbot powered by GPT-4 with custom training capabilities.',
        tech: ['Python', 'FastAPI', 'OpenAI', 'Redis'],
        github: 'https://github.com',
        icon: '📁',
    },
    {
        id: '4',
        name: 'Portfolio OS',
        type: 'folder',
        description: 'This very portfolio! A Windows 7-inspired OS experience in the browser.',
        tech: ['React', 'TypeScript', 'Zustand', 'Framer Motion'],
        github: 'https://github.com',
        live: 'https://example.com',
        icon: '📁',
    },
    {
        id: '5',
        name: 'README.md',
        type: 'file',
        description: 'Documentation file',
        tech: [],
        icon: '📄',
    },
];

const WorkApp = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
    };

    const handleBack = () => {
        setSelectedProject(null);
    };

    return (
        <div className="work-app">
            {/* Explorer Toolbar */}
            <div className="explorer-toolbar">
                <button
                    className="explorer-toolbar__btn"
                    onClick={handleBack}
                    disabled={!selectedProject}
                >
                    ← Back
                </button>
                <div className="explorer-toolbar__address">
                    <span className="explorer-toolbar__icon">📁</span>
                    <span className="explorer-toolbar__path">
                        {selectedProject ? `Work > ${selectedProject.name}` : 'Work'}
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div className="explorer-content">
                {!selectedProject ? (
                    /* File List View */
                    <div className="explorer-files">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="explorer-file"
                                onClick={() => handleProjectClick(project)}
                            >
                                <span className="explorer-file__icon">{project.icon}</span>
                                <span className="explorer-file__name">{project.name}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Project Detail View */
                    <div className="project-detail">
                        <div className="project-detail__header">
                            <span className="project-detail__icon">{selectedProject.icon}</span>
                            <h2 className="project-detail__name">{selectedProject.name}</h2>
                        </div>

                        <div className="project-detail__section">
                            <h3>Description</h3>
                            <p>{selectedProject.description}</p>
                        </div>

                        {selectedProject.tech.length > 0 && (
                            <div className="project-detail__section">
                                <h3>Technologies</h3>
                                <div className="project-detail__tech">
                                    {selectedProject.tech.map((t) => (
                                        <span key={t} className="project-detail__tech-tag">{t}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="project-detail__links">
                            {selectedProject.github && (
                                <a
                                    href={selectedProject.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-detail__link"
                                >
                                    📂 View on GitHub
                                </a>
                            )}
                            {selectedProject.live && (
                                <a
                                    href={selectedProject.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-detail__link"
                                >
                                    🌐 Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div className="explorer-status">
                {selectedProject
                    ? `Project: ${selectedProject.name}`
                    : `${projects.length} items`}
            </div>
        </div>
    );
};

export default WorkApp;
