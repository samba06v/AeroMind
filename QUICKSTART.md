# Quick Start Guide

## Installation

```bash
npm install
```

## Environment Setup

Create `.env` file:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/aeromind
SESSION_SECRET=your-secret-key-here
NODE_ENV=development
PORT=5000
```

## Database Setup

```bash
npm run db:push
```

## Run Development Server

```bash
npm run dev
```

Visit: http://localhost:5000

## Pages

- `/` - Home
- `/platform` - Platform capabilities
- `/technology` - Tech stack
- `/customers` - Target markets
- `/vision` - Mission & vision
- `/demo` - Live dashboard

## Build for Production

```bash
npm run build
npm start
```
