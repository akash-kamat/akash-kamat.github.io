export type AboutContent = {
  hello: string;
  intro_name: string;
  role_prefix: string;
  role_highlight: string;
  role_suffix: string;
  passion_lines: string[];
  skills_frontend: { name: string; badge: string }[];
  skills_backend: { name: string; badge: string }[];
  hobbies_lines: string[];
  future_line: string;
};

export type SkillsContent = {
  title: string;
  subtitle: string;
  sections: {
    title: string;
    tagline: string;
    icon: string;
    skills: { label: string; icon: string }[];
  }[];
};

export type ServicesContent = {
  title: string;
  subtitle: string;
  services: { title: string; description: string }[];
  cta_text: string;
  form_title: string;
  form_subtitle: string;
  formspree_url: string;
};

export type ContactContent = {
  title: string;
  subtitle: string;
  status_text: string;
  ideal_for: string[];
  availability: string[];
  cards: { label: string; value: string; href: string; icon: string }[];
  form_title: string;
  form_subtitle: string;
  formspree_url: string;
};

export type SocialsContent = {
  items: { name: string; url: string; icon: string }[];
};

export type SiteContent = {
  about: AboutContent;
  skills: SkillsContent;
  services: ServicesContent;
  contact: ContactContent;
  socials: SocialsContent;
};
