# Firecrawl Application Template

This is a Next.js template for building custom web applications that integrate with Firecrawl . Use this as your starting point to create powerful web scraping and data extraction applications.

## Purpose

This template provides the foundation and boilerplate code needed to quickly build Firecrawl-powered applications. It includes:

- A clean, modern UI structure ready for customization
- API key management infrastructure
- Basic form handling for URL submissions
- Responsive layout with Tailwind CSS

## Prerequisites

- Node.js 18.x or later
- A Firecrawl API key (for development and testing)

## Getting Started

1. Clone this template repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

5. Begin customizing the template for your specific Firecrawl application needs

## Template Structure

- `/app/components` - Reusable UI components to build your interface
- `/app/services` - API integration services (customize for your specific Firecrawl API usage)
- `/app/page.tsx` - Main application template (customize for your app's workflow)
- `/app/layout.tsx` - Root layout component

## How to Customize

This template is designed to be extended:

1. Modify the UI components to match your branding and UX needs
2. Extend the API service in `/app/services/api.ts` to implement your specific Firecrawl API calls
3. Customize the form inputs to collect the data relevant to your use case
4. Implement your own data processing and display logic in the output section

## Technologies Used

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [TypeScript 5](https://www.typescriptlang.org/)


