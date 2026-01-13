# 🧪 SimLab – The Simulation Lab

> **Stop guessing. Touch the math.**

SimLab is an open-source interactive platform for financial and cryptographic simulations. Visualize complex concepts like Bitcoin's monetary policy through reactive, parameter-driven charts.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](#license)

---

## ✨ Features

### 🔢 Interactive Simulations
- **Bitcoin Inflation Visualizer** – Explore supply curves, halving events, and inflation rates with adjustable parameters
- **Ghost Lines** – Compare scenarios by overlaying previous simulation states
- **URL-Synced State** – Share exact configurations via URL (e.g., `?reward=25&interval=210000`)

### 📚 Cheatsheets
- Quick-reference cards for **Bitcoin Protocol**, **DeFi Concepts** and more.
- Hover-to-reveal interactions.

### 📝 Blog
- Deep-dive articles with **embedded mini-simulations**
- MDX-powered for rich content
- Internal linking to related tools

### 🎨 Modern Design
- Dark mode default with light mode toggle
- Glassmorphic UI components
- Smooth micro-interactions and animations

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 + shadcn/ui |
| **State** | nuqs (URL query sync) |
| **Charts** | Recharts 3 |
| **Math** | Decimal.js |
| **OG Images** | next/og |

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/simulation.git
cd simulation

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📁 Project Structure

```
simulation/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── sims/             # Simulation routes
│   │   ├── blog/             # MDX blog posts
│   │   └── cheatsheets/      # Quick reference pages
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── sims/             # Simulation-specific components
│   │   └── navigation/       # Nav components
│   ├── lib/
│   │   ├── math/             # Calculation logic
│   │   └── hooks/            # Custom React hooks
│   └── content/              # MDX + JSON content
└── docs/                     # User guides
```

---

## 📄 License

MIT License – see [LICENSE](./LICENSE) for details.

---

<p align="center">
  <strong>Built in public</strong> · Follow my journey on <a href="https://twitter.com/">Twitter/X</a>
</p>
