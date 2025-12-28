import './SkillsApp.css';

interface Skill {
    name: string;
    level: number; // 0-100
    category: string;
}

const skills: Skill[] = [
    // Frontend
    { name: 'React / Next.js', level: 90, category: 'Frontend' },
    { name: 'TypeScript', level: 85, category: 'Frontend' },
    { name: 'HTML5 / CSS3', level: 95, category: 'Frontend' },
    { name: 'Tailwind CSS', level: 88, category: 'Frontend' },
    { name: 'Framer Motion', level: 75, category: 'Frontend' },

    // Backend
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Python', level: 80, category: 'Backend' },
    { name: 'PostgreSQL', level: 78, category: 'Backend' },
    { name: 'MongoDB', level: 82, category: 'Backend' },
    { name: 'REST APIs', level: 90, category: 'Backend' },

    // Tools & DevOps
    { name: 'Git / GitHub', level: 92, category: 'Tools' },
    { name: 'Docker', level: 70, category: 'Tools' },
    { name: 'AWS / Cloud', level: 65, category: 'Tools' },
    { name: 'CI/CD', level: 72, category: 'Tools' },
];

const categories = ['Frontend', 'Backend', 'Tools'];

const SkillsApp = () => {
    const getBarColor = (level: number) => {
        if (level >= 85) return '#22c55e'; // Green
        if (level >= 70) return '#3b82f6'; // Blue
        if (level >= 50) return '#f59e0b'; // Yellow
        return '#ef4444'; // Red
    };

    return (
        <div className="skills-app">
            {/* Header */}
            <div className="skills-header">
                <h2>⚙️ System Capabilities</h2>
                <p>Performance metrics and module status</p>
            </div>

            {/* Skills by Category */}
            <div className="skills-content">
                {categories.map((category) => (
                    <div key={category} className="skills-category">
                        <h3 className="skills-category__title">{category}</h3>
                        <div className="skills-category__list">
                            {skills
                                .filter((s) => s.category === category)
                                .map((skill) => (
                                    <div key={skill.name} className="skill-item">
                                        <div className="skill-item__header">
                                            <span className="skill-item__name">{skill.name}</span>
                                            <span className="skill-item__level">{skill.level}%</span>
                                        </div>
                                        <div className="skill-item__bar">
                                            <div
                                                className="skill-item__fill"
                                                style={{
                                                    width: `${skill.level}%`,
                                                    backgroundColor: getBarColor(skill.level),
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* System Status */}
            <div className="skills-status">
                <span className="skills-status__indicator" />
                All systems operational
            </div>
        </div>
    );
};

export default SkillsApp;
