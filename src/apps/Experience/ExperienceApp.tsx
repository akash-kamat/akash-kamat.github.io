import './ExperienceApp.css';

interface Experience {
    id: string;
    type: 'work' | 'education';
    title: string;
    organization: string;
    startDate: string;
    endDate: string;
    description: string[];
    timestamp: string;
}

const experiences: Experience[] = [
    {
        id: '1',
        type: 'work',
        title: 'Senior Full Stack Developer',
        organization: 'Tech Company Inc.',
        startDate: 'Jan 2023',
        endDate: 'Present',
        description: [
            'Led development of microservices architecture serving 1M+ users',
            'Mentored junior developers and conducted code reviews',
            'Implemented CI/CD pipelines reducing deployment time by 60%',
        ],
        timestamp: '2023-01-15T09:00:00',
    },
    {
        id: '2',
        type: 'work',
        title: 'Full Stack Developer',
        organization: 'Startup XYZ',
        startDate: 'Jun 2021',
        endDate: 'Dec 2022',
        description: [
            'Built responsive web applications using React and Node.js',
            'Designed and implemented RESTful APIs',
            'Optimized database queries improving performance by 40%',
        ],
        timestamp: '2021-06-01T09:00:00',
    },
    {
        id: '3',
        type: 'education',
        title: 'Bachelor of Computer Science',
        organization: 'University of Technology',
        startDate: 'Aug 2017',
        endDate: 'May 2021',
        description: [
            'Graduated with honors (GPA: 3.8/4.0)',
            'Specialized in Software Engineering',
            'Completed thesis on Machine Learning applications',
        ],
        timestamp: '2017-08-01T09:00:00',
    },
    {
        id: '4',
        type: 'work',
        title: 'Software Engineering Intern',
        organization: 'Big Corp Ltd.',
        startDate: 'May 2020',
        endDate: 'Aug 2020',
        description: [
            'Developed internal tools using Python and Django',
            'Collaborated with cross-functional teams',
            'Presented project findings to stakeholders',
        ],
        timestamp: '2020-05-01T09:00:00',
    },
];

const ExperienceApp = () => {
    const formatLogTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toISOString().replace('T', ' ').split('.')[0];
    };

    const getLogLevel = (type: string) => {
        return type === 'work' ? 'INFO' : 'SYSTEM';
    };

    return (
        <div className="experience-app">
            {/* Log Header */}
            <div className="log-header">
                <span className="log-header__title">Experience.log - System Event Viewer</span>
            </div>

            {/* Log Toolbar */}
            <div className="log-toolbar">
                <button className="log-toolbar__btn log-toolbar__btn--active">All Events</button>
                <button className="log-toolbar__btn">Work</button>
                <button className="log-toolbar__btn">Education</button>
                <span className="log-toolbar__count">{experiences.length} events</span>
            </div>

            {/* Log Content */}
            <div className="log-content">
                {experiences.map((exp) => (
                    <div key={exp.id} className={`log-entry log-entry--${exp.type}`}>
                        <div className="log-entry__header">
                            <span className="log-entry__timestamp">[{formatLogTimestamp(exp.timestamp)}]</span>
                            <span className={`log-entry__level log-entry__level--${exp.type}`}>
                                [{getLogLevel(exp.type)}]
                            </span>
                            <span className="log-entry__title">{exp.title}</span>
                        </div>
                        <div className="log-entry__details">
                            <div className="log-entry__org">
                                <span className="log-entry__label">Organization:</span> {exp.organization}
                            </div>
                            <div className="log-entry__period">
                                <span className="log-entry__label">Period:</span> {exp.startDate} → {exp.endDate}
                            </div>
                            <div className="log-entry__desc">
                                {exp.description.map((desc, i) => (
                                    <div key={i} className="log-entry__desc-item">• {desc}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Log Status */}
            <div className="log-status">
                <span>Ready</span>
                <span>Events loaded: {experiences.length}</span>
            </div>
        </div>
    );
};

export default ExperienceApp;
