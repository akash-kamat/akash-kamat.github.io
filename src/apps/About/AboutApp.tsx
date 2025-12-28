import './AboutApp.css';

const AboutApp = () => {
    return (
        <div className="about-app">
            {/* Notepad-style Menu Bar */}
            <div className="notepad-menu">
                <span className="notepad-menu__item">File</span>
                <span className="notepad-menu__item">Edit</span>
                <span className="notepad-menu__item">Format</span>
                <span className="notepad-menu__item">View</span>
                <span className="notepad-menu__item">Help</span>
            </div>

            {/* Content Area */}
            <div className="notepad-content">
                <pre className="notepad-text">{`
╔══════════════════════════════════════════════════════════╗
║                    SYSTEM INFORMATION                      ║
╠══════════════════════════════════════════════════════════╣
║                                                            ║
║  User Name............: Akash Kamat                        ║
║  Role.................: Full Stack Developer               ║
║  Location.............: Your City, Country                 ║
║  Status...............: Available for opportunities        ║
║                                                            ║
╠══════════════════════════════════════════════════════════╣
║                        ABOUT ME                            ║
╠══════════════════════════════════════════════════════════╣
║                                                            ║
║  Hello! I'm a passionate full-stack developer with a       ║
║  love for creating elegant solutions to complex problems.  ║
║                                                            ║
║  I specialize in building modern web applications using    ║
║  React, TypeScript, Node.js, and various other cutting     ║
║  edge technologies.                                        ║
║                                                            ║
║  When I'm not coding, you can find me exploring new        ║
║  technologies, contributing to open-source projects,       ║
║  or enjoying a good cup of coffee.                         ║
║                                                            ║
╠══════════════════════════════════════════════════════════╣
║                    QUICK FACTS                             ║
╠══════════════════════════════════════════════════════════╣
║                                                            ║
║  ► Experience: X+ years in software development            ║
║  ► Education: Computer Science Degree                      ║
║  ► Interests: Web Dev, AI/ML, Open Source                  ║
║  ► Languages: JavaScript, TypeScript, Python               ║
║                                                            ║
╚══════════════════════════════════════════════════════════╝

// Last updated: ${new Date().toLocaleDateString()}
// Version: 1.0.0
        `}</pre>
            </div>
        </div>
    );
};

export default AboutApp;
