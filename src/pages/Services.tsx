import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useSiteContent } from '../hooks/useSiteContent';
import { defaultContent } from '../lib/contentDefaults';

export default function Services() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isSent = params.get('sent') === '1';
  const { data: servicesContent } = useSiteContent('services', defaultContent.services);

  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  return (
    <motion.div className="page-section services-page" variants={container} initial="hidden" animate="show">
      <motion.div className="services-hero" variants={item}>
        <h1 className="services-title">{servicesContent.title}</h1>
        <p className="services-subtitle">
          {servicesContent.subtitle}
        </p>
      </motion.div>

      <motion.div className="services-grid" variants={container} initial={false} animate="show">
        {servicesContent.services.map((service, index) => (
          <motion.div key={service.title} className="services-item" variants={item}>
            <div className="services-index">{String(index + 1).padStart(2, '0')}</div>
            <div className="services-item-body">
              <div className="services-item-title">{service.title}</div>
              <p className="services-item-text">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="services-cta" variants={item}>
        <div className="services-cta-text">{servicesContent.cta_text}</div>
        <div className="services-cta-actions">
          <a className="services-btn" href="#project-form">
            Start a Project
          </a>
          <a className="services-btn secondary" href="/works">
            See Work
          </a>
        </div>
      </motion.div>

      <motion.div className="services-form" id="project-form" variants={item}>
        <div className="services-form-title">{servicesContent.form_title}</div>
        <p className="services-form-subtitle">
          {servicesContent.form_subtitle}
        </p>
        {isSent && (
          <div className="form-success">
            Thanks! Your message is in. I will reply within 24-48 hours.
          </div>
        )}
        <form
          className="services-form-grid"
          action={servicesContent.formspree_url}
          method="POST"
        >
          <input type="hidden" name="_redirect" value="/services?sent=1" />
          <label className="form-field">
            <span>Your Name</span>
            <input type="text" name="name" placeholder="Akash Kamat" required />
          </label>
          <label className="form-field">
            <span>Email</span>
            <input type="email" name="email" placeholder="you@email.com" required />
          </label>
          <label className="form-field">
            <span>Project Type</span>
            <select name="project_type" defaultValue="Web App" required>
              <option>Web App</option>
              <option>Landing Page</option>
              <option>UI/UX Redesign</option>
              <option>API / Backend</option>
              <option>Something Else</option>
            </select>
          </label>
          <label className="form-field form-field-full">
            <span>Project Details</span>
            <textarea
              name="message"
              rows={5}
              placeholder="What do you want to build? Timeline, goals, features..."
              required
            />
          </label>
          <button className="services-btn form-submit" type="submit">
            Send Inquiry
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
