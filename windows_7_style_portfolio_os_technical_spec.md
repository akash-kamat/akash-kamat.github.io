# Windows 7–Style Portfolio OS (React)

## 1. Project Overview

A browser-based **Windows 7–inspired desktop operating system** that functions as a personal portfolio.

- The desktop is the homepage
- Desktop icons act as navigation
- Clicking an icon opens a movable, resizable window
- Each window displays portfolio content (projects, about, skills, etc.)
- No traditional scrolling website layout

The experience should feel like **using an OS inside the browser**, not browsing a website.

---

## 2. Core UX Principles

- Desktop-first interaction
- Window-based navigation
- Familiar Windows 7 metaphors (folders, apps, taskbar)
- Clean, professional execution (not parody)
- Content clarity > gimmicks

---

## 3. Tech Stack (Locked)

### Frontend Framework
- React (or Next.js with client-heavy rendering)

### UI / Styling
- **7.css** – Windows 7–style UI components
- Custom CSS overrides for layout control
- Windows-style fonts (Segoe UI, fallback stack)

### Window Management
- **WinBox.js** – Core window system
- **react-rnd** – Fine-grained resize/drag control where needed

### Animation
- **motion** (Framer Motion)
  - Window open / close
  - Minimize / restore
  - Taskbar transitions

### State Management
- **Zustand**
  - Open windows
  - Active window
  - Z-index stack
  - Theme / sound preferences

### Terminal / Console
- **react-console-emulator**
  - Used for Terminal app
  - Commands mapped to portfolio navigation

### Sound
- **howler.js**
  - Click sounds
  - Window open / close
  - Boot sound (first visit only)

### Icons
- Windows 7–style icons (Icons8 / extracted Win7-style assets)
- Iconify as fallback aggregator

---

## 4. Missing but Required Additions (Explicit)

### Persistence
- `localStorage`
  - Last opened windows
  - Window positions
  - Sound on/off
  - Theme state

### Accessibility
- Keyboard focus for windows
- Reduced-motion support
- Sound toggle

### Performance
- Lazy-load app window content
- Memoized window renders

---

## 5. Application Architecture

```
src/
├── core/
│   ├── Desktop.tsx
│   ├── WindowManager.tsx
│   ├── Taskbar.tsx
│   ├── StartMenu.tsx (optional)
│   └── BootScreen.tsx
│
├── apps/
│   ├── Work/
│   │   └── WorkApp.tsx
│   ├── About/
│   │   └── AboutApp.tsx
│   ├── Skills/
│   │   └── SkillsApp.tsx
│   ├── Experience/
│   │   └── ExperienceApp.tsx
│   ├── Contact/
│   │   └── ContactApp.tsx
│   └── Terminal/
│       └── TerminalApp.tsx
│
├── state/
│   └── windowStore.ts
│
├── assets/
│   ├── icons/
│   ├── sounds/
│   └── wallpapers/
│
└── utils/
    ├── soundManager.ts
    └── windowRegistry.ts
```

---

## 6. Desktop System

### Desktop.tsx
- Renders wallpaper
- Renders desktop icons
- Handles icon double-click → open app window

### Desktop Icons
Each icon maps to an app definition:

```
{
  id: "work",
  title: "Work",
  icon: "work.png",
  component: WorkApp
}
```

---

## 7. Window System

### WinBox Usage

- Each app opens inside a WinBox window
- WinBox handles:
  - Drag
  - Resize
  - Focus
  - Minimize / maximize

### Window Rules
- Multiple windows allowed
- Only one active window at a time
- Z-index controlled centrally via Zustand

### Window Lifecycle
- open → focus → minimize → restore → close

---

## 8. Taskbar

- Shows currently open apps
- Clicking taskbar item:
  - Restores minimized window
  - Focuses active window

- Right-click (optional): close window

---

## 9. Apps Specification

### 9.1 Work.exe

- File-explorer–style layout
- Each project appears as a folder or file
- Clicking project opens detail modal or child window

Content:
- Description
- Tech stack
- GitHub / Live links

---

### 9.2 AboutMe.txt

- Notepad-style UI (7.css)
- Short personal description
- System-info metaphor

---

### 9.3 Skills.dll

- Categorized skill lists
- Progress bars styled as system meters

---

### 9.4 Experience.log

- Timeline styled like system logs
- Timestamp-based entries

---

### 9.5 Contact.mail

- Email-client–style UI
- Buttons for external links

---

### 9.6 Terminal.exe

- Powered by react-console-emulator
- Supported commands:

```
help
about
work
skills
clear
```

Each command opens or focuses the corresponding window.

---

## 10. Sound System

### soundManager.ts

- Centralized sound control
- Uses howler.js

Sounds:
- click
- open
- close
- minimize
- boot

Sound respects global mute setting.

---

## 11. Boot Experience (Optional but Recommended)

- Fake Windows 7 boot screen
- Shown only on first visit
- Skippable

---

## 12. Mobile Strategy

- Desktop experience disabled on small screens
- Fallback message or simplified layout

---

## 13. Build Order (Critical)

1. Desktop + wallpaper
2. WindowManager + WinBox integration
3. Zustand window store
4. Taskbar
5. One app (About)
6. Work app
7. Animations
8. Sounds
9. Polish

---

## 14. Non-Goals (Do NOT Implement)

- Full Windows clone
- File system emulation
- Login system
- Overloaded animations

---

## 15. Success Criteria

- Recruiter understands navigation instantly
- Windows feel responsive and smooth
- Content is readable and accessible
- Project demonstrates UI architecture + system thinking

---

## 16. Instruction to Coding AI Agent

Build this project strictly following:
- The locked tech stack
- Window-based navigation
- Desktop-first UX
- Modular app architecture

Prioritize correctness, interaction quality, and maintainability over visual gimmicks.

