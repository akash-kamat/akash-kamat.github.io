import { motion } from 'motion/react';
import { useSiteContent } from '../hooks/useSiteContent';
import { defaultContent } from '../lib/contentDefaults';
import ShinyText from '../components/ui/ShinyText';

export default function About() {
    const { data: about } = useSiteContent('about', defaultContent.about);
    const container = {
        hidden: { opacity: 0, y: 12 },
        show: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
    };

    return (
        <motion.div className="page-section" variants={container} initial="hidden" animate="show">
            {/* Hello Section */}
            <motion.span variants={item} className="font-button" style={{ fontSize: '3.5rem', marginRight: '13px' }}>
                {about.hello}
            </motion.span>
            <motion.span variants={item} style={{ fontSize: '1.5rem' }}>{about.intro_name}</motion.span>

            <br />

            {/* About Me */}
            <motion.div variants={item} style={{ marginTop: '1rem', fontSize: '1.5rem' }}>
                <span>{about.role_prefix} </span>
                <ShinyText
                    text={about.role_highlight}
                    speed={3.2}
                    delay={0}
                    color="rgb(202, 44, 70)"
                    shineColor="#c45a6e"
                    spread={90}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                    className="fullstack-shine"
                />
                <span>{about.role_suffix}</span>
            </motion.div>

            {/* Passion */}
            <motion.p variants={item} style={{
                marginTop: '2rem',
                fontSize: '1.1rem',
                fontFamily: "'Open Sans', sans-serif",
                lineHeight: 1.6
            }}>
                {about.passion_lines.map((line, index) => (
                    <span key={line}>
                        {line}
                        {index !== about.passion_lines.length - 1 && <br />}
                    </span>
                ))}
            </motion.p>

            {/* Skills */}
            <motion.div variants={item} style={{ marginTop: '2rem' }}>
                <span style={{ fontSize: '1.5rem' }}>My Skills</span>
                <div className="skills-container" style={{ marginTop: '1.5rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                        {about.skills_frontend.map((skill) => (
                            <img key={skill.name} src={skill.badge} alt={skill.name} />
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {about.skills_backend.map((skill) => (
                            <img key={skill.name} src={skill.badge} alt={skill.name} />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Hobbies */}
            <motion.p variants={item} style={{ marginTop: '2rem', fontSize: '1.4rem' }}>
                {about.hobbies_lines.map((line, index) => (
                    <span key={line}>
                        {line}
                        {index !== about.hobbies_lines.length - 1 && <br />}
                    </span>
                ))}
            </motion.p>

            {/* Future */}
            <motion.p variants={item} style={{
                marginTop: '2rem',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--accent)'
            }}>
                {about.future_line}
            </motion.p>
        </motion.div>
    );
}
