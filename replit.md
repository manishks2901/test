# Wadhwa & Co. Law Firm Website

## Overview

This is a professional law firm website for Wadhwa & Co., a prestigious legal practice established in 1985. The application provides a comprehensive online presence featuring service descriptions, team profiles, legal insights blog, and contact capabilities. Built as a modern full-stack web application, it combines a React-based frontend with an Express backend, utilizing PostgreSQL for data persistence and Replit's authentication system for admin access.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type safety and developer experience
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and caching

**UI Component System**
- Shadcn UI component library (New York variant) for consistent, accessible components
- Radix UI primitives as the foundation for interactive elements
- Tailwind CSS for utility-first styling with custom design tokens
- Custom color palette aligned with law firm branding (deep navy primary, gold accents)

**Design System**
- Typography: Playfair Display (serif) for headings, Source Sans Pro (sans-serif) for body text
- Spacing based on Tailwind's standardized scale (4, 6, 8, 12, 16, 20, 24, 32)
- Light/dark theme support via context-based theme provider
- Responsive layouts optimized for mobile, tablet, and desktop viewports

**Page Structure**
- Public pages: Landing (hero, services, team, testimonials), Services detail, Team profiles, Insights blog, Individual insight articles, Contact form
- Admin pages: Dashboard, Posts management, Post editor, Categories, Messages, Team administration
- Protected routes using custom authentication hook with Replit Auth integration

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- TypeScript for type-safe server-side code
- Custom middleware for request logging with timestamps and duration tracking
- Session-based authentication using express-session with PostgreSQL session store

**API Design**
- RESTful endpoints organized by resource (posts, categories, contacts, team members, users)
- Route handlers in `/server/routes.ts` following Express conventions
- Authentication middleware (`isAuthenticated`) protecting admin routes
- Standard CRUD operations with appropriate HTTP methods (GET, POST, PUT/PATCH, DELETE)

**Authentication System**
- Replit's OpenID Connect (OIDC) authentication via Passport.js strategy
- Session management with `connect-pg-simple` for PostgreSQL-backed sessions
- User claims stored in session including access tokens and refresh tokens
- Role-based authorization with `isAdmin` flag for administrative access

**Build & Deployment**
- Production build via esbuild bundling server code into single CJS file
- Client assets built with Vite and served statically from `/dist/public`
- Allowlist approach for bundling specific dependencies to optimize cold start performance
- Development mode with Vite middleware for HMR and Replit-specific tooling integration

### Data Storage

**Database System**
- PostgreSQL via Neon serverless driver with WebSocket support
- Drizzle ORM for type-safe database queries and schema management
- Schema-first approach with TypeScript types generated from Drizzle schema

**Database Schema**
- `sessions`: Session storage (mandatory for Replit Auth) with SID, session data, and expiration
- `users`: User accounts with email, names, profile images, admin flag, timestamps
- `categories`: Blog categories with name, slug, description
- `posts`: Blog articles with title, slug, content, excerpt, author reference, category reference, published status, featured image, timestamps
- `contactSubmissions`: Contact form submissions with name, email, phone, subject, practice area, message, read status
- `teamMembers`: Attorney profiles with name, title, bio, specialization, education, practice areas, image, contact info, display order

**Data Access Layer**
- Storage interface (`IStorage`) defining all data operations
- Implementation using Drizzle ORM queries with proper type inference
- Support for filtering (published posts), limiting (recent posts), and relational data (posts with author and category)
- Slug-based lookups for SEO-friendly URLs

### External Dependencies

**Core Infrastructure**
- Replit Authentication (OIDC) for user login and session management
- Neon PostgreSQL for serverless database hosting
- WebSocket support via `ws` package for Neon's WebSocket-based database connections

**UI & Components**
- Radix UI component primitives for accessible interactive elements
- React Hook Form with Zod resolver for form validation
- Lucide React for icon library
- date-fns for date formatting and manipulation

**Development Tools**
- Replit-specific Vite plugins for runtime error overlay, cartographer, and dev banner
- ESBuild for production server bundling
- Drizzle Kit for database schema migrations and push operations

**Design & Styling**
- Google Fonts (Playfair Display, Source Sans Pro) loaded via CDN
- Tailwind CSS with PostCSS for processing
- Class Variance Authority (CVA) for variant-based component styling