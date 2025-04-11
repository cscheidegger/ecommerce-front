
# Proteus.lab Frontend

This repository contains the React frontend application for Proteus.lab, a 3D printing service platform.

## Features

- Product catalog and details
- Shopping cart functionality
- Quote request system
- Portfolio display with Instagram integration
- Admin dashboard for content management

## Technologies

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Router
- React Query
- Shadcn UI Components

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/proteuslab-frontend.git
   cd proteuslab-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Build for production:
   ```bash
   npm run build
   # or
   yarn build
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=http://localhost:8000/api
```

## Docker

To build and run the frontend using Docker:

```bash
# Build the Docker image
docker build -t proteuslab-frontend .

# Run the container
docker run -p 5173:80 proteuslab-frontend
```

## Project Structure

```
src/
├── components/    # Reusable UI components
├── contexts/      # React contexts (cart, auth, etc.)
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and libraries
├── pages/         # Page components
├── services/      # API service functions
└── types/         # TypeScript type definitions
```

## Deployment

The application can be deployed as a static site or as a Docker container. See the DevOps repository for orchestration with other services.
