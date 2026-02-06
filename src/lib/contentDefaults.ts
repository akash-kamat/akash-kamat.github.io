import type { SiteContent } from './contentTypes';

export const defaultContent: SiteContent = {
  about: {
    hello: 'Hello,',
    intro_name: "I'm Akash",
    role_prefix: 'a',
    role_highlight: 'Full-Stack',
    role_suffix: 'Web Developer located in New Delhi.',
    passion_lines: [
      'Have a great passion for web designing, animations, servers and APIs.',
      'A well organized and productive person great at problem solving,',
      "currently pursing Bachelor's Degree at Delhi University.",
    ],
    skills_frontend: [
      {
        name: 'HTML5',
        badge:
          'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white',
      },
      {
        name: 'CSS3',
        badge:
          'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white',
      },
      {
        name: 'JavaScript',
        badge:
          'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black',
      },
      {
        name: 'React',
        badge:
          'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB',
      },
    ],
    skills_backend: [
      {
        name: 'Node.js',
        badge:
          'https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white',
      },
      {
        name: 'Express',
        badge: 'https://img.shields.io/badge/Express.js-404D59?style=for-the-badge',
      },
      {
        name: 'MongoDB',
        badge:
          'https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white',
      },
    ],
    hobbies_lines: [
      "I've always been fascinated by Computers and Internet, and for",
      'me nothing is more fun than to convert my ideas into webpages.',
      'My hobbies are video games, music, anime and reading.',
    ],
    future_line: 'I am interested in starting my own company in the future :)',
  },
  skills: {
    title: 'My Skills',
    subtitle: 'The toolkit I use to build smooth experiences and reliable systems.',
    sections: [
      {
        title: 'Frontend',
        tagline: 'Interfaces that feel clean and fast.',
        icon: 'SiReact',
        skills: [
          { label: 'HTML', icon: 'SiHtml5' },
          { label: 'CSS', icon: 'SiCss3' },
          { label: 'JavaScript', icon: 'SiJavascript' },
          { label: 'React', icon: 'SiReact' },
          { label: 'Next.js', icon: 'SiNextdotjs' },
          { label: 'React Native', icon: 'FaMobileAlt' },
          { label: 'Tauri', icon: 'FaDesktop' },
          { label: 'Electron', icon: 'FaBolt' },
        ],
      },
      {
        title: 'Backend',
        tagline: 'APIs, servers, and clean architecture.',
        icon: 'FaServer',
        skills: [
          { label: 'Node.js', icon: 'SiNodedotjs' },
          { label: 'Express', icon: 'SiExpress' },
          { label: 'FastAPI', icon: 'FaServer' },
          { label: 'Rust', icon: 'SiRust' },
          { label: 'REST API', icon: 'FaServer' },
        ],
      },
      {
        title: 'Database',
        tagline: 'Data that moves fast and stays safe.',
        icon: 'SiSupabase',
        skills: [
          { label: 'Supabase', icon: 'SiSupabase' },
          { label: 'MongoDB', icon: 'SiMongodb' },
          { label: 'Neo4j', icon: 'FaDatabase' },
          { label: 'Pinecone', icon: 'FaDatabase' },
        ],
      },
      {
        title: 'Tools',
        tagline: 'My daily drivers and trusted sidekicks.',
        icon: 'FaTools',
        skills: [
          { label: 'Git', icon: 'SiGit' },
          { label: 'GitHub', icon: 'SiGithub' },
          { label: 'Docker', icon: 'SiDocker' },
          { label: 'Postman', icon: 'SiPostman' },
          { label: 'VS Code', icon: 'FaCode' },
          { label: 'Figma', icon: 'SiFigma' },
          { label: 'Linux', icon: 'SiLinux' },
          { label: 'Vite', icon: 'SiVite' },
        ],
      },
    ],
  },
  services: {
    title: 'Work With Me',
    subtitle:
      'If you want to build something or just have an idea and wanna see what that idea can do, then I can help you.',
    services: [
      { title: 'Web Apps', description: 'Full-stack builds that are fast, reliable, and easy to maintain.' },
      { title: 'Frontend UI', description: 'Pixel-clean interfaces with smooth interactions and strong UX.' },
      { title: 'APIs & Integrations', description: 'REST APIs, third-party integrations, and data pipelines.' },
      { title: 'Product Polish', description: 'Performance, accessibility, and design refinements before launch.' },
    ],
    cta_text: 'Have a project in mind?',
    form_title: 'Project Inquiry',
    form_subtitle: 'Tell me a bit about your idea and I will reply with a plan, timeline, and next steps.',
    formspree_url: 'https://formspree.io/f/mnqlakbr',
  },
  contact: {
    title: 'Contact',
    subtitle: "Got an idea, a gig, or just want to say hi? I'm open to freelance work and collaborations.",
    status_text: 'Available for opportunities',
    ideal_for: [
      'Startups needing backend support',
      'Students building serious projects',
      'Hackathons & prototypes',
      'Internship or junior developer roles',
    ],
    availability: ['Open to internships, jobs, contracts, and projects', 'Remote or offline, both work'],
    cards: [
      {
        label: 'Email',
        value: 'akash.kamat.10@gmail.com',
        href: 'mailto:akash.kamat.10@gmail.com',
        icon: 'FiMail',
      },
      {
        label: 'GitHub',
        value: 'github.com/akash-kamat',
        href: 'https://github.com/akash-kamat',
        icon: 'FiGithub',
      },
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/akash-kamat',
        href: 'https://linkedin.com/in/akash-kamat',
        icon: 'FiLinkedin',
      },
      {
        label: 'Instagram',
        value: '@akashdotpng',
        href: 'https://instagram.com/akashdotpng',
        icon: 'FiInstagram',
      },
    ],
    form_title: 'Quick Message',
    form_subtitle: "Keep it short - I'll follow up with the next steps.",
    formspree_url: 'https://formspree.io/f/mnqlakbr',
  },
  socials: {
    items: [
      { name: 'GitHub', url: 'https://github.com/akash-kamat', icon: 'FiGithub' },
      { name: 'LinkedIn', url: 'https://linkedin.com/in/akash-kamat', icon: 'FiLinkedin' },
      { name: 'Gmail', url: 'mailto:akash.kamat.10@gmail.com', icon: 'FiMail' },
      { name: 'Instagram', url: 'https://instagram.com/akashdotpng', icon: 'FiInstagram' },
    ],
  },
};
