import React from 'react';

// Lazy load app components
const AboutApp = React.lazy(() => import('../apps/About/AboutApp'));
const WorkApp = React.lazy(() => import('../apps/Work/WorkApp'));
const SkillsApp = React.lazy(() => import('../apps/Skills/SkillsApp'));
const ExperienceApp = React.lazy(() => import('../apps/Experience/ExperienceApp'));
const ContactApp = React.lazy(() => import('../apps/Contact/ContactApp'));
const TerminalApp = React.lazy(() => import('../apps/Terminal/TerminalApp'));
const CalculatorApp = React.lazy(() => import('../apps/Calculator/CalculatorApp'));
const BrowserApp = React.lazy(() => import('../apps/Browser/BrowserApp'));
const PaintApp = React.lazy(() => import('../apps/Paint/PaintApp'));
const SolitaireApp = React.lazy(() => import('../apps/Solitaire/SolitaireApp'));
const StickyNotesApp = React.lazy(() => import('../apps/StickyNotes/StickyNotesApp'));
const MediaPlayerApp = React.lazy(() => import('../apps/MediaPlayer/MediaPlayerApp'));
const HelpApp = React.lazy(() => import('../apps/Help/HelpApp'));

export interface AppDefinition {
    id: string;
    title: string;
    icon: string;
    component: React.LazyExoticComponent<React.ComponentType>;
    defaultSize: { width: number; height: number };
    desktopPosition?: { x: number; y: number };
    showOnDesktop?: boolean;
}

// Desktop apps (shown on desktop)
export const appRegistry: AppDefinition[] = [
    {
        id: 'about',
        title: 'AboutMe.txt',
        icon: '📝',
        component: AboutApp,
        defaultSize: { width: 600, height: 450 },
        desktopPosition: { x: 40, y: 40 },
        showOnDesktop: true,
    },
    {
        id: 'work',
        title: 'Work',
        icon: '📁',
        component: WorkApp,
        defaultSize: { width: 800, height: 550 },
        desktopPosition: { x: 40, y: 140 },
        showOnDesktop: true,
    },
    {
        id: 'skills',
        title: 'Skills.dll',
        icon: '⚙️',
        component: SkillsApp,
        defaultSize: { width: 500, height: 500 },
        desktopPosition: { x: 40, y: 240 },
        showOnDesktop: true,
    },
    {
        id: 'experience',
        title: 'Experience.log',
        icon: '📋',
        component: ExperienceApp,
        defaultSize: { width: 650, height: 500 },
        desktopPosition: { x: 40, y: 340 },
        showOnDesktop: true,
    },
    {
        id: 'contact',
        title: 'Contact.mail',
        icon: '✉️',
        component: ContactApp,
        defaultSize: { width: 550, height: 450 },
        desktopPosition: { x: 140, y: 40 },
        showOnDesktop: true,
    },
    {
        id: 'terminal',
        title: 'Terminal',
        icon: '💻',
        component: TerminalApp,
        defaultSize: { width: 700, height: 450 },
        desktopPosition: { x: 140, y: 140 },
        showOnDesktop: true,
    },
];

// All apps (including Start Menu apps)
export const allApps: AppDefinition[] = [
    ...appRegistry,
    {
        id: 'calculator',
        title: 'Calculator',
        icon: '🔢',
        component: CalculatorApp,
        defaultSize: { width: 320, height: 480 },
        showOnDesktop: false,
    },
    {
        id: 'browser',
        title: 'Internet Explorer',
        icon: '🌐',
        component: BrowserApp,
        defaultSize: { width: 900, height: 600 },
        showOnDesktop: false,
    },
    {
        id: 'paint',
        title: 'Paint',
        icon: '🎨',
        component: PaintApp,
        defaultSize: { width: 700, height: 500 },
        showOnDesktop: false,
    },
    {
        id: 'solitaire',
        title: 'Solitaire',
        icon: '🃏',
        component: SolitaireApp,
        defaultSize: { width: 600, height: 500 },
        showOnDesktop: false,
    },
    {
        id: 'sticky-notes',
        title: 'Sticky Notes',
        icon: '📝',
        component: StickyNotesApp,
        defaultSize: { width: 650, height: 500 },
        showOnDesktop: false,
    },
    {
        id: 'media-player',
        title: 'Windows Media Player',
        icon: '🎵',
        component: MediaPlayerApp,
        defaultSize: { width: 450, height: 600 },
        showOnDesktop: false,
    },
    {
        id: 'help',
        title: 'Help and Support',
        icon: '❓',
        component: HelpApp,
        defaultSize: { width: 750, height: 500 },
        showOnDesktop: false,
    },
];

export const getAppById = (id: string): AppDefinition | undefined => {
    return allApps.find(app => app.id === id);
};
