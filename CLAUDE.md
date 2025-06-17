# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Payload CMS website template built with Next.js App Router. It provides a full-stack solution with a headless CMS backend and a production-ready frontend, featuring content management, authentication, layout building blocks, and SEO capabilities.

## Development Commands

- `pnpm dev` - Start development server (runs on http://localhost:3000)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm generate:types` - Generate TypeScript types from Payload config
- `pnpm payload` - Access Payload CLI commands

## Core Architecture

### Backend (Payload CMS)
- **Config**: `src/payload.config.ts` - Main Payload configuration
- **Collections**: `src/collections/` - Data models (Pages, Posts, Media, Categories, Users)
- **Globals**: `src/Header/` and `src/Footer/` - Site-wide content
- **Database**: PostgreSQL via `@payloadcms/db-postgres`
- **Access Control**: `src/access/` - Permission configurations

### Frontend (Next.js)
- **App Router**: `src/app/` directory structure
- **Frontend Pages**: `src/app/(frontend)/` - Public website
- **Admin Panel**: `src/app/(payload)/admin/` - CMS interface
- **API Routes**: `src/app/(payload)/api/` - Payload API endpoints

### Content Architecture
- **Layout Builder**: `src/blocks/` - Reusable content blocks (Hero, Content, Media, CTA, Archive)
- **Hero Components**: `src/heros/` - Different hero variations
- **Rich Text**: Uses Lexical editor with custom configuration in `src/fields/defaultLexical.ts`

### UI System
- **Components**: `src/components/` - Shared React components
- **UI Components**: `src/components/ui/` - shadcn/ui based components
- **Styling**: TailwindCSS with custom configurations
- **Theme**: Dark/light mode support via `src/providers/Theme/`

## Key Features Implementation

### Collections Structure
- **Pages**: Layout builder enabled, draft preview, SEO fields
- **Posts**: Blog functionality with categories, authors, draft/publish workflow
- **Media**: File uploads with size variants and focal points
- **Categories**: Nested categorization for posts
- **Users**: Authentication and admin access

### Plugins in Use
- SEO Plugin - Meta tags and Open Graph
- Search Plugin - Full-text search functionality
- Redirects Plugin - URL redirect management
- Form Builder Plugin - Contact forms and submissions
- Nested Docs Plugin - Category hierarchies

### Content Management
- Draft preview system with secure preview URLs
- Live preview in admin panel
- Scheduled publishing via jobs queue
- On-demand revalidation for static pages

## Database & Migrations

This project uses PostgreSQL. For schema changes:

1. Create migration: `pnpm payload migrate:create`
2. Run migrations: `pnpm payload migrate`
3. Local development uses `push: true` for rapid iteration

## Environment Variables

Key environment variables (see .env.example):
- `DATABASE_URI` - PostgreSQL connection string  
- `PAYLOAD_SECRET` - Payload encryption secret
- `NEXT_PUBLIC_SERVER_URL` - Public URL for the site
- `CRON_SECRET` - For scheduled jobs authentication

## TypeScript Configuration

- Path aliases: `@/*` maps to `src/*`
- Strict TypeScript settings enabled
- Auto-generated types in `src/payload-types.ts`
- Custom payload config alias: `@payload-config`

## Development Workflow

1. Payload admin available at `/admin` when server is running
2. Use seeding functionality via admin panel for demo content
3. Frontend routes automatically handle dynamic pages and posts
4. Layout builder blocks can be mixed and matched per page/post
5. Media management includes automatic image optimization