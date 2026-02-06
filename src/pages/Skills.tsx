import { FaCode } from 'react-icons/fa';
import { motion } from 'motion/react';
import { useSiteContent } from '../hooks/useSiteContent';
import { defaultContent } from '../lib/contentDefaults';
import { getIcon, skillIconMap } from '../lib/iconMaps';

export default function Skills() {
  const { data: skills } = useSiteContent('skills', defaultContent.skills);
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
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
  };

  return (
    <motion.div className="page-section skills-page" variants={container} initial="hidden" animate="show">
      <motion.div className="skills-hero" variants={item}>
        <div className="skills-hero-title">{skills.title}</div>
        <p className="skills-hero-subtitle">
          {skills.subtitle}
        </p>
      </motion.div>

      <motion.div className="skills-section-grid" variants={container} initial={false} animate="show">
        {skills.sections.map((section) => {
          const SectionIcon = getIcon(skillIconMap, section.icon, FaCode);
          return (
            <motion.div key={section.title} className="skills-section-card" variants={item}>
              <div className="skills-section-header">
                <div className="skills-section-title">
                  <SectionIcon className="skills-section-icon" />
                  {section.title}
                </div>
                <div className="skills-section-tagline">{section.tagline}</div>
              </div>
              <div className="skills-chip-grid">
                {section.skills.map((skill) => {
                  const SkillIcon = getIcon(skillIconMap, skill.icon, FaCode);
                  return (
                    <motion.span key={skill.label} className="skills-chip" variants={item}>
                      <SkillIcon className="skills-chip-icon" />
                      {skill.label}
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
