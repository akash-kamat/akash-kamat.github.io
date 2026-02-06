import {
  SiCss3,
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiReact,
  SiRust,
  SiSupabase,
  SiVite,
} from 'react-icons/si';
import {
  FaBolt,
  FaCode,
  FaDatabase,
  FaDesktop,
  FaMobileAlt,
  FaServer,
  FaTools,
} from 'react-icons/fa';
import { FiGithub, FiInstagram, FiLinkedin, FiMail } from 'react-icons/fi';

export const skillIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiRust,
  SiSupabase,
  SiMongodb,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiFigma,
  SiLinux,
  SiVite,
  FaMobileAlt,
  FaDesktop,
  FaBolt,
  FaServer,
  FaDatabase,
  FaTools,
  FaCode,
};

export const contactIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiInstagram,
};

export const getIcon = (
  map: Record<string, React.ComponentType<{ className?: string }>>,
  key: string | undefined,
  fallback: React.ComponentType<{ className?: string }>,
) => {
  if (!key) return fallback;
  return map[key] ?? fallback;
};
