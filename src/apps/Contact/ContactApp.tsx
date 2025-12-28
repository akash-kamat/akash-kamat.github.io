import './ContactApp.css';

const ContactApp = () => {
    const socialLinks = [
        { name: 'GitHub', icon: '🐙', url: 'https://github.com/yourusername' },
        { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/in/yourusername' },
        { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/yourusername' },
        { name: 'Portfolio', icon: '🌐', url: 'https://yourwebsite.com' },
    ];

    return (
        <div className="contact-app">
            {/* Email Client Header */}
            <div className="mail-header">
                <div className="mail-header__tabs">
                    <button className="mail-header__tab mail-header__tab--active">Compose</button>
                    <button className="mail-header__tab">Inbox</button>
                </div>
            </div>

            {/* Email Compose View */}
            <div className="mail-compose">
                <div className="mail-field">
                    <span className="mail-field__label">To:</span>
                    <span className="mail-field__value">contact@akashkamat.com</span>
                </div>
                <div className="mail-field">
                    <span className="mail-field__label">Subject:</span>
                    <input
                        type="text"
                        className="mail-field__input"
                        placeholder="Let's work together!"
                    />
                </div>
                <div className="mail-body">
                    <textarea
                        className="mail-body__textarea"
                        placeholder="Hi Akash,

I came across your portfolio and I'd love to discuss a potential opportunity...

"
                    />
                </div>
            </div>

            {/* Quick Contact */}
            <div className="quick-contact">
                <h3>Quick Connect</h3>
                <div className="quick-contact__links">
                    {socialLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="quick-contact__link"
                        >
                            <span className="quick-contact__icon">{link.icon}</span>
                            <span className="quick-contact__name">{link.name}</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mail-actions">
                <a
                    href="mailto:contact@akashkamat.com"
                    className="mail-actions__btn mail-actions__btn--primary"
                >
                    📤 Send Email
                </a>
                <button className="mail-actions__btn">
                    💾 Save Draft
                </button>
            </div>
        </div>
    );
};

export default ContactApp;
