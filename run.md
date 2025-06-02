# Project Execution Guide

This guide explains how to set up and run the **MercadoLibre Challenge** project.

## Prerequisites

- Node.js (version 18.x or higher)  
- npm (version 9.x or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/nadiarosenberg/mercadolibre-challenge.git
cd mercadolibre-challenge
```

2. Install dependencies:

```bash
npm install
```

## Development Execution

To start the development server:

```bash
npm run dev
```

The server will run at http://localhost:3000

## Testing

To run unit tests:

```bash
npm test
```

To view test coverage:

```bash
npm test -- --coverage
```

## Project structure

- `/app` - Routes and Next.js pages (App Router)
- `/app/api` - API endpoints with Next.js API Routes
- `/components` - React components
- `/data` - JSON files used as a mocked database
- `/lib` - Shared utilities 
- `/types` - Typescript definitions
- `/__tests__` - Unit tests
  
## API Docs

Documentation is available at the route `/api/v1/docs`
