import React from 'react';

// Lazy load app components
const AboutApp = React.lazy(() => import('../apps/About/AboutApp'));
const WorkApp = React.lazy(() => import('../apps/Work/WorkApp'));
const SkillsApp = React.lazy(() => import('../apps/Skills/SkillsApp'));
const ExperienceApp = React.lazy(() => import('../apps/Experience/ExperienceApp'));
const ContactApp = React.lazy(() => import('../apps/Contact/ContactApp'));
const TerminalApp = React.lazy(() => import('../apps/Terminal/TerminalApp'));

export interface AppDefinition {
    id: string;
    title: string;
    icon: string;
    component: React.LazyExoticComponent<React.ComponentType>;
    defaultSize: { width: number; height: number };
    desktopPosition?: { x: number; y: number };
}

export const appRegistry: AppDefinition[] = [
    {
        id: 'about',
        title: 'AboutMe.txt',
        icon: '📝',
        component: AboutApp,
        defaultSize: { width: 600, height: 450 },
        desktopPosition: { x: 40, y: 40 },
    },
    {
        id: 'work',
        title: 'Work',
        icon: '📁',
        component: WorkApp,
        defaultSize: { width: 800, height: 550 },
        desktopPosition: { x: 40, y: 140 },
    },
    {
        id: 'skills',
        title: 'Skills.dll',
        icon: '⚙️',
        component: SkillsApp,
        defaultSize: { width: 500, height: 500 },
        desktopPosition: { x: 40, y: 240 },
    },
    {
        id: 'experience',
        title: 'Experience.log',
        icon: '📋',
        component: ExperienceApp,
        defaultSize: { width: 650, height: 500 },
        desktopPosition: { x: 40, y: 340 },
    },
    {
        id: 'contact',
        title: 'Contact.mail',
        icon: '✉️',
        component: ContactApp,
        defaultSize: { width: 550, height: 450 },
        desktopPosition: { x: 140, y: 40 },
    },
    {
        id: 'terminal',
        title: 'Terminal',
        icon: '💻',
        component: TerminalApp,
        defaultSize: { width: 700, height: 450 },
        desktopPosition: { x: 140, y: 140 },
    },
];

export const getAppById = (id: string): AppDefinition | undefined => {
    return appRegistry.find(app => app.id === id);
};
