import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { useSiteContent } from '../hooks/useSiteContent';
import { defaultContent } from '../lib/contentDefaults';
import { contactIconMap, getIcon } from '../lib/iconMaps';

export default function Contact() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isSent = params.get('sent') === '1';
  const { data: contact } = useSiteContent('contact', defaultContent.contact);

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
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  return (
    <motion.div className="page-section contact-page" variants={container} initial="hidden" animate="show">
      <motion.div className="contact-hero" variants={item}>
        <h1 className="contact-title">{contact.title}</h1>
        <p className="contact-subtitle">
          {contact.subtitle}
        </p>
      </motion.div>

      <motion.div className="contact-status" variants={item}>
        <div className="status-pill">
          <span className="status-dot" />
          {contact.status_text}
        </div>
      </motion.div>

      <motion.div className="contact-sections" variants={container} initial={false} animate="show">
        <motion.div className="contact-section" variants={item}>
          <div className="contact-section-title">Ideal For</div>
          <ul className="contact-section-list">
            {contact.ideal_for.map((itemText) => (
              <li key={itemText}>{itemText}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div className="contact-section" variants={item}>
          <div className="contact-section-title">Availability</div>
          <ul className="contact-section-list">
            {contact.availability.map((itemText) => (
              <li key={itemText}>{itemText}</li>
            ))}
          </ul>
        </motion.div>
      </motion.div>

      <motion.div className="contact-grid" variants={container} initial={false} animate="show">
        {contact.cards.map((card) => {
          const Icon = getIcon(contactIconMap, card.icon, FiMail);
          return (
          <motion.a
            key={card.label}
            href={card.href}
            className="contact-card"
            target={card.href.startsWith('mailto') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            variants={item}
          >
            <div className="contact-card-icon">
              <Icon />
            </div>
            <div className="contact-card-text">
              <div className="contact-card-label">{card.label}</div>
              <div className="contact-card-value">{card.value}</div>
            </div>
          </motion.a>
          );
        })}
      </motion.div>

      <motion.div className="contact-form" variants={item}>
        <div className="contact-form-title">{contact.form_title}</div>
        <p className="contact-form-subtitle">{contact.form_subtitle}</p>
        {isSent && (
          <div className="form-success">
            Thanks! Your message is in. I'll reply within 24-48 hours.
          </div>
        )}
        <form
          className="contact-form-grid"
          action={contact.formspree_url}
          method="POST"
        >
          <input type="hidden" name="_redirect" value="/contact?sent=1" />
          <label className="form-field">
            <span>Your Name</span>
            <input type="text" name="name" placeholder="Your name" required />
          </label>
          <label className="form-field">
            <span>Email</span>
            <input type="email" name="email" placeholder="you@email.com" required />
          </label>
          <label className="form-field form-field-full">
            <span>Message</span>
            <textarea name="message" rows={4} placeholder="Tell me about it..." required />
          </label>
          <button className="services-btn form-submit" type="submit">
            Send
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
