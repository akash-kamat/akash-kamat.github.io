import type { Project } from '../../data/projects';
import { FiCode, FiExternalLink } from 'react-icons/fi';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const openUrl = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="project-card" style={{ backgroundColor: project.color }}>
            {/* Header */}
            <div className="project-header">
                <h1 className="project-title">{project.name}</h1>
                <div className="window-dots">
                    <span className="window-dot" style={{ backgroundColor: '#31c146' }} />
                    <span className="window-dot" style={{ backgroundColor: '#f5b63e' }} />
                    <span className="window-dot" style={{ backgroundColor: '#f45450' }} />
                </div>
            </div>

            {/* Image */}
            <div className="project-image-frame">
                <img src={project.img} alt={project.name} className="project-image" loading="lazy" />
            </div>

            {/* Hover Overlay */}
            <div className="project-overlay">
                <p className="project-desc">{project.description}</p>
                <div className="project-buttons">
                    <button
                        className="project-btn project-btn-github"
                        onClick={() => openUrl(project.github_url)}
                        title="View code"
                    >
                        <FiCode size={18} />
                    </button>
                    <button
                        className="project-btn project-btn-live"
                        onClick={() => openUrl(project.hosted_url)}
                        title="View live"
                    >
                        <FiExternalLink size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
