---
title: "SpellCMS - My Custom Blogging Platform"
description: "A custom-built content management system powered by React, TypeScript and Tailwind"
date: "2025-05-18"
tags: ["react", "typescript", "content-management", "frontend"]
---

# SpellCMS - My Custom Blogging Platform

I developed this responsive blog management dashboard as part of my task as assigned by Spell Innovatio. Built with **React.js**, **TypeScript**, and **Tailwind CSS**, this task streamlined content management tools that focus on user experience.

## Project credentials

username: Milan,
password: milan

## Project structure

![alt text](/assets/cms-1.png)
![alt text](/assets/cms-2.png)

## 🌐 Setup in local environment

- Clone this repo
  ```
  git clone git@github.com:milan0827/SpellCMS.git
  use pnpm as package manager and install dependencies using pnpm i
  To run the server use npm run server / pnpm run server
  To run the client side use npm run dev / pnpm run dev
  ```

### Package Manager

- pnpm is used as package manager for managing and installing packages.

## ✨ Key Features

### Authentication System

- Custom login system with secure session management
- Session persistence between browser sessions
- Security-first routing with unauthorized access prevention

### Blog Management

- Integration with a Mocked API (json-server) for content handling
- Interactive post listing with advanced filtering capabilities
- Complete post lifecycle management (create, read, update, delete)

### Rich Post Creation

- Clean title input interface
- Author selection dropdown
- Topic classification system
- Featured image support with visual preview
- One-click publishing workflow

## Quality Assurance

Testing is not implemented right now,

My testing approach will utilize **Jest** and **React Testing Library**:

- Schema-based form validation testing
- Component integrity testing

## SEO Consideration

- I have used meta tags and meta description for SEO friendly
- Use of aria attributes in form field
- Use of semantic tags for SEO friendly

## Technology Foundation

As from the task and I selected these technologies to support my vision:

| Technology                | My reasoning                                                      |
| ------------------------- | ----------------------------------------------------------------- |
| React with TypeScript     | Provides structure and type safety for complex interfaces         |
| Tailwind CSS              | Enables rapid design implementation without redundant styles      |
| React Hook Form           | Simplifies form state handling with minimal re-renders            |
| Zod                       | Offers type-safe validation with excellent TypeScript integration |
| Zustand                   | Provides intuitive, lightweight state management                  |
| React Router              | Delivers flexible, component-based navigation                     |
| React Query               | Simplifies data fetching with intelligent caching                 |
| Custom API                | Created personalized endpoints for realistic data interactions    |
| Vite                      | Provides near-instant development feedback and optimal builds     |
| Jest with Testing Library | Enables behavior-driven test approach                             |
| Shadcn UI library         | for building faster UI                                            |

## Code Architecture

```
src/
│
├── assets/             # Media resources and static files
├── components/         # Shared interface elements
├── hooks/              # Feature-specific React hooks
├── layout/             # Structural UI components
├── lib/                # Validation schemas and utilities
├── pages/              # View components for each route
├── routes/             # Navigation and access control
├── services/           # API communication layer
├── store/              # State management modules
├── utils/              # Helper functions
└── App.tsx             # Application entry point
# Configuration
├── vite.config.ts      # Build configuration
├── tsconfig.json       # TypeScript settings
├── tailwind.config.ts  # Design system configuration
├── postcss.config.js   # CSS processing setup
└── .eslintrc.cjs       # Code quality standards
└── tsconfig.node.json
└── tsconfig.app.json
└── components.json     #Shadcn config file for components

```
